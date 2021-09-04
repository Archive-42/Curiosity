/*global assert */
"use strict";

/*jshint ignore:start*/

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _Map = require("../Map");

var _Map2 = _interopRequireDefault(_Map);

/*jshint ignore:end*/

var _toMapFromKeys = require("../toMapFromKeys");

var _toMapFromKeys2 = _interopRequireDefault(_toMapFromKeys);

var testToMapFromKeys = {
  "without default value (null)": function withoutDefaultValueNull() {
    var keys = ["foo", "bar", "baz"];
    assert.deepEqual(
      (0, _toMapFromKeys2["default"])(keys),
      new _Map2["default"]({ foo: null, bar: null, baz: null })
    );
  },

  "with default value": function withDefaultValue() {
    var keys = ["foo", "bar", "baz"];
    assert.deepEqual(
      (0, _toMapFromKeys2["default"])(keys, 42),
      new _Map2["default"]({ foo: 42, bar: 42, baz: 42 })
    );
  },
};
exports.testToMapFromKeys = testToMapFromKeys;
