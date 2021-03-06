"use strict";

/**
 * Creates an array of `n` elements, each being `value`.
 *
 * @param {number} n Number of elements in the array
 * @param {?} value The value to put in each location
 * @return {Array}
 */
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = fillArray;

function fillArray(n, value) {
  var array = new Array(n);
  for (var i = 0; i < n; i++) {
    array[i] = value;
  }
  return array;
}

module.exports = exports["default"];
