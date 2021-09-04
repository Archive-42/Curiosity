import { render, screen } from '@testing-library/react';
import App from './App';

function throwError() {
	throw new Error('This is an error!');
}

describe('basic testing functionality', () => {
	let myArray;
	let data;

	beforeAll(() => {
		data = {
			one: 1,
		};
		data.two = 2;
	});
	beforeEach(() => {
		myArray = [1, 3, 5, 7, 9];
	});

	// afterEach(() => console.log('Test completed'));

	test('Testing Object values', () => {
		// toEqual - Recursively checks every field of an object/array for equality
		expect(data).toEqual({ one: 1, two: 2 });
	});

	test('Adding positive numbers never results in 0', () => {
		for (let i = 1; i < 10; i++) {
			for (let j = 1; j < 10; j++) {
				// Testing the opposite of a matcher
				expect(i + j).not.toBe(0);
			}
		}
	});

	test('Testing null', () => {
		const n = null;
		expect(n).toBeNull();
		expect(n).toBeDefined();
		expect(n).not.toBeUndefined();
		expect(n).not.toBeTruthy();
		expect(n).toBeFalsy();
	});

	test('Testing strings against regular expressions and other strings', () => {
		const string = 'Hello!';
		expect(string).toMatch(/Hello!/);
		expect(string).toMatch('Hello!');
	});

	test('Testing iterables', () => {
		expect(myArray).toContain(3);
	});

	test('Testing Exceptions', () => {
		// Must be passed through a callback to avoid erroring out
		expect(() => throwError()).toThrow(Error);
		expect(() => throwError()).toThrow();
		// We can also test for a substring in the error message
		expect(() => throwError()).toThrow('This is an error!');
		expect(() => throwError()).toThrow('error!');
		expect(() => throwError()).toThrow(/This is an error!/);
	});
});
