/*jshint strict:false, node:true*/
/*global assert */

"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _clear = require("../clear");

var _clear2 = _interopRequireDefault(_clear);

var testClear = {
  "emptys object": function emptysObject() {
    var obj = { foo: 1, bar: 2 };
    (0, _clear2["default"])(obj);
    assert.deepEqual(obj, {});
  },

  "only removes own properties": function onlyRemovesOwnProperties() {
    var proto = { foo: "bar" };
    var obj = _Object$create(proto);
    (0, _clear2["default"])(obj);
    assert.property(obj, "foo");
  },
};
exports.testClear = testClear;
