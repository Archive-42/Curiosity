# AWS S3

AWS S3 stands for Amazon Web Services Simple Storage Service. S3 is a service
provided by Amazon that allows you to store files in the cloud, but not on your
web application's server. A service like this is usually used when there is not
enough storage in your server, or you want a fast file sharing service.

Heroku has a limit on how much you can store on your server. If you expect your
users in your application to regularly upload files like photos or videos, then
AWS S3 is a good service to use for hosting the application and your user's
files.

AWS S3 is free for the first year under a certain storage capacity, but you most
sign up with a credit card to use it. You will not be charged as long as you
don't upload more than a certain limit (5GB when this reading was written), see
here for [AWS Free Tier Features] for the most up to date information.

**To make sure you don't get charged over a certain limit, restrict upload size
and make sure to keep your AWS API keys safe!**

If you don't want to use S3 there are other alternatives you can explore like
[BackBlaze B2] which currently doesn't require a credit card but requires a cell
phone to text.

[AWS Free Tier Features]: https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=tier%2312monthsfree%7Ctier%23always-free
[BackBlaze B2]: https://www.backblaze.com/
