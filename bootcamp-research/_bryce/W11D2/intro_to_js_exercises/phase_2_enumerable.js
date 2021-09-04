// Phase 2:
Array.prototype.myEach = function(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i]);
  }
};

let callback = function(el) {
  return el + 1;
};

// let b = [1, 2, 3, 4, 5]
// console.log(a.myEach(callback));

Array.prototype.myMap = function(callback) {
  let mapped = [];
 
  this.myEach(function(el) {
    mapped.push(callback(el));
  });
  return mapped;
};

// let a = [1, 2, 3, 4, 5]
// console.log(a.myMap(callback));

Array.prototype.myReduce = function(callback, initialValue) {
  //if sets accumulator
  let acc = initialValue;
  let arr = this;

  if (initialValue === undefined) {
    acc = this[0];
    arr = this.slice(1);
  }
  arr.myEach(function(el) {
    acc = callback(acc, el);
  });
  return acc;
};


c = [1, 2, 3].myReduce(function (acc, el) {
    return acc + el;
}); 
// console.log(c); // => 6

// with initialValue
d = [1, 2, 3].myReduce(function (acc, el) {
    return acc + el;
}, 25); 
// console.log(d); // => 31