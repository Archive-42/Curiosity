// let billion = 1_000_000_000; // _ is a syntactic sugar, ignored to help separate large numbers
let billion = 1e9;
console.log(billion);

let microsecond = 0.000001;
let microsecond2 = 1e-6;
console.log(microsecond);
console.log(microsecond2);

// The unary + can convert a string to a number
console.log(typeof +'1');

/* Math Methods */

// Round down
console.log(Math.floor(5.9));

// Round up
console.log(Math.ceil(5.1));

// Round to nearest integer
console.log(Math.round(4.4));
console.log(Math.round(4.6));

// Cut off decimal point
console.log(Math.trunc(215.1231231));

// Absolute value
console.log(Math.abs(-10));

// Random # between 0 and 1
console.log(Math.random());

let nums = [1, 5, 20, 9, 100];

// Largest of a group of numbers
console.log(Math.max(...nums));

// Smallest of a group of numbers
console.log(Math.min(...nums));

// Raise n to the given power
console.log(Math.pow(10, 2));
// Exponentiation operator only available in ES7
console.log(10 ** 2);
