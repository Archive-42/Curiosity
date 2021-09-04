/*jshint strict:false, node:true*/
/*global assert */

"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _isArrayLike = require("../isArrayLike");

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var testIsArrayLike = {
  arrays: function arrays() {
    var data = [1, 2, 3];
    assert((0, _isArrayLike2["default"])(data));
  },

  "objects with a numeric length property":
    function objectsWithANumericLengthProperty() {
      var obj = { length: 3 };
      assert((0, _isArrayLike2["default"])(obj));
    },

  "not objects with a non-numeric length property":
    function notObjectsWithANonNumericLengthProperty() {
      var obj = { length: "foo" };
      assert(!(0, _isArrayLike2["default"])(obj));
    },

  "not strings": function notStrings() {
    assert(!(0, _isArrayLike2["default"])("foo"));
  },

  "not functions": function notFunctions() {
    assert(!(0, _isArrayLike2["default"])(function () {}));
  },
};
exports.testIsArrayLike = testIsArrayLike;
