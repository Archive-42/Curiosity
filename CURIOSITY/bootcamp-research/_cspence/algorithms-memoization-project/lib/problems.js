// Write a function, lucasNumberMemo(n), that takes in a number. The function
// should return the n-th number of the Lucas Sequence.
//
// The Lucas Sequence is like the Fibonacci Sequence, except that its two seed
// values are:
//   The 0-th number of the Lucas Sequence is 2.
//   The 1-st number of the Lucas Sequence is 1.
//
// To generate the next number of the sequence, you add up the previous two
// numbers.
//
// For example, the sequence begins: 2, 1, 3, 4, 7, 11, ...
//
// Solve this recursively with memoization.
//
// Examples:
//
function lucasNumberMemo(n, memo = {'0': 2, '1': 1}) {
    if (n in memo) return memo[n];
    memo[n] = lucasNumberMemo(n - 1, memo) + lucasNumberMemo(n - 2, memo);
    return memo[n];
}

console.log(lucasNumberMemo(0))   // => 2
console.log(lucasNumberMemo(1))   // => 1
console.log(lucasNumberMemo(40))  // => 228826127
console.log(lucasNumberMemo(41))  // => 370248451
console.log(lucasNumberMemo(42))  // => 599074578

// Write a function, minChange(coins, amount), that accepts an array of coin
// values and a target amount as arguments. The method should the minimum number
// of coins needed to make the target amount. A coin value can be used multiple
// times.
//
// After you pass the first 3 examples, you'll likely need to memoize your code
// in order to pass the 4th example in a decent runtime.
//
// Examples:
//

//[1, 2, 5]    11
function minChange(coins, amount, memo = {}) {
    let count = 0;
    for (let i = coins.length - 1; i >= 0; i--) {
        while ((amount - coins[i]) >= 0) {
            amount -= coins[i];
            count++;
        }
    }
    return count;
    // if (count < minChange(coins.slice(0, coins.length - 1), amount)) {
    //     return count;
    // } else {
    //     return minChange(coins.slice(0, coins.length - 1), amount);
    // }
}

console.log(minChange([1, 2, 5], 11))         // => 3, because 5 + 5 + 1 = 11
console.log(minChange([1, 4, 5], 8))   // => 2, because 4 + 4 = 8
console.log(minChange([1, 5, 10, 25], 15))    // => 2, because 10 + 5 = 15
console.log(minChange([1, 5, 10, 25], 100))  // => 4, because 25 + 25 + 25 + 25 = 100

module.exports = {
    lucasNumberMemo,
    minChange
};
