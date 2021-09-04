// The Number data type accounts for integers and floats
let num1 = 20; // Integer
let num2 = 20.5; // Float

// Infinity and -Infinity are all numbers
let infinity = Infinity; // No number is greater than this
let negativeInfinity = -Infinity; // No number is less than this

console.log(0x14); // Hex
console.log(0b010101010101); // Binary
console.log(0o1743526); // Octal

// You can convert strings and booleans to numbers with the Number() function
console.log(typeof Number('1'));
console.log(Number(true));
console.log(Number(false));
// If it can't be converted to a number, you will get NaN
console.log(Number('hey'));

let num3 = 0.3;
let num4 = 0.2;
let num5 = 0.1;

// This is false due to how floating point numbers are implemented, even though you'd expect it to be true.  We can use Number.EPSILON to avoid this though.
console.log(num3 - num4 === num5);
console.log(num3 - num4 - num5 < Number.EPSILON);

console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MAX_VALUE);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.MIN_VALUE);
console.log(Number.NEGATIVE_INFINITY);
console.log(Number.POSITIVE_INFINITY);
console.log(Number.NaN);

console.log(Number.isNaN(NaN)); // More explicit than the global isNaN below, doesn't convert
console.log(isNaN('yo'));

console.log(Number.isInteger(1.5)); // False
console.log(Number.isInteger(1)); // True

console.log(Number.parseFloat('1.6'));
console.log(Number.parseInt('0x16', 16));

console.log((12).toExponential());
console.log((12.56546456).toFixed(2));

console.log((125).toString(2));
