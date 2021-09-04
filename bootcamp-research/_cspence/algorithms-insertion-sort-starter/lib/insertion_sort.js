function insertionSort(list) {
  // for i from 1 to length(list) inclusive do:
  for (let i = 1; i < list.length; i++) {
    let valueToInsert = list[i];
    let holePosition = i;

    while (holePosition > 0 && list[holePosition - 1] > valueToInsert) {
      list[holePosition] = list[holePosition - 1];
      holePosition = holePosition - 1;
    }

    list[holePosition] = valueToInsert;
    console.log(list);
  }

  //   /* select value to be inserted */
  //   valueToInsert = list[i]
  //   holePosition = i

  //   /* locate hole position for the element to be inserted */

  //   while holePosition > 0 and list[holePosition-1] > valueToInsert do:
  //     list[holePosition] = list[holePosition-1]
  //     holePosition = holePosition -1
  //   end while

  //   /* insert the number at hole position */
  //   list[holePosition] = valueToInsert

  // end for
}
let list = [2, -1, 4, 3, 7, 3];
insertionSort(list);
module.exports = {
  insertionSort,
};
