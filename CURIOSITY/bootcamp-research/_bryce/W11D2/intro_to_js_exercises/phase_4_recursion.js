// Phase 4:

function range(start, end) {
  if (start === end) {
    return [start];
  } 
  let arr = range(start, end - 1);
  arr.push(end); // [2, 3, 4, 5]
  return arr;
};

// console.log(range(2, 6)); //[2, 3, 4, 5, 6] 

function sumRec(arr){
  if (arr.length === 1) {
    return arr[0]; //last num
  } 
  return sumRec(arr.slice(1)) + arr[0];
};

// console.log(sumRec([2, 3, 4, 5, 6])); //20

function exponent(base, exp) {
  if (exp === 0) {
      return 1;
  }
  return exponent(base, exp - 1) * base;
};

// console.log(exponent(2, 0)); //1
// console.log(exponent(2, 1)); //2
// console.log(exponent(2, 3)); //8

function exponent2(base, exp) {
  if (exp === 0) {
    return 1;
  } else if (exp === 1) {
    return base;  
  };
  
  if (exp % 2 === 0) {
    return exponent2(base, exp / 2) ** 2;
  } else {
    return base * (exponent2(base, (exp - 1) / 2) ** 2);
  }
};

// console.log(exponent2(2, 0)); //1
// console.log(exponent2(2, 1)); //2
// console.log(exponent2(2, 3)); //8

function fibonacci(n) {
  if (n === 1) {
    return [1];
  } else if (n === 2) {
    return [1, 1];
  }

  const fib = fibonacci(n - 1);
  const last = fib[fib.length - 1] + fib[fib.length - 2];
  fib.push(last);
  return fib;
}

console.log(fibonacci(1)); // [1]
console.log(fibonacci(2)); // [1,1]
console.log(fibonacci(4)); // [1, 1, 2, 3]
