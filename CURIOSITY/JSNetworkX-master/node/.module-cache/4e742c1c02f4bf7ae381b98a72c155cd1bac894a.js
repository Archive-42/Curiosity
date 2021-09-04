/*global assert */
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _isMap = require("../isMap");

var _isMap2 = _interopRequireDefault(_isMap);

var _Map = require("../Map");

var _Map2 = _interopRequireDefault(_Map);

var testIsMap = {
  "returns true for maps": function returnsTrueForMaps() {
    assert((0, _isMap2["default"])(new _Map2["default"]()));
  },

  "doesn't consider normal objects as Map":
    function doesnTConsiderNormalObjectsAsMap() {
      assert(!(0, _isMap2["default"])({}));
    },
};
exports.testIsMap = testIsMap;
