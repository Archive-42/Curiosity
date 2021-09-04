// Phase 1

Array.prototype.uniq = function() {
  let unique = [];
  for (let i = 0; i < this.length; i++) {
    const el = this[i];
    if (!unique.includes(el)) {
      unique.push(el);
    }
  }
  return unique;
}; 

Array.prototype.twoSum = function() {
  let pairs = [];
  for (let i = 0; i < this.length; i++) {
      const el1 = this[i];
      for (let j = (i+1); j < this.length; j++) {
          const el2 = this[j];
          if (el1 + el2 === 0) {
              pairs.push([i,j]);
            }
        }
    }
    return pairs;
};

Array.prototype.transpose = function() {
  let transposed = [];
  for (let i = 0; i < this[0].length; i++) { // 0
    let subArray = []; //[1, 3]
    for (let j = 0; j < this.length; j++) { // 0
      subArray.push(this[j][i]);
    }
    transposed.push(subArray);
  }
  return transposed;
};


let t = 
[[1, 2], [3, 4], 
[5, 6], [7, 8]];

// console.log(t.transpose());



// 
// [[1, 3],
//  [2, 4]]

// let a = [3, 0, 2, -5, 4, 6, 5, -2, 0, 1];
// console.log(a.twoSum());
