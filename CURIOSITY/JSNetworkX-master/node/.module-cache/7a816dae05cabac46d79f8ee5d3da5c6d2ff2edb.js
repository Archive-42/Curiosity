"use strict";

/**
 * Returns true if object is an iterator
 *
 * @param {*} obj
 *
 * @return {boolean}
 */
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = isIterator;

function isIterator(obj) {
  return obj && typeof obj.next === "function";
}

module.exports = exports["default"];
