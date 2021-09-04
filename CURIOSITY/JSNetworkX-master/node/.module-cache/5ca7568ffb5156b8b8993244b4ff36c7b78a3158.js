/*global assert */
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _toObjectFromKeys = require("../toObjectFromKeys");

var _toObjectFromKeys2 = _interopRequireDefault(_toObjectFromKeys);

var testToObjectFromKeys = {
  "without default value (null)": function withoutDefaultValueNull() {
    var keys = ["foo", "bar", "baz"];
    assert.deepEqual((0, _toObjectFromKeys2["default"])(keys), {
      foo: null,
      bar: null,
      baz: null,
    });
  },

  "with default value": function withDefaultValue() {
    var keys = ["foo", "bar", "baz"];
    assert.deepEqual((0, _toObjectFromKeys2["default"])(keys, 42), {
      foo: 42,
      bar: 42,
      baz: 42,
    });
  },
};
exports.testToObjectFromKeys = testToObjectFromKeys;
