# XML External Entities(XXE)

- Applications and in particular XML-based web services or downstream integrations might be vulnerable to attack if:
  - The app accepts XML directly or XML uploads, especially from untrusted sources, or inserts untrusted data into XML documents which are parsed by an XML processor
  - Any of the XML processors in the app or SOAP based web services has document type definitions(DTD) enabled
  - If the application uses SAML for identity processing within federated security or signle sign on(SSO) purposes.  SAML uses XML for identity assertions and may be vulnerable
  - If the application uses SOAP prior to version 1.2, it is likely susceptible to XXE attacks if XML entities are being passed to the SOAP framework 

## Examples

- Numerous public XXE issues have been discovered, including attacking embedded devices.  XXE occurs in a lot of unexpected places, including deeply nested dependancies.  The easiest way is to upload a malicious XML file, if accepted.