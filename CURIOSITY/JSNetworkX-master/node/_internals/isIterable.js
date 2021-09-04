"use strict";

/**
 * Returns true if object implement the @@iterator method.
 *
 * @param {*} obj

 * @return {boolean}
 */

var _Symbol$iterator = require("babel-runtime/core-js/symbol/iterator")[
  "default"
];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = isIterable;

function isIterable(obj) {
  return typeof obj[_Symbol$iterator] === "function";
}

module.exports = exports["default"];
