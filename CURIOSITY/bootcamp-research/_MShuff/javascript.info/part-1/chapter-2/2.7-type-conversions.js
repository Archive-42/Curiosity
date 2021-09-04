let value = true;
let strValue = String(value);

console.log(value); // true (boolean)
console.log(typeof strValue); // 'string'

console.log('6' / '2'); // 3
let str = '123';
console.log(typeof Number(str)); // number
console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0

console.log(Boolean(1)); // true
console.log(Boolean('')); // false
console.log(Boolean('0')); // true
console.log(Boolean(0)); // false
console.log(Boolean(' ')); // true
console.log(Boolean([])); // true
