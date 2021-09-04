/*global utils, assert*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _genCombinations = require("../genCombinations");

var _genCombinations2 = _interopRequireDefault(_genCombinations);

var testGenCombinations = {
  combinations: function combinations() {
    var combinations = (0, _genCombinations2["default"])([0, 1, 2, 3], 3);
    assert(utils.isIterator(combinations));
    assert.deepEqual(_Array$from(combinations), [
      [0, 1, 2],
      [0, 1, 3],
      [0, 2, 3],
      [1, 2, 3],
    ]);
  },

  "combinations size > elements": function combinationsSizeElements() {
    var combinations = (0, _genCombinations2["default"])([0, 1, 2, 3], 10);
    assert(utils.isIterator(combinations));
    assert.deepEqual(_Array$from(combinations), []);
  },

  "empty sequence": function emptySequence() {
    var combinations = (0, _genCombinations2["default"])([], 2);
    assert(utils.isIterator(combinations));
    assert.deepEqual(_Array$from(combinations), []);
  },
};
exports.testGenCombinations = testGenCombinations;
