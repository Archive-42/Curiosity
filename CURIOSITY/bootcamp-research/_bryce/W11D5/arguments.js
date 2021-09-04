function sum1() {
  let sum = 0;
  for(let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

function sum2(...nums) {
  let sum = 0;
  for(let i = 0; i < nums.length; i++) {
    sum+= nums[i];
  }
  return sum;
}

// console.log(sum1(1, 2, 3, 4) === 10);
// console.log(sum1(1, 2, 3, 4, 5) === 15);
// console.log(sum2(1, 2, 3, 4) === 10);
// console.log(sum2(1, 2, 3, 4, 5) === 15);

Function.prototype.myBind1 = function (ctx) {
  const origFunc = this;
  const bindArgs = Array.prototype.slice.call(arguments, 1);
  return function() {
    const callArgs = Array.prototype.slice.call(arguments);
    return origFunc.apply(ctx, bindArgs.concat(callArgs));
  };
};

Function.prototype.myBind2 = function(ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, bindArgs.concat(callArgs));
  };
};


// class Cat {
//   constructor(name) {
//     this.name = name;
//   }

//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }

// class Dog {
//   constructor(name) {
//     this.name = name;
//   }
// }

// const markov = new Cat("Markov");
// const pavlov = new Dog("Pavlov");

// // markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true

// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind1(pavlov, "meow", "Kush")();
// markov.says.myBind2(pavlov, "meow", "Kush")();
// // Pavlov says meow to Kush!
// // true

// // no bind time args (other than context), call time args are "meow" and "a tree"
// markov.says.myBind1(pavlov)("meow", "a tree");
// markov.says.myBind2(pavlov)("meow", "a tree");
// // Pavlov says meow to a tree!
// // true

// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind1(pavlov, "meow")("Markov");
// markov.says.myBind2(pavlov, "meow")("Markov");
// // Pavlov says meow to Markov!
// // true

// // no bind time args (other than context), call time args are "meow" and "me"
// let notMarkovSays1 = markov.says.myBind1(pavlov);
// let notMarkovSays2 = markov.says.myBind2(pavlov);
// notMarkovSays1("meow", "me");
// notMarkovSays2("meow", "me");
// // Pavlov says meow to me!
// // true

function curriedSum(numArgs) {
  const nums = [];
  
  function _curriedSum(num) {
    nums.push(num);
    
    if (nums.length === numArgs) {
      let sum = 0;
      for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
      }
      return sum;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56

Function.prototype.curry1 = function (numArgs) {
  const nums = [];
  const origFunc = this;
  return function _curriedFunc(num) { // the return here does not return the invoked version
    nums.push(num);
    if (nums.length === numArgs) {
      return origFunc(...nums);
    } else {
      return _curriedFunc;
    }
  };
};



Function.prototype.curry2 = function (ctx, numArgs) { //function (ctx, numArgs) if we care about the context
  const nums = [];
  const origFunc = this;
  
  return function _curriedFunc(num) {
    nums.push(num);
    if (nums.length === numArgs) {
      return origFunc.apply(ctx, nums); //we don't care about the context
    } else {
      return _curriedFunc;
    }
  };
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
let f1 = sumThree.curry1(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curry1(3)(4)(20)(6)); // == 30

let f2 = sumThree.curry2(3); 
f2 = f2(4); // [Function]
f2 = f2(20); // [Function]
f2 = f2(6); // = 30

// or more briefly:
console.log(sumThree.curry2(3)(4)(20)(6)); // == 30