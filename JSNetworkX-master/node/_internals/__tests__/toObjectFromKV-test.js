/*global assert*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _toObjectFromKV = require("../toObjectFromKV");

var _toObjectFromKV2 = _interopRequireDefault(_toObjectFromKV);

var testToObjectFromKV = {
  "generate object from array of pairs":
    function generateObjectFromArrayOfPairs() {
      var obj = (0, _toObjectFromKV2["default"])([
        ["foo", 5],
        [10, [1, 2]],
      ]);
      assert.deepEqual(obj, { foo: 5, 10: [1, 2] });
    },

  "generate empty object from empty array":
    function generateEmptyObjectFromEmptyArray() {
      var obj = (0, _toObjectFromKV2["default"])([]);
      assert.deepEqual(obj, {});
    },
};
exports.testToObjectFromKV = testToObjectFromKV;
