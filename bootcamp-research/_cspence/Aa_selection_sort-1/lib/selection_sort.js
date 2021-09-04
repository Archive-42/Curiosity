// Try to implement swap on your own, this time.
function swap(arr, index1, index2) {
  let temp = arr[index1]; //[1,2]
  arr[index1] = arr[index2]; //[2,2]
  arr[index2] = temp; //[2,1,3,4]
}

/**
 * [2,1,3,4]
 *        ^ ^
 *        i j
 */

function selectionSort(list) {
  // list  : array of items
  // n     : size of list
  for (let i = 0; i < list.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] < list[min]) {
        min = j
      }
    }
    if (min != i) {
      swap(list, i, min);
    }
  }
  // for i = 1 to n - 1
  // /* set current element as minimum*/
  //    min = i
  //
  //    /* check the element to be minimum */
  //
  //    for j = i+1 to n
  //       if list[j] < list[min] then
  //          min = j;
  //       end if
  //    end for
  //
  //    /* swap the minimum element with the current element
  //       using the above swap function*/
  //    if indexMin != i  then
  //       swap list[min] and list[i]
  //    end if
  // end for
}




module.exports = {
  selectionSort,
  swap
};
