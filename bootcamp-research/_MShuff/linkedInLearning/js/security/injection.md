# Injection

- Putting data where it is not meant to be put, such as OS, SQL, NoSQL, LDAP, ...
- Done to get access to sensitive information or commands

- Vulnerable to an attack when:
  - User-supplied data is not validated, filtered, or sanitized by the application
  - Dynamic queries or non-parameterized calls without content-aware escaping are used directly in the interpreter
  - Hostile data is used within object-relational mapping search parameters to extra additional, sensitive records
  - Hostile data is directly used or concatenated, such that the SQL or command contains both structure and hostile data in dynamic queries, commands, or stored procedures

## Example Scenarios

- An app uses untrusted data in the construction of the following vulnerable SQL call:
  - String query: `SELECT * FROM accounts WHERE custID="" + request.getParameter("id") + ""`
  - The attacker modifies the `id` parameter value in their browser to send:
    - `' or '1'1='1`
    - changing the meaning of the query