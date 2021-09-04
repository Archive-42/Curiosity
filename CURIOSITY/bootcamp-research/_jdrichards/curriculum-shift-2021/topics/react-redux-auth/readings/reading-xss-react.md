# Cross-Site Scripting (XSS)

Cross-site scripting occurs when someone submits malicious content to your
application and, then, you display it in such a way that the browser invokes it.
This occurs primarily when you take text from a form and, then, display its
contents.

This is a type of "injection" attack, in much the same way that SQL injection
occurs. Given the way browsers parse HTML, each of the different types of slots
has slightly different security rules. When you put unchecked data into these
slots, you need to take certain steps to make sure that the data does not break
out of that slot into a context that allows code execution. In a way, this
approach treats an HTML document like a parameterized database query - the data
is kept in specific places and is isolated from code contexts with escaping.

The following rules itemize how you should treat content that comes from sources
that you do not trust, like every human being on the planet.

## Content security policy headers

One of the interesting features that browsers now honor is an HTTP header that
you can send with your HTTP responses that direct them about how to load
different resources like scripts and styles! It is the "Content-Security-Policy"
header. This helps mitigate cross-site scripting attacks by preventing content
from being loaded through `script` and `style` tags, or even declared in the
page!

The simplest way you can really lock down the assets used by your Web page would
be to send this HTTP header as part of your response.

```plaintext
Content-Security-Policy: default-src 'self';
```

This means the browser would load _only_ the resources that come from URLs that
have the same scheme and authority (including port number).

You can also lists the domains from which you would like to load your resources.
For example, if you also wanted to include an S3 bucket that you have defined on
AWS, you could add the scheme and authority like this:

```plaintext
Content-Security-Policy: default-src 'self' https://my-bucket.s3-us-west-2.amazonaws.com;
```

Now, it would allow your Web page to load assets from the host domain _and_
those hosted on
https:<span>//my-bucket.</span>s3-us-west-2.<span>amazonaws</span><span>.com</span>.

## React CSP

With React, you can dynamically define `Content-Security-Policy` header with an
npm package called `react-csp`.

For more [information on `react-csp` see here][`react-csp`].

A `Content-Security-Policy` will not be required for the projects at App
Academy, but it's best practice to define one in a real-world application.

## What you've learned

You learned that cross-site scripting is an insidious attack vector because, if
you put content created by a person anywhere in an HTML document, then it can
potentially lead to other people losing private data because of the embedded
content.

You also learned that an effective way to prevent browsers from using scripts,
styles, images, and other embedded content is to define a
"Content-Security-Policy" header that whitelists the domains from which the
browser should load those assets. This is a great way to greatly reduce the
attack vectors that bad agents can use to inject malicious content into your
Web application.

[Content-Security-Policy]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
[`react-csp`]: https://www.npmjs.com/package/react-csp
