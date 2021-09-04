/*global assert */
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _Map = require("../Map");

var _Map2 = _interopRequireDefault(_Map);

var _Set = require("../Set");

var _Set2 = _interopRequireDefault(_Set);

var _isIterable = require("../isIterable");

var _isIterable2 = _interopRequireDefault(_isIterable);

var testIsIterable = {
  "Maps are iterable": function MapsAreIterable() {
    assert((0, _isIterable2["default"])(new _Map2["default"]()));
  },

  "Sets are iterable": function SetsAreIterable() {
    assert((0, _isIterable2["default"])(new _Set2["default"]()));
  },
};
exports.testIsIterable = testIsIterable;
