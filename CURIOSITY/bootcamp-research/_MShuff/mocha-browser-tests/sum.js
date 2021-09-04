export default function sumNumbers(...nums) {
  if (nums.length < 1) throw new TypeError('I need numbers to sum');
  if (nums.length === 1) return nums[0];

  return nums.reduce((acc, cur) => acc + cur);
}

// console.log(sumNumbers(10, 20, 30, 40, 50));
// console.log(sumNumbers(10));

// try {
//   console.log(sumNumbers());
// } catch (err) {
//   console.log(err);
// }

// console.log(sumNumbers(1020, 500));
