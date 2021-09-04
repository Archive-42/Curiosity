# Broken Authentication

- An app is vulnerable to attack when confirmation of the user's identity, authentication, and session management are critical to protect again authentication-related attacks:
  - Permitting automated attacks such as credential stuffing, where the attacker has a list of valid usersnames and passwords
  - Permitting brute force or author automated attacks
  - Permitting default, weak, or well-known passwords, such as `Password1` or `admin/admin`
  - Using weak or ineffective credential recovery and forgot password processes, such as "knowledge-based answers", which can't be made safe

## Example Scenarios

- Credential stuffing, the use of lists of known passwords, is a common attack.  If an app does not implement automated threat or credential stuffing protections, the application can be used as a password oracle to determine if the credentials are valid
- Application session timeouts aren't set properly.  A user uses a public computer to access an application.  Instead of selecting 'logout', the user just closes the browser and walks away.  An attacker uses the same browser an hour later, and the user is still authenticated