// Work through this problem on https://leetcode.com/problems/coin-change-2/ and
// use the specs given there. Feel free to use this file for scratch work.

/* You are given coins of different denominations and a total amount of money.
Write a function to compute the number of combinations that make up that amount.
You may assume that you have infinite number of each kind of coin. */

/*Example 1:

Input: amount = 10, coins = [1, 2, 5]
Output: *
Explanation: there are four ways to make up the amount:
10=5+5   => largest coins are chosen first
10 = change(5) + change(5)
    change(2)-(2)-(1)
10=
amt = 5 + 5 + 4 + 2 + 1
    = 5 + 5 + 4 + 1 + 1 + 1
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1 */

/*Example 2:

Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2. */

/*Example 3:

Input: amount = 10, coins = [10]
Output: 1 */

/*You can assume that

0 <= amount <= 5000
1 <= coin <= 5000
the number of coins is less than 500
the answer is guaranteed to fit into signed 32-bit integer */
// let amount = 10;
// let coins = [10];

var change = function(amount, coins) {
    if (amount <= 0 || coins.length === 0 || Math.min(...coins) > amount) return 0;
    if (Math.max(...coins) === Math.min(...coins)) return 1;

    let newArray = [];
    coins.sort();
    for (let i = coins.length - 1; i >= 0; i--) {
        while (coins[i] <= amount) { //5
            newArray.push(coins[i]); //push 5 nArr
            amount -= coins[i]; //0
        }
    }
    if (amount > 0) return 0;

    return 1 + change(Math.max(...newArray), coins.slice(0, coins.length - 1));

}
/*
while (Math.min(...coins) !== Math.max(...newArray))


*/

console.log(change(5, [1, 2, 5]), 4); // 4 4
console.log(change(10, [10]), 1); // 1 1
console.log(change(3, [2]), 0); // 0 0
console.log(change(5, [5]), 1); // 1 1
console.log(change(5, [5, 2]), 1); // 1 1
// let amount = 5;
// let coins = [1, 2, 5];

// var change = function(amount, coins) {
//     let newArray = [];
//     coins.sort();
//     for (let i = coins.length - 1; i >= 0; i--) {
//         let amt = amount;
//         let tempCoins =coins.slice();
//         let tempArr = [];
//         for (let j = tempCoins.length - 1; j >= 0; j--){
//             while ((amt - coins[i]) >= 0 ) {
//                 tempArr.push(coins[i]);
//                 amt -= coins[i];
//             }
//         }
//         newArray.push(tempArr);
//     //coins.pop();
//     }
// return newArray.length;
// }

/*
newArr = [];

tempArr = each coin, makeup of other coins
simplest makeup of amount
simplest makeup of each coin

newArr.reduce((acc, el) => {
    acc *= el.length;
}, newArr[0].length);
*/
