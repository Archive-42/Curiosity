"use strict";

/**
 * Returns the next value of an iterator or throws an error if the iterator was
 * already consumed.
 *
 * @param {Iterator} iterator
 * @return {?}
 */
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = next;

function next(iterator) {
  var result = iterator.next();
  if (result.done) {
    throw new Error("Iterator is already exhausted");
  }
  return result.value;
}

module.exports = exports["default"];
