/*jshint strict:false, node:true*/
/*global assert */

"use strict";

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _size = require("../size");

var _size2 = _interopRequireDefault(_size);

var testSize = {
  "of array": function ofArray() {
    var data = [1, 2, 3];
    assert.equal((0, _size2["default"])(data), data.length);
  },

  "of array-like object": function ofArrayLikeObject() {
    var obj = { length: 10 };
    assert.equal((0, _size2["default"])(obj), obj.length);
  },

  "of string": function ofString() {
    var str = "foobar";
    assert.equal((0, _size2["default"])(str), str.length);
  },

  "of object (number of properties)": function ofObjectNumberOfProperties() {
    var obj = { foo: 42, bar: 42 };
    assert.equal((0, _size2["default"])(obj), _Object$keys(obj).length);
  },

  "of graph": false, //TODO
};
exports.testSize = testSize;
