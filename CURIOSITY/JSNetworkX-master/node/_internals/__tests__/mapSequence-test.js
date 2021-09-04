/*global assert*/
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
var marked0$0 = [generator].map(_regeneratorRuntime.mark);

var _mapSequence = require("../mapSequence");

var _mapSequence2 = _interopRequireDefault(_mapSequence);

function generator(data) {
  var i;
  return _regeneratorRuntime.wrap(
    function generator$(context$1$0) {
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

var testMapSequence = {
  "from array": function fromArray() {
    assert.deepEqual(
      (0, _mapSequence2["default"])([1, 2, 3], function (x) {
        return x * 3;
      }),
      [3, 6, 9]
    );
  },

  "from array-like": function fromArrayLike() {
    assert.deepEqual(
      (0, _mapSequence2["default"])(
        { 0: 1, 1: 2, 2: 3, length: 3 },
        function (x) {
          return x * 3;
        }
      ),
      [3, 6, 9]
    );
  },

  "from iterator": function fromIterator() {
    var iterator = (0, _mapSequence2["default"])(
      generator([1, 2, 3]),
      function (x) {
        return x * 3;
      }
    );
    var result = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = _getIterator(iterator), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        var v = _step.value;

        result.push(v);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    assert.deepEqual(result, [3, 6, 9]);
  },

  "from object": function fromObject() {
    assert.deepEqual(
      (0, _mapSequence2["default"])({ foo: 1, bar: 2 }, function (x) {
        return x * 3;
      }),
      { foo: 3, bar: 6 }
    );
  },
};
exports.testMapSequence = testMapSequence;
