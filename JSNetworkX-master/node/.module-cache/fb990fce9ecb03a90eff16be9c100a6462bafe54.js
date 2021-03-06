"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = mapSequence;

var _lodashLangIsPlainObject = require("lodash/lang/isPlainObject");

var _lodashLangIsPlainObject2 = _interopRequireDefault(
  _lodashLangIsPlainObject
);

var _lodashObjectMapValues = require("lodash/object/mapValues");

var _lodashObjectMapValues2 = _interopRequireDefault(_lodashObjectMapValues);

var _isArrayLike = require("./isArrayLike");

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _isIterable = require("./isIterable");

var _isIterable2 = _interopRequireDefault(_isIterable);

var _isIterator = require("./isIterator");

var _isIterator2 = _interopRequireDefault(_isIterator);

var _mapIterator = require("./mapIterator");

var _mapIterator2 = _interopRequireDefault(_mapIterator);

var nativeMap = Array.prototype.map;

/**
 * Helper to map sequence types (arrays, array-like objects, objects, etc).
 * Note that if an array-like object is passed, an array is returned:
 *
 * Array -> Array
 * ArrayLike -> Array
 * Iterator -> Iterator
 * Iterable -> Iterator
 * Object -> Object
 *
 * @param {Iterable} sequence
 * @param {function(this:T,...)} callback
 * @param {T=} this_obj
 * @template T
 *
 * @return {(Array|Object|Iterator)}
 */

function mapSequence(sequence, callback, thisObj) {
  if ((0, _isArrayLike2["default"])(sequence)) {
    return nativeMap.call(sequence, callback, thisObj);
  } else if ((0, _isIterable2["default"])(sequence)) {
    sequence = _getIterator(sequence);
  }
  if ((0, _isIterator2["default"])(sequence)) {
    return (0, _mapIterator2["default"])(sequence, callback, thisObj);
  } else if ((0, _lodashLangIsPlainObject2["default"])(sequence)) {
    return (0, _lodashObjectMapValues2["default"])(sequence, callback, thisObj);
  } else {
    throw new TypeError("Can't map value of type %s", typeof sequence);
  }
}

module.exports = exports["default"];
