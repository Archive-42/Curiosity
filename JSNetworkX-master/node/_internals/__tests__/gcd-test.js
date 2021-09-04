/*globals assert*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _gcd = require("../gcd");

var _gcd2 = _interopRequireDefault(_gcd);

var testGcd = function testGcd() {
  assert.strictEqual((0, _gcd2["default"])(48, 18), 6);
  assert.strictEqual((0, _gcd2["default"])(54, 24), 6);
  assert.strictEqual((0, _gcd2["default"])(48, 180), 12);
};
exports.testGcd = testGcd;
