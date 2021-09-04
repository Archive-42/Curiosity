function binarySearch(list, target) {
  // parameter list: a list of sorted value
  // parameter target: the value to search for

  // if the list has zero length, then return false
  if(list.length === 0 || (list.length === 1 && list[0] !== target)) return false;

  // determine the slice point:
  // if the list has an even number of elements,
  //   the slice point is the number of elements
  //   divided by two
  // if the list has an odd number of elements,
  //   the slice point is the number of elements
  //   minus one divided by two
  let split = (list.length % 2 === 0) ? list.length / 2 : (list.length - 1) / 2;

  // create an list of the elements from 0 to the
  //   slice point, not including the slice point,
  //   which is known as the "left half"
  // create an list of the elements from the
  //   slice point to the end of the list which is
  //   known as the "right half"
  let leftSide = list.slice(0, split);
  let rightSide = list.slice(split);

  // if the target is less than the value in the
  //   original array at the slice point, then
  //   return the binary search of the "left half"
  //   and the target
  if (target < list[split]) {
      return binarySearch(leftSide, target);
  }

  // if the target is greater than the value in the
  //   original array at the slice point, then
  //   return the binary search of the "right half"
  //   and the target
  if (target > list[split]){
    return binarySearch(rightSide, target);
  }

  // if neither of those is true, return true
  return true;
}

function binarySearchIndex(list, target, low, high) {
  // parameter list: a list of sorted value
  // parameter target: the value to search for
  // parameter low: the lower index for the search
  // parameter high: the upper index for the search
  if (low === undefined) {
      low = 0;
  }

  if (high === undefined) {
      high = list.length - 1;
  }

  // if low is equal to high, then return -1 to indicate
  //   that the value was not found
  if (low === high) return -1;
//   if ((high - low) + low === high && list[low] !== target) return -1;

  // determine the slice point:
  //   if the list between the high index and the low index
  //   has an even number of elements,
  //     the slice point is the number of elements
  //     between high and low divided by two
  //   if the list between the high index and the low index
  //   has an odd number of elements,
  //     the slice point is the number of elements
  //     between high and low minus one, divided by two
  // let split = (list.slice(low, high).length % 2 === 0) ? (high - low) / 2 : (high - low - 1) / 2;

  //[1, 2, 3, 8, 5, 6]
  if ((high - low) % 2 === 0) {
      split = low + ((high - low) / 2);
  } else {
      split = low + ((high - low - 1) / 2);
  }

  // if the target is less than the value in the
  //   original array at the slice point, then
  //   return the binary search of the array,
  //   the target, low, and the slice point
  // if the target is greater than the value in the
  //   original array at the slice point, then return
  //   the binary search of the array, the target,
  //   the slice point plus one, and high
  // if neither of those is true, return the slice point
  if (target < list[split]) {
    return binarySearchIndex(list, target, low, split);
  }

  if (target > list[split]) {
    return binarySearchIndex(list, target, split + 1, high);
  }

  return split;
}




module.exports = {
  binarySearch,
  binarySearchIndex
};
