// Strings are useful for holding a string of characters, and JavaScript has many useful methods for interacting with and modify strings.  Strings are a primitive type, which means they're immutable.  Strings have a `length` property and an array of methods for searching and grabbing specific parts of the string.

// Strings can be created with single quotes, double quotes, or backticks for interpolation
let firstName = 'Michael';
const lastName = "Shuff";
let age = `33`;

// Strings have indexes, which start at 0.  These can be accessed with bracket notation or the much less often used charAt() method.
console.log((age.charAt(1)));
console.log(age[0]);            // 3
console.log(firstName[5]);      // 'e'


// Strings have a .length property which is how many characters composes the string
console.log(age.length);        // 2
console.log(lastName.length);   // 5

// Strings use a backslash as an escape character for certain characters
//  - \n - newline, \b - backspace, \\ - backslash, \t - horizontal tab
console.log('Hey what\'s up? Notice how I had to escape the quote for the word contraction.');

// Strings will come back as 'string' when being called in the `typeof` function
console.log(typeof firstName);              // string
console.log(typeof 'hey' === 'string');     // true


// You can break long longs within a text string using the single backslash
console.log('Hey how is everyone doing tonight?  Having fun learning a new language? \
Javascript is tricky, but it\'s not so bad.');


// Strings can also be created as objects, using the `new` keyword.  This slows down execution speed
let fatherFirstName = new String("David");
console.log(typeof fatherFirstName);           // object
console.log('David' == fatherFirstName);       // true
console.log('David' === fatherFirstName);      // false because it's not of same type
console.log('David' === "David");              // true because they're both strings

// Whether a string is created with the new keyword or as a primitive literal, it is converted to an
//  an object when a method is attached to it.
console.log(fatherFirstName.length);
