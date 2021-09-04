"use strict";

/**
 * Removes every property of the object.
 *
 * @param {Object} obj
 */
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = clear;

function clear(obj) {
  for (var prop in obj) {
    delete obj[prop];
  }
}

module.exports = exports["default"];
