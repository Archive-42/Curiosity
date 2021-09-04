let myName = 'Michael Shuff';
let fatherName = 'David Shuff';
let doubleName = 'Shuff Shuff';
let birthCity = 'Kingston';
let bestFriend = 'Justin Cappellini';

// `str.indexOf(str)`  returns the index of the first occurrence of a specified substring
//   - str.indexOf(searchValue [, fromIndex]) - fromIndex = starting index of search
// `str.lastIndexOf(str)` returns the index of the last occurence of a specified substring
//   - str.lastIndexOf(searchValue [, fromIndex]) - fromIndex = starting index of search
console.log(myName.indexOf('Shuff'));     // 8
console.log(doubleName.lastIndexOf('Shuff')); // 6
console.log(doubleName.indexOf('Shuff'));   // 0

// `str.search(regexp)` - Returns the first position of a regular expression
console.log(myName.search(/Shuff/));


// To compare strings, you can use the <, >, ==, or === logical operators
let a = 'a';
let b = 'b';
console.log(a < b);     // true
// It is worth noting that uppercase characters are considered less than lowercase
console.log('A' < 'a'); // true

// `str.charCodeAt(index)` returns a unicode character code for the character at the given index
console.log('Hey how are you mate'.charCodeAt(3));
console.log('='.charCodeAt(0) === 61);

// `str.codePointAt(pos)` returns a non-negative integer that is the UTF-16 code point value.
const icons = '☃★♲';
console.log(icons.codePointAt(1));
console.log('hey'.codePointAt(1));


// `str.concat(str2 [, ...strN])` concatenates the string arguments to the calling string and returns a new string.
console.log(myName.concat(', ', fatherName, ', and ', bestFriend));
// You can also just use the `+` operator for this, and this is the preferred method
console.log(myName + ', ' + fatherName + ', and ' + bestFriend);


console.log(null === undefined);
