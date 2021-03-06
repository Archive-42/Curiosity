"use strict";

/**
 * Returns the second argument if the first argument is null or undefined.
 *
 * @param {*} value
 * @param {*} defaultValue
 * @return {?}
 */
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = get;

function get(value, defaultValue) {
  return value == null ? defaultValue : value;
}

module.exports = exports["default"];
