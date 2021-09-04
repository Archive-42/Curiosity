function binarySearch(list, target) {
	if (list.length === 0) return false;
	if (list.length === 1 && list[0] !== target) return false;
	let slicePoint;
	if (list.length % 2 === 0) {
		slicePoint = list.length / 2;
	} else {
		slicePoint = (list.length - 1) / 2;
	}
	let leftHalf = list.slice(0, slicePoint);
	let rightHalf = list.slice(slicePoint);

	if (target < list[slicePoint]) {
		return binarySearch(leftHalf, target);
	} else if (target > list[slicePoint]) {
		return binarySearch(rightHalf, target);
	} else if (target === list[slicePoint]) {
		return true;
	}
	return false;
}

function binarySearchIndex(list, target, low = 0, high = list.length - 1) {

	if (low === high) return -1;

	let slicePoint = Math.floor((low + high) / 2);

	if (target < list[slicePoint]) {
		return binarySearchIndex(list, target, low, slicePoint);
	} else if (target > list[slicePoint]) {
		return binarySearchIndex(list, target, slicePoint + 1, high);
	} else {
		return slicePoint;
	}

}
// console.log(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 12));
console.log(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 24));
module.exports = {
	binarySearch,
	binarySearchIndex,
};
