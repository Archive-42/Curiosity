function quickSort(array) {
  // if the length of the array is 0 or 1, return the array
  if(array.length === 0 || array.length === 1){
    return array;
  }

  // set the pivot to the first element of the array
  // remove the first element of the array
  let pivot = array[0];
  let left = [];
  let right = [];

  // put all values less than the pivot value into an array called left
  // put all values greater than the pivot value into an array called right
  for(let i = 1; i < array.length; i++) {
    if(array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  // call quick sort on left and assign the return value to leftSorted
  // call quick sort on right and assign the return value to rightSorted
  let leftSorted = quickSort(left);
  let rightSorted = quickSort(right);

  // return the concatenation of leftSorted, the pivot value, and rightSorted
  return [...leftSorted, pivot, ...rightSorted];

}


module.exports = {
  quickSort
};
