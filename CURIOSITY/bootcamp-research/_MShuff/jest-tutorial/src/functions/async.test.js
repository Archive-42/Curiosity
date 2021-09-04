import { wait, fetchData, fetchDataFail } from './async';

describe('Asynchronous tests', () => {
	// test('data should return peanut butter', () => {
	// 	return fetchData().then((data) => {
	// 		expect(data).toBe('peanut butter');
	// 	});
	// });

	test('async testing?', async () => {
		const result = await fetchData();
		expect(result).toBe('peanut butter');
	});

	test('resolve pattern match test', async () => {
		await expect(fetchData()).resolves.toBe('peanut butter');
	});

	test('reject pattern match test', async () => {
		await expect(fetchDataFail()).rejects.toMatch('fetch error');
	});

	test('failing fetch test', async () => {
		// expect.assertions(1);
		try {
			await fetchDataFail();
		} catch (e) {
			expect.assertions(1);
			expect(e).toMatch('fetch error');
		}
	});
});
