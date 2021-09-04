# Security in NodeJS

- **OWASP** - Open Web Application Security Project

## Vulnerabilities

- **Vulnerability** - A hole or weakness in an application that allows an attacker to cause harm to the stakeholders of the application
  - Can be a design flaw or an implementation bug.
  - Lack of validation on user input
  - Lack of sufficient logging mechanisms
  - Fail-open error handling
  - Not closing database connection properly

- **OWASP Top Ten** - A standard awareness document for developers and web application security.  It represents a broad consensus about the most critical security risks to web applications.
  - Globally recognized by developers as the first step towards more secure coding.

- Top 10 Web App Security Risks:
  1. **Injection** - Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query.  The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization
  2. **Broken Authentication** - Application functions related to authentication and session management are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens, or to exploit other implementation flaws to assume other users' identities temporarily or permanently.
  3. **Sensitive Data Exposure** - Many web applications and APIs do not properly protect sensitive data, such as financial, healthcare, and personally identifiable information(PII).  Attackers may steal or modify such weakly protected data to conduct credit card fraud, identity theft, or other crimes.  Sensitive data may be compromised without extra protection, such as encryption at rest or in transit, and requires special precautions when exchanged with the browser.
  4. **XML External Entities(XME)** - Many older or poorly configured XML processors evaluate external entity references within XML documents.  External entities can be used to disclose internal files using:
     1.  the file URI handlers
     2.  internal file shares
     3.  internal port scanning
     4.  remote code execution
     5.  denial of service attacks
  5. **Broken Access Control** - Restrictions on what authenticated users are allowed to do are often not properly enforced.  Attackers can exploit these flaws to access unauthorized functionality and/or data, such as access other users' accounts, view sensitive files, modify other users' data, change access rights, etc...
  6. **Security Misconfiguration** - Security misconfiguration is the most commonly seen issue.  This is commonly a result of insecure default configurations, incomplete or ad hoc configuration, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information.  Not only must all operating systems, frameworks, libraries, and applications be securly configured, they must be patched and upgraded in a timely fashion.
  7. **Cross-Site Scripting(XSS)** - XSS flaws occur when an app includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript.  XSS allows attackers to execute scripts in the victim's browser which can hijack user sessions, deface web sites, or redirect the user to malicious sites.
  8. **Insecure Deserialization** - Often leads to remote code execution.  Even if deserialization flaws do not result in remote code execute, they can be used to perform attacks, including replay attacks, injection attacks, and privilege escalation attacks
  9. **Using Components with Known Vulnerabilities** - Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application.  If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover.  Applications and APIs using components with known vulnerabilities may undermine application defenses and enable various attacks and impacts.
  10. **Insufficient Logging and Monitoring** - This, coupled with missing and ineffective integration with incident response, allows attackers to further attack systems, maintain persistence, pivot to more systems, and tamper, extract, or destroy data.  Most breach studies show time to detect a breach is over 200 days.  Typically detected by external parties rather than internal processes or monitoring.