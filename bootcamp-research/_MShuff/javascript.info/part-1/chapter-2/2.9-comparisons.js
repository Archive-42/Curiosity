// Logical Operators

// Greater Than, >
console.log(1 > 2); // false
console.log(3 > 2); // true

// Less Than, <
console.log(1 < 2); // true
console.log(100 < 9); // false

// Greater Than or Equal To, >=
console.log(5 >= 5); // true
console.log(500 >= 1000); // false

// Less Than or Equal To, <=
console.log(60 <= 100); // true
console.log(76 <= 76); // true

// Equality Check w/ Type Coercion, ==
console.log(1 == 1); // true
console.log(1 == '1'); // true
console.log(1 == 2); // false

// Inequality Check w/ Type Coercion, !=
console.log(1 != '1'); // false
console.log(1 != 10); // true

// Strict Equality Check, ===
// Types MUST match
console.log(1 === '1'); // false
console.log('1' === '1'); // true

// Strict Inequality Check, !==
// Types MUST match
console.log(1 !== '1'); // true
console.log(1 !== 1); // false

// String Comparisons
// Done in dictionary/lexicographical order
console.log('Z' > 'A'); // true

// Uppercase appears before lowercase
console.log('Z' > 'z'); // false

// Comparisons w/ Different Types
// Converts to numbers when comparing
console.log('2' > 1); // true, '2' becomes 2
console.log('01' == 1); // true, '01' becomes 1
console.log('01' === 1); // false with strict equality

// Booleans - true becomes 1, false becomes 0
console.log(true == 1); // true
console.log(false == 0); //  true
// Use strict equality to avoid this
console.log(true === 1); // false
console.log(false === 0); // false

// Reasons not to use equality check with coercion:
let a = 0;
let b = '0';
console.log(Boolean(a)); // false
console.log(Boolean(b)); // true
console.log(a == b); // true
console.log(a === b); // false

// Comparisons with null and undefined
// With strict-equality they won't be equal
console.log(`null === undefined? ${null === undefined}`); // false
console.log(`undefined === undefined? ${undefined === undefined}`); // true
// With non strict-equality checks they equal each other, but nothing else
console.log(`null == undefined? ${null == undefined}`); // true
console.log(`null == null? ${null == null}`); // true

// For math operations < > <= >= null becomes 0 and undefined becomes NaN
console.log(null > 0); // false
console.log(null == 0); // false - the equality check doesn't convert
console.log(null >= 0); // true
