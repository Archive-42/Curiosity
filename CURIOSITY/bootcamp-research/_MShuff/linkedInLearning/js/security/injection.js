/* A1 - 1 Server Side JS Injection
 When eval(), setTimeout(), setInterval(), Function() are used to process user provided inputs, it can be exploited by an attacker to inject and execute malicious JS on server
*/

// Web applications using the JavaScript eval()function to parse the incoming data without any type of input validation are vulnerable to this attack.

//  Similarly setTimeout(), and setInterval()functions can take code in string format as a first argument causing same issues as eval()

// Denial of Service Attack
// An effective denial-of-service attack can be executed simply by sending the commands below to eval()function, This input will cause the target server's event loop to use 100% of its processor time and unable to process any other incoming requests until process is restarted.

// while(1)

// DoS attack 2
// Exit or kill process
// process.exit()
// process.kill(process.pid)

// File System Access
// Another potential goal of an attacker might be to read the contents of files from the server. For example, following two commands list the contents of the current directory and parent directory respectively:

// res.end(require('fs').readdirSync('.').toString());
// res.end(require('fs').readdirSync('..').toString());

// Once file names are obtained, an attacker can issue the command below to view the actual contents of a file:

// res.end(require('fs').readFileSync(filename))

// Prevention
/* To prevent server-side js injection attacks:
     - Validate user inputs on server side before processing
     - Do not use eval()function to parse user inputs. Avoid using other commands with similar effect, such as setTimeOut(), setInterval(), and Function().
     - For parsing JSON input, instead of using eval(), use a safer alternative such as JSON.parse(). For type conversions use type related parseXXX()methods.
     - Include "use strict"at the beginning of a function, which enables strict mode within the enclosing function scope. 
*/

/******************* Part 2 - SQL and NoSQL Injection  ***********************/
// SQL and NoSQL injections enable an attacker to inject code into the query that would be executed by the database.  These flaws are introduced when software developers create dynamic database queries that include user supplied input

// SQL Injection
// - Let's consider an example SQL statement used to authenticate the user with a username and password:
// SELECT * FROM accounts WHERE username = '$username' AND password = '$password'

// If this statement is not prepared or properly handled when constructed, an attacker may be able to supply admin' --in the username field to access the admin user's account bypassing the condition that checks for the password. The resultant SQL query would looks like:
// SELECT * FROM accounts WHERE username = 'admin' -- AND password = ''

// NoSQL Injection
// - The equivalent of above query for NoSQL MongoDB database is:
// db.accounts.find({username: username, password: password});

// While here we are no longer dealing with query language, an attacker can still achieve the same results as SQL injection by supplying JSON input object like below:
// { "username": "admin", "password": {$gt: ""}}
// In MongoDB, $gtselects those documents where the value of the field is greater than (i.e. >) the specified value. Thus above statement compares password in database with empty string for greatness, which returns true.
// The same results can be achieved using other comparison operator such as $ne.

// SSJS Attack Mechanics
// Server-side JS Injection (SSJS) is an attack where JS code is injected and executed in a server component.  MongoDB specifically, is vulnerable to this attack when queries are run without proper sanitization

// $where operator
// - MongoDB's $where operator performs JS expression evaluation on the MongoDB server.  If the user is able to inject direct code into queries than such an attack can take place:
// db.allocationsCollection.find({ $where: "this.userId == '" + parsedUserId + "' && " + "this.stocks > " + "'" + threshold + "'"});

// - The code will match all documents which have a userId field as specified by parsedUserId and a stocks field as specified by threshold. The problem is that these parameters are not validated, filtered, or sanitised, and vulnerable to SSJS Injection.
