"use strict";

/**
 * Returns true if the callback function returns true for any of the elements
 * of the iterator.
 *
 * @param {Iterator} iterator
 * @param {function} callback
 * @return {boolean}
 */

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = someIterator;

function someIterator(iterator, callback) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = _getIterator(iterator), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var value = _step.value;

      if (callback(value)) {
        return true;
      }
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

  return false;
}

module.exports = exports["default"];
