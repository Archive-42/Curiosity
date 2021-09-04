/*global utils, assert*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _iteritems = require("../iteritems");

var _iteritems2 = _interopRequireDefault(_iteritems);

var testIteritems = function testIteritems() {
  var obj = { foo: 5, bar: [1, 2], 5: 42 };
  var iter = (0, _iteritems2["default"])(obj);
  assert(utils.isIterator(iter));
  assert.sameMembersDeep(_Array$from(iter), [
    ["5", 42],
    ["bar", [1, 2]],
    ["foo", 5],
  ]);
};
exports.testIteritems = testIteritems;
