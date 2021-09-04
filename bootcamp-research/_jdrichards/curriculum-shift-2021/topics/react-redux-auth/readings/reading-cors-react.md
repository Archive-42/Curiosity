# Cross-Origin Resource Sharing Security

You may have come across Cross-Origin Resource Sharing before but this reading
will cover, in detail, how CORS works and point out that this is an entirely
_opt-in_ behavior.

## Description

> Cross-origin resource sharing (CORS) is a mechanism that allows restricted
> resources on a web page to be requested from another domain outside the domain
> from which the first resource was served.

Simply put, a browser (or other CORS-compliant client) will check to see if it's
allowed to make data requests to a URL that does not share the same scheme and
authority combination.

## The preflight request

A CORS-compliant client will check the URL of any AJAX request it makes before
actually making it. It compares the scheme and authority of the AJAX request to
the scheme and authority of the page from which its being made. That usually
means that it compares the protocol (http or https), the domain (example.com),
and the port number. If any of those differ, then it will make a **preflight
request** to the server that would serve the request.

For example, you have a web page hosted at http://www.example.com. You have a
script that wants to load data from http://data.example.com/api/data. Because
the authorities differ, it makes a "preflight" request using the HTTP verb
OPTIONS. The HTTP request would look like this.

```
OPTIONS /api/data HTTP/1.1
Host: data.example.com
Origin: http://www.example.com
```

This is the least information that it can send, requesting access to the
resource **/api/data**. It identifies the resource in the first line. In the
second line, it adds the "Host" header for the recipient to use to resolve
which domain is in play. Finally, it sends the "Origin" header to identify the
domain from which the cross-origin request will come.

It can also add two other headers as part of the preflight request. The first,
"Access-Control-Request-Method", can be set to an HTTP verb like "GET" or
"POST". That specifies the specific verb that it intends to use.

The second "Access-Control-Request-Headers" is a list of headers that it wants
to send as part of the request, usually headers like "Content-Type" and
"X-Csrf-Token" to specify the type of content its sending and the CSRF token for
the API call, respectively.

## The preflight response

The server then has the ability to respond to the preflight request. It does so
by sending back an HTTP response like this.

```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://www.example.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 86400
```

The first line informs the browser that it is, indeed, an HTTP response and that
the response body will contain no content. There will be headers, of course.

The "Access-Control-Allow-Origin" header will contain one of two values: the
exact value sent in the "Origin" header of the request, or an asterisk. If it
contains either of these values, then the browser will consult the other
headers to determine if it can make the request. If it does not contain that
header, the browser will prevent the AJAX call from happening.

Next, the browser will check the "Access-Control-Allow-Methods" header to see if
the HTTP verb that it wants to use is in that list. If it is, then it will
continue trying to determine if it can make the request. If the verb list
differs from what the AJAX call is trying to make, the browser will prevent the
AJAX call from happening. For example, if the AJAX call wants to send an HTTP
request with the DELETE header, the browser will prevent it because it is only
allowed to make POST, GET, and OPTIONS requests to that resource.

Next, the browser looks at the "Access-Control-Allow-Headers" header to see
what headers the AJAX call is allowed to include. In the case of this response,
it would _only_ be allowed to include the "Content-Type" header. If the AJAX
request tries to include more headers, then the browser can either fail the
AJAX request or not send the extra headers.

The "Access-Control-Allow-Max-Age" tells the browser it can cache this result
for that number of seconds. In this case, the browser can cache it for one day.

Another header that can come back is "Access-Control-Allow-Credentials". If that
header is set to "true", then that means the AJAX request is allowed to send
cookies with the request. Otherwise, the AJAX request _must_ be sent without
cookies. That's a nice security feature, but can be frustrating when wanting to
send cookies and forgetting to enable that feature in your CORS middleware.

**Note:** If you want to send credentials, you _cannot_ use the "*" as the value
for the "Access-Control-Allow-Origin" header. It _must_ be the value of the
"Origin" header of the request.

Since most APIs don't use cookies, it's ok to not allow credentialed requests in
that manner. However, you will often use some authorization token header like
"X-Auth-Token". You should include that in the list of headers acceptable by
your API in the "Access-Control-Allow-Headers" response header.

## The actual request

Once the browser determines that it can make the request, it does so.

That was easy!

## Oh, and the weaknesses

There are two major weaknesses to CORS.

First, it's an opt-in standard. You can write HTTP requests using Node.js that
completely ignore the CORS standards. There will be no preflight check. There is
only "go get that data" or "go post that data". You can't rely on others to be
kind when making those requests to your API either.

Second, every single HTTP request header can be faked. The "Origin" header can
lie. The request may not come from a client or server even remotely associated
with the value in the "Origin" header. To mitigate this, you need to be very
selective about the whitelist that you let through to your API. Don't use the
wildcard. Don't let in just any request from any Origin. Doing so opens you up
to [CWE-942] "Overly Permissive Cross-domain Whitelist".

## `cors` in Express

There is a package in Express that allows you to define preflight responses:
`cors`. You will use `cors` to whitelist domains accessing your servers in your
projects. By default, the `cors` Express middleware will allow all domains. [See
here][`cors`] for more information on the `cors` library and how it can be used
to whitelist domains.

## What you've learned

You learned about the headers used in the preflight request and response. You
should remember those, or remember where to get their definitions and uses.

You learned about how the browser checks if it can make an AJAX request based on
the values returned in the preflight response.

Finally, you learned about the weakness of CORS, that it's an opt-in mechanism
and that clients can lie when making requests.

Still, it is a wonderful mechanism that all browsers use when making AJAX
requests, so you should properly configure it with your CORS middleware.

[CWE-942]: https://cwe.mitre.org/data/definitions/942.html
[`cors`]: https://expressjs.com/en/resources/middleware/cors.html
