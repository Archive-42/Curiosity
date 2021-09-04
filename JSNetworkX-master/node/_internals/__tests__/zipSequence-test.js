/*global assert*/
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
var marked0$0 = [gen].map(_regeneratorRuntime.mark);

var _zipSequence = require("../zipSequence");

var _zipSequence2 = _interopRequireDefault(_zipSequence);

function gen(data) {
  var i;
  return _regeneratorRuntime.wrap(
    function gen$(context$1$0) {
      while (1)
        switch ((context$1$0.prev = context$1$0.next)) {
          case 0:
            i = 0;

          case 1:
            if (!(i < data.length)) {
              context$1$0.next = 7;
              break;
            }

            context$1$0.next = 4;
            return data[i];

          case 4:
            i++;
            context$1$0.next = 1;
            break;

          case 7:
          case "end":
            return context$1$0.stop();
        }
    },
    marked0$0[0],
    this
  );
}

var testZipSequence = {
  "zip arrays": function zipArrays() {
    assert.deepEqual(
      (0, _zipSequence2["default"])([1, 2, 3], [4, 5, 6], [7, 8, 9]),
      [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]
    );
  },

  "zip arrays-like objects": function zipArraysLikeObjects() {
    assert.deepEqual(
      (0, _zipSequence2["default"])(
        { length: 2, 0: 1, 1: 2 },
        { length: 3, 0: 3, 1: 4, 2: 5 }
      ),
      [
        [1, 3],
        [2, 4],
      ]
    );
  },

  "zip iterators": function zipIterators() {
    assert.deepEqual(
      _Array$from((0, _zipSequence2["default"])(gen([1, 2, 3]), gen([4, 5]))),
      [
        [1, 4],
        [2, 5],
      ]
    );
  },
};
exports.testZipSequence = testZipSequence;
