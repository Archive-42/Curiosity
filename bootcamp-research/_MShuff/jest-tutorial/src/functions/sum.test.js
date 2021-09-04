import sum from './sum';

// expect.extend custom matcher to check range
expect.extend({
	toBeWithinRange(received, floor, ceiling) {
		const pass = received >= floor && received <= ceiling;

		if (pass) {
			return {
				message: () =>
					`expected ${received} not to be within range ${floor} - ${ceiling}`,
				pass: true,
			};
		} else {
			return {
				message: () =>
					`expected ${received} to be within range ${floor} - ${ceiling}`,
				pass: false,
			};
		}
	},
});

describe('Sum function', () => {
	test('sum works correctly', () => {
		const result = sum(1, 3);
		expect(result).toBe(4);
		// Test the opposite of a matcher
		expect(result).not.toBe(3);
		expect(result).toBeGreaterThan(3);
		expect(result).toBeGreaterThanOrEqual(4);

		const result2 = sum(1, -1);
		expect(result2).toBe(0);
		expect(result2).toBeLessThan(1);
		expect(result2).toBeLessThanOrEqual(0);

		const result3 = 0.1 + 0.2;
		// expect(result3).toBe(0.3);  // Rounding Error
		expect(result3).toBeCloseTo(0.3);
		expect(result3).toBeWithinRange(0, 1);
	});
});
