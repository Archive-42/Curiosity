// Math Operations
// Operands are what operators are applied to
console.log(6 + 1); // 7.  6 is left operand, 1 is right operand

// Unary Operations
// + converts non-numbers to numbers
console.log(+true); // 1
console.log(+'123'); // 123

// - removes the sign of a number
let a = -10;
let b = 10;
console.log(-a); // 10
console.log(-b); // -10

// Binary Operations
// Addition (+)
console.log(10 + 2); // 12
// Subtraction (-)
console.log(20 - 10); // 10
// Multiplication (*)
console.log(20 * 20); // 400
// Division (/)
console.log(10 / 2); // 5
// Modulo - Remainder of integer divison (%)
console.log(10 % 2); // 0
console.log(9 % 2); // 1
console.log(10 % 4); // 2
// Exponentiation - Raises left operand to power of right operand (**)
console.log(5 ** 3); // 125

// String concatenation with Binary +
console.log('Michael' + ' ' + 'Shuff'); // "Michael Shuff"

// Modify-In-Place Shorthand Operations
let n = 5;
n *= 5; // n = n * 5. 25
n /= 5; // n = n / 5. 5
n += 10; // n = n + 10. 15
n -= 10; // n = n - 10. 5
n **= 2; // n = n ** 2. 25
n %= 2; // n = n % 2. 1
console.log(n);

// Increment/Decrement
let num1 = 1;
num1++; // 2
num1--; // 1
++num1; // 2
--num1; // 1
// Prefix increment/decrement adds/subtracts, then returns the number
console.log(++num1); // adds 1 then returns
console.log(num1++); // returns 2 then adds 1
console.log(num1); // 3
