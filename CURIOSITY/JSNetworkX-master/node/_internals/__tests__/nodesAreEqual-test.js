/*global assert*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _nodesAreEqual = require("../nodesAreEqual");

var _nodesAreEqual2 = _interopRequireDefault(_nodesAreEqual);

var testNodesAreEqual = {
  equal: function equal() {
    assert.ok((0, _nodesAreEqual2["default"])(42, 42));
    assert.ok((0, _nodesAreEqual2["default"])("foo", "foo"));

    assert.ok((0, _nodesAreEqual2["default"])([1, 2, 3], [1, 2, 3]));
    var foo = {
      toString: function toString() {
        return "42";
      },
    };
    var bar = {
      toString: function toString() {
        return "42";
      },
    };
    assert.ok((0, _nodesAreEqual2["default"])(foo, bar));
  },

  "not equal": function notEqual() {
    assert.ok(!(0, _nodesAreEqual2["default"])(1, 2));
    assert.ok(!(0, _nodesAreEqual2["default"])(42, "42"));
  },
};
exports.testNodesAreEqual = testNodesAreEqual;
