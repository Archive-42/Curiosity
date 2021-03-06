"use strict";

/**
 * Returns a new iterator which maps every value from the provided iterator via
 * the callback function.
 *
 * @param {Iterator} iterator
 * @param {function} map
 * @param {?=} opt_this_obj
 * @return {Iterator}
 */

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = mapIterator;
var marked0$0 = [mapIterator].map(_regeneratorRuntime.mark);

function mapIterator(iterator, map, optThisObj) {
  var _iteratorNormalCompletion,
    _didIteratorError,
    _iteratorError,
    _iterator,
    _step,
    v;

  return _regeneratorRuntime.wrap(
    function mapIterator$(context$1$0) {
      while (1)
        switch ((context$1$0.prev = context$1$0.next)) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$1$0.prev = 3;
            _iterator = _getIterator(iterator);

          case 5:
            if ((_iteratorNormalCompletion = (_step = _iterator.next()).done)) {
              context$1$0.next = 12;
              break;
            }

            v = _step.value;
            context$1$0.next = 9;
            return map.call(optThisObj, v);

          case 9:
            _iteratorNormalCompletion = true;
            context$1$0.next = 5;
            break;

          case 12:
            context$1$0.next = 18;
            break;

          case 14:
            context$1$0.prev = 14;
            context$1$0.t0 = context$1$0["catch"](3);
            _didIteratorError = true;
            _iteratorError = context$1$0.t0;

          case 18:
            context$1$0.prev = 18;
            context$1$0.prev = 19;

            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }

          case 21:
            context$1$0.prev = 21;

            if (!_didIteratorError) {
              context$1$0.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return context$1$0.finish(21);

          case 25:
            return context$1$0.finish(18);

          case 26:
          case "end":
            return context$1$0.stop();
        }
    },
    marked0$0[0],
    this,
    [
      [3, 14, 18, 26],
      [19, , 21, 25],
    ]
  );
}

module.exports = exports["default"];
