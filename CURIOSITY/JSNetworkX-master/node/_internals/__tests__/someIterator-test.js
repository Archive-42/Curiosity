/*globals assert, utils*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _someIterator = require("../someIterator");

var _someIterator2 = _interopRequireDefault(_someIterator);

var testSomeIterator = function testSomeIterator() {
  assert.ok(
    (0, _someIterator2["default"])(utils.genRange(10), function (x) {
      return x % 2 === 0;
    })
  );
  assert.ok(
    !(0, _someIterator2["default"])(utils.genRange(3), function (x) {
      return x === 5;
    })
  );
  assert.ok(
    !(0, _someIterator2["default"])(utils.genRange(0), function () {
      return true;
    })
  );
};
exports.testSomeIterator = testSomeIterator;
