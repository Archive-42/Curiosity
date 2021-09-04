# Sensitive Data Exposure

- The first thing is to determine the protection needs of data in transit and at rest.  For example, passwords, credit card numbers, health records, personal information, and business secrets require extra protection, particularly if that data falls under *privacy laws*
  - Is any data transmitted in clear text?  This concerns protocols such as *HTTP*, *SMTP*, and *FTP*.  External internet traffic is especially dangerous
  - Are any old or weak cryptographic algorithms used either by default or in older code?
  - Are default crypto keys in use, weak crypto keys generated or re-used, or is proper key management or rotation missing?
  - Is encryption not enforced, e.g. are any user-agent(browser) security directives or headers missing?

## Example Scenario