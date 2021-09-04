export function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function fetchData() {
	return wait(1000).then(() => 'peanut butter');
}

export async function fetchDataFail() {
	await wait(1000);
	return Promise.reject('fetch error');
}
