# Protecting API Routes from CSRF

The web, unfortunately, is full of bad actors who consistently try to exploit
any insecurities that a web application might have. This reading will talk about
one common attack called Cross Site Request Forgery (CSRF).

In this reading, you will learn:

- How to use the `csurf` middleware to embed a token value in forms to protect
  against CSRF exploits.

## CSRF explained

Let's explain what CSRF is with an example. Imagine that you are a customer at a
bank called "Bad Bank Inc.". To put it bluntly, this bank sucks, and their
website is full of security issues.

In any case, you decide one day that you need to send your brother some money,
so you go `http://badbank.com` and sign into your account. Once you have
provided the correct credentials to log in, `http://badbank.com` sends back a
cookie.

> **Brief overview of cookies:** At a super high level, when a user logs into a
> website, one way that the server can "log in the user" is by sending back a
> [cookie] to the client. For example, if you log to `facebook.com`,
> `facebook.com`'s server would send the browser back a cookie. Now, on every
> subsequent request to `facebook.com`, the browser would attach that cookie to
> the request. When the request arrives at the server, the server sees the
> cookie and sees that you're logged in and authorized to navigate around your
> account.

Now that you're logged in, you navigate to `http://badbank.com/api/send-money`,
which renders a a page that looks like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Bad Bank</title>
  </head>
  <body>
    <h1>Send Money</h1>
    <form action="/api/send-money" method="post">
      <label for="recipient">Recipient Email: </label>
      <input type="email" id="recipient" name="recipient" />
      <label for="amount">Amount: </label>
      <input type="number" id="amount" name="amount" />
      <input type="submit" value="Send Money" />
    </form>
  </body>
</html>
```

The page has a form where you can fill out a "recipient" field and an "amount"
field. You fill out your brother's email `joe@gmail.com` in the recipient field
and \$100 for the amount, and then hit the 'Send Money' button.

When you hit the 'Send Money' button, the following happens:

1. An HTTP POST request is made to `http://badbank.com/api/send-money`. When you
   logged in earlier, your browser received a cookie and stored it in
   association with `http://badbank.com`. Now, your browser sees this "send
   money" request going to the `http://badbank.com` domain, so it attaches that
   cookie to the HTTP request.
2. The request arrives at the server. The server sees that there is a cookie,
   and it checks the cookie.
3. Since the cookie is valid, the server knows that you are logged in, and the
   server processes the form data to see who you're sending money to and how
   much you are sending.
4. The server finishes processing the form data and sends \$100 to your brother
   Joe.

Things are going well so far!

Unfortunately, a devious hacker comes along. The hacker puts up another website
that looks like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>See Cute Puppies</title>
    <style>
      form {
        visibility: hidden;
      }
      input[type="submit"] {
        visibility: visible;
      }
    </style>
  </head>
  <body>
    <form action="http://badbank.com/api/send-money" method="post">
      <label for="recipient">Recipient Email: </label>
      <input
        type="email"
        id="recipient"
        name="recipient"
        value="hacker@gmail.com"
      />
      <label for="amount">Amount: </label>
      <input type="number" id="amount" name="amount" value="1000000" />
      <input type="submit" value="See the cutest puppies!" />
    </form>
  </body>
</html>
```

Let's break down what's going on in the hacker's website:

1. First, the hacker puts up the exact same "Send Money" form on his website: it
   hits the same endpoint (`http://badbank.com/api/send-money`) with the same
   method ("post"), and it has all the fields that the endpoint expects when
   parsing the form ("recipient" and "amount").
2. One difference here is that the hacker hid the form on the website with CSS
   by setting the form's visibility to hidden.
3. The other key difference is that the hacker went ahead and pre-filled the
   recipient field's value to his own email address, "hacker@gmail.com", and
   then also pre-filled the "amount" field's value to 1 million.
4. The only part of the form that the hacker decides to show is the submit
   button, and he changed the button text to an irresistible prompt: "See the
   cutest puppies!".
5. Naturally, you love puppies, so as you're browsing the web and land on this
   hacker's website, you click the button, thinking that you're about to see
   puppies.
6. Instead, a "ost" request gets sent to `http://badbank.com/api/send-money`
   along with the pre-filled form data.

Here's the problem, because you had recently logged into `http://badbank.com`,
your browser is currently storing the cookie to keep you logged in. When the
browser sees that you are making another request to the `badbank.com` domain, it
attaches the same cookie to the request that the hacker tricked you into making.

Now, when the hacker's request makes it to `badbank.com`'s server, it sees the
cookie, sees that you're logged in and thinks that it's you making the request,
so it sends \$1 million to "hacker@gmail.com".

## Preventing CSRF in a Single-Page Application

CSRF protection for requests made from a single-page application can be done in
several ways. At App Academy, you will be storing the CSRF secret token in the
cookies. All requests from the single-page application will have a header with
the value of the CSRF secret token cookie. Another HTTP-only cookie will be
compared with this value to ensure that the request came from the server itself
and not from some other malicious source.

Now, when a hacker tries to imitate the form on his own website, his form
wouldn't have the secret token, and the server would know to reject any requests
from that malicious form.

### Using the `csurf` library

Let's use the `csurf` library to handle this whole process of creating a secret
token for the form and then checking the secret token against a set HTTP-only
cookie.

The `csurf` library creates a middleware function that does the following:

1. It creates a secret value, which is sent to the client and stored as an
   HTTP-only cookie named `_csrf`.
2. In development, a route will be accessed at the first render of the
   single-page application that will set a secret CSRF token as a cookie named
   `X-CSRF-Token`.
3. In production, the single-page application will be served from the Express
   server and will have the secret CSRF token as a cookie named `X-CSRF-Token`
   set when the HTML page is sent by the server.
4. Whenever the single-page application makes a request, it will read the
   `X-CSRF-Token` cookie value and set it as the value of the `XSRF-Token`
   header on the request. The `_csrf` cookie will also be sent back as a cookie
   in the request.
5. The server verifies that the `XSRF-Token` header is the right token for the
   `_csrf` cookie value.

By taking the steps above, the hacker site would not have the CSRF token
embedded as part of the form on his site, and therefore it would fail the CSRF
token verification process.

If a hacker is missing the CSRF token as a header, then the API endpoint throws
an error and prevents any actions from being done.

There are [other considerations] to take into account to fully protect your web
applications from CSRF attacks. For now, adding the CSRF token is a solid first
line of defense.

## CSRF and GET

You've already seen how to guard against cross-site request forgery attacks by
using a token from something like the [csurf] middleware. That will guard you
against attempted abuses of the POST, PUT, PATCH, and DELETE verbs.

But, what about GET? How do you guard against that? The answer is simple to
read, but requires discipline rather than code.

The HTTP specification, [RFC 2616], has the following to say about GET (and HEAD
and OPTION):

> In particular, the convention has been established that the GET and HEAD
> methods SHOULD NOT have the significance of taking an action other than
> retrieval. These methods ought to be considered "safe".

That means that a person should not type a URL into a browser or click a link
and _expect_ data to be created.

In some dynamic states, data may be created. However, the specification states

> The important distinction here is that the user did not request the
> side-effects, so therefore cannot be held accountable for them.

This means that whenever you use `app.get` (or `app.head` or `app.options`), you
should _not_ create new data as an intended side effect of the action of the
person making the request. No one should click on a link that reads "Create new
person record", initiate a GET request, and have a new record be created due to
that. GET is for _retrieving_ information.

If you stick with that design philosophy, and make sure that your code doesn't
create data on behalf of the person requesting a resource with the GET verb,
then you will never suffer cross-site request forgeries for GET requests.

## What you learned

In this reading, you learned the flow of using the `csurf` middleware to set
cookies and a header to protect against CSRF exploits in a single-page
application.

[cookie]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
[other considerations]: https://github.com/pillarjs/understanding-csrf

[csurf]: https://github.com/expressjs/csurf
[RFC 2616]: https://tools.ietf.org/html/rfc2616
