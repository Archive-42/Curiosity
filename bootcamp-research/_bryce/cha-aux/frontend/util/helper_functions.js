export const scalarArraysAreEqual = (arr1, arr2) => {
	return (
		arr1.length === arr2.length &&
		arr1.sort().every(function(val, idx) {
			return val === arr2.sort()[idx];
		})
	);
};
