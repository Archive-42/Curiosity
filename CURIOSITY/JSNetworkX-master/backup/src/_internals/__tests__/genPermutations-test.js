/*global utils, assert*/
"use strict";

import genPermutations from "../genPermutations";

export const testGenPermutations = {
  permutations() {
    const permutations = genPermutations([0, 1, 2]);
    assert(utils.isIterator(permutations));
    assert.deepEqual(Array.from(permutations), [
      [0, 1, 2],
      [0, 2, 1],
      [1, 0, 2],
      [1, 2, 0],
      [2, 0, 1],
      [2, 1, 0],
    ]);
  },

  "permutations size < elements": function () {
    const permutations = genPermutations([0, 1, 2], 2);
    assert(utils.isIterator(permutations));
    assert.deepEqual(Array.from(permutations), [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
  },

  "permutations size > elements": function () {
    const permutations = genPermutations([0, 1, 2, 3], 5);
    assert(utils.isIterator(permutations));
    assert.deepEqual(Array.from(permutations), []);
  },

  "empty sequence": function () {
    const permutations = genPermutations([]);
    assert(utils.isIterator(permutations));
    assert.deepEqual(Array.from(permutations), [[]]);
  },
};
