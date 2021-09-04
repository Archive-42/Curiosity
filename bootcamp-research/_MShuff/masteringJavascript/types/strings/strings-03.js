let firstName = "Michael";
let lastName = "Shuff";
let fullName = firstName + " " + lastName;
let fatherName = "David Shuff";
let bestFriendName = "Justin Cappellini";


// `str.endsWith(searchString[, length])` determines whether a string ends with the characters of a specified string, returning true or false as appropriate.
// `str.startsWith(searchString[, position])` does the same thing except from the beginning, different optional parameters as well.
console.log(fullName.length);
console.log(fullName.startsWith('Michael'));
console.log(fullName.endsWith('Shuff', 13));


// The static `String.fromCharCode(num1[, ...[, numN]])` method returns a string created from the specified sequence of UTF-16 code units.
console.log(String.fromCharCode(189, 43, 190, 61));

// `String.fromCodePoint(num1[, ...[, numN]])` returns a string created by using the specified sequence of code points.
console.log(String.fromCodePoint(9731, 9733, 9842, 0x2F804));
// expected output: "☃★♲你"
