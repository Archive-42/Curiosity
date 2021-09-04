(() => {
	'use strict';

	// There are 8 data types
	let myName = 'Michael Shuff'; // string
	let age = 33; // integer
	let grainsOfSand = 1231948129481204891284901n; // bigint
	let isOver18 = true; // boolean
	let voided = null; // null
	let notAssigned; // undefined
	let person = {
		// object
		name: myName, // key: 'name', value: "Michael Shuff"
		age, // key: age(implied), value: age
	};
	let myID = Symbol('myId'); // symbol

	// Number types have special cases
	let infinity = Infinity; // number type.  Nothing is greater than
	let altInfinity = 1 / 0; // also Infinity
	let negativeInfinity = -Infinity; // number type.  Nothing less than
	let altNegativeInfinity = -1 / 0; // also -Infinity
	let notANumber = NaN; // Not a Number
	let altNotANumber = 'hi' * 2;

	// Strings
	let str1 = 'Single Quotes';
	let str2 = 'Double Quotes';
	let str3 = `${str1} ${str2}`; // backtick interpolation

	// Boolean
	let truth = true;
	let falsey = false;

	// Null - represents nothing, empty, or value unknown
	let idk = null;

	// Symbols are unique identifiers for objects
	let unique = Symbol('Unique');

	// typeof operator - returns name of type as string
	console.log(typeof 40); // 'number'
	console.log(typeof 'Hi!'); // 'string'
	console.log(typeof true); // 'boolean'
	console.log(typeof null); // 'object'
	console.log(typeof undefined); // 'undefined'
	console.log(typeof {}); // 'object'
	console.log(typeof Math); // 'object'
	console.log(typeof console.log); // 'function'
	console.log(typeof 10n); // 'bigint'
	console.log(typeof Symbol('yo')); // 'symbol'
})();
