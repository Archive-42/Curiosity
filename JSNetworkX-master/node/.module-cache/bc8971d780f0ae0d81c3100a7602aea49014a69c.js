"use strict";

/**
 * Returns true of the array is an object and has a numerical length property.
 *
 * @param {?} v
 * @return {bool}
 */
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = isArrayLike;

function isArrayLike(v) {
  return (
    v &&
    typeof v === "object" &&
    typeof v.length === "number" &&
    typeof v !== "function"
  );
}

module.exports = exports["default"];
