"use strict";

/**
 * Returns true if the two values are equal node values. If the values are
 * primitives, they are compared directly. If they are objects, their string
 * representation is compared.
 *
 * @param {Node} a
 * @param {Node} b
 * @return {boolean}
 */
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = nodesAreEqual;

function nodesAreEqual(a, b) {
  return a === b || (typeof a === "object" && a.toString() === b.toString());
}

module.exports = exports["default"];
