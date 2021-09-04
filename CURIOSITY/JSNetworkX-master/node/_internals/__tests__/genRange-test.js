/*global assert*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _ = require("../");

var testGenRange = {
  end: function end() {
    var range = (0, _.genRange)(5);
    assert((0, _.isIterator)(range));
    assert.deepEqual(_Array$from(range), [0, 1, 2, 3, 4]);
  },

  "start - end": function startEnd() {
    var range = (0, _.genRange)(5, 10);
    assert((0, _.isIterator)(range));
    assert.deepEqual(_Array$from(range), [5, 6, 7, 8, 9]);
  },

  "start - end - step": function startEndStep() {
    var range = (0, _.genRange)(0, 10, 2);
    assert((0, _.isIterator)(range));
    assert.deepEqual(_Array$from(range), [0, 2, 4, 6, 8]);
  },

  "no arguments": function noArguments() {
    var range = (0, _.genRange)();
    assert((0, _.isIterator)(range));
    assert.deepEqual(_Array$from(range), []);
  },

  "negative step": function negativeStep() {
    var range = (0, _.genRange)(10, 5, -1);
    assert((0, _.isIterator)(range));
    assert.deepEqual(_Array$from(range), [10, 9, 8, 7, 6]);
  },
};
exports.testGenRange = testGenRange;
