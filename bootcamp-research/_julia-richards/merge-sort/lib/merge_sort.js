function merge(array1, array2) {
  
  let result = [];
  while(array1.length && array2.length){
    if(array1[0]>array2[0]){
      result.push(array2.shift())
    }else{
      result.push(array1.shift())
    }
  }

// while(array1.length >0){
//   result.push(array1[0])
//   array1.shift()
// }
// while(array2.length >0){
//   result.push(array2[0])
//   array2.shift()
// }
  // while ( a has elements )
  //   add a[0] to the end of result
  //   remove a[0] from a
  // end while

  // while ( b has elements )
  //   add b[0] to the end of result
  //   remove b[0] from b
  // end while
return [...result,...array1,...array2];
  // return result
}

function mergeSort(array) {
  // if ( n == 1 ) return a
if(array.length === 1 || array.length === 0) return array;
let n = Math.ceil(array.length/2)
let l1 = array.slice(0,n)
let l2 = array.slice(n)
l1 = mergeSort(l1);
l2 = mergeSort(l2);

return merge(l1,l2)

  // /* Split the array into two */
  // var l1 as array = a[0] ... a[n/2]
  // var l2 as array = a[n/2+1] ... a[n]

  // l1 = mergesort( l1 )
  // l2 = mergesort( l2 )

  // return merge( l1, l2 )
}
//console.log(mergeSort([2,3,1,6,7,8,2]))
module.exports = {
  merge,
  mergeSort
};
