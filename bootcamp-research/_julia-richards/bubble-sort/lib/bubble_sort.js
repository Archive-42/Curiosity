function swap(array, idx1, idx2) {
	let temp = array[idx1]; // save a copy of the first value
	array[idx1] = array[idx2]; // overwrite the first value with the second value
	array[idx2] = temp; // overwrite the second value with the first value
}

// Use this pseudocode to implement the bubble sort

function bubbleSort(array) {
	// n := length(array)
	const n = array.length;
	// repeat
	let swapped = true;
	//  swapped = false        [2, 8, 5, 2, 6];
	//  for i := 1 to n - 1 inclusive do
	while (swapped) {
		swapped = false;
		for (let i = 0; i < n - 1; i++) {
			if (array[i] > array[i + 1]) {
				swap(array, i, i + 1);
				swapped = true;
			}
		}
   
  }
  return array;

}

module.exports = {
	bubbleSort,
	swap,
};
