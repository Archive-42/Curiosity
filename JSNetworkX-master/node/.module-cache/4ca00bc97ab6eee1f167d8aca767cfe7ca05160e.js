/*global assert */
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _isSet = require("../isSet");

var _isSet2 = _interopRequireDefault(_isSet);

var _Set = require("../Set");

var _Set2 = _interopRequireDefault(_Set);

var testIsSet = {
  "returns true for sets": function returnsTrueForSets() {
    assert((0, _isSet2["default"])(new _Set2["default"]()));
  },

  "doesn't consider normal objects as Set":
    function doesnTConsiderNormalObjectsAsSet() {
      assert(!(0, _isSet2["default"])({}));
    },
};
exports.testIsSet = testIsSet;
