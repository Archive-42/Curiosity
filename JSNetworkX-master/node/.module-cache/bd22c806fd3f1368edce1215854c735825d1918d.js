/*global assert*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _range = require("../range");

var _range2 = _interopRequireDefault(_range);

var testRange = {
  end: function end() {
    var r = (0, _range2["default"])(5);
    assert.deepEqual(r, [0, 1, 2, 3, 4]);
  },

  "start - end": function startEnd() {
    var r = (0, _range2["default"])(5, 10);
    assert.deepEqual(r, [5, 6, 7, 8, 9]);
  },

  "start - end - step": function startEndStep() {
    var r = (0, _range2["default"])(0, 10, 2);
    assert.deepEqual(r, [0, 2, 4, 6, 8]);
  },

  "no arguments": function noArguments() {
    var r = (0, _range2["default"])();
    assert.deepEqual(r, []);
  },

  "negative step": function negativeStep() {
    var r = (0, _range2["default"])(10, 5, -1);
    assert.deepEqual(r, [10, 9, 8, 7, 6]);
  },
};
exports.testRange = testRange;
