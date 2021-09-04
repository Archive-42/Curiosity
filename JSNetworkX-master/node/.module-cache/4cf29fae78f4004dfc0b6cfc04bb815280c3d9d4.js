/*global utils, assert*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _genPermutations = require("../genPermutations");

var _genPermutations2 = _interopRequireDefault(_genPermutations);

var testGenPermutations = {
  permutations: function permutations() {
    var permutations = (0, _genPermutations2["default"])([0, 1, 2]);
    assert(utils.isIterator(permutations));
    assert.deepEqual(_Array$from(permutations), [
      [0, 1, 2],
      [0, 2, 1],
      [1, 0, 2],
      [1, 2, 0],
      [2, 0, 1],
      [2, 1, 0],
    ]);
  },

  "permutations size < elements": function permutationsSizeElements() {
    var permutations = (0, _genPermutations2["default"])([0, 1, 2], 2);
    assert(utils.isIterator(permutations));
    assert.deepEqual(_Array$from(permutations), [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
  },

  "permutations size > elements": function permutationsSizeElements() {
    var permutations = (0, _genPermutations2["default"])([0, 1, 2, 3], 5);
    assert(utils.isIterator(permutations));
    assert.deepEqual(_Array$from(permutations), []);
  },

  "empty sequence": function emptySequence() {
    var permutations = (0, _genPermutations2["default"])([]);
    assert(utils.isIterator(permutations));
    assert.deepEqual(_Array$from(permutations), [[]]);
  },
};
exports.testGenPermutations = testGenPermutations;
