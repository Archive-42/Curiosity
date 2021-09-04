function merge(array1, array2) {
  // var result as array
  let newArr = [];

  while (array1.length > 0 && array2.length > 0) {
    if (array1[0] > array2[0]) {
      newArr.push(array2.shift());
    } else {
      newArr.push(array1.shift());
    }
  }

  if (array1.length > 0) {
    newArr.push(...array1);
  }

  if (array2.length > 0) {
    newArr.push(...array2);
  }

  return newArr;
  // while ( a and b have elements )
  //   if ( a[0] > b[0] )
  //     add b[0] to the end of result
  //     remove b[0] from b
  //   else
  //     add a[0] to the end of result
  //     remove a[0] from a
  //   end if
  // end while

  // while ( a has elements )
  //   add a[0] to the end of result
  //   remove a[0] from a
  // end while

  // while ( b has elements )
  //   add b[0] to the end of result
  //   remove b[0] from b
  // end while

  // return result
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  let split = Math.ceil(array.length / 2);
  var leftSide = array.slice(0, split);
  var rightSide = array.slice(split);

  leftSide = mergeSort(leftSide);
  rightSide = mergeSort(rightSide);

  return merge(leftSide, rightSide);
  // if ( n == 1 ) return a
  // /* Split the array into two */
  // var l1 as array = a[0] ... a[n/2]
  // var l2 as array = a[n/2+1] ... a[n]
  // l1 = mergesort( l1 )
  // l2 = mergesort( l2 )
  // return merge( l1, l2 )
}

module.exports = {
  merge,
  mergeSort,
};
