// Phase 3:
Array.prototype.bubbleSort  = function() {
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < this.length; i++) {
      if (this[i] > this[i+1]){
          [this[i], this[i + 1]] = [this[i+1], this[i]];
          sorted = false;
      }
    }
  }
  return this;
};

// console.log([8, 7, 6, 5].bubbleSort());

String.prototype.substrings = function() {
  let subs = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = (i + 1); j <= this.length; j++) {
      subs.push(this.substring(i, j));
    }
  }
  return subs;
}

// console.log("cat".substrings());
