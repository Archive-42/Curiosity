/*global assert, sinon */
/*eslint camelcase:0*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard =
  require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _delegate = require("../delegate");

var _delegate2 = _interopRequireDefault(_delegate);

var _ = require("../../");

var jsnx = _interopRequireWildcard(_);

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var testDelegate = {
  beforeEach: function beforeEach() {
    this.origSpawn = _child_process2["default"].spawn;
    this.spy = _child_process2["default"].spawn = sinon.spy();
  },

  afterEach: function afterEach() {
    _child_process2["default"].spawn = this.origSpawn;
  },

  "it returns a promise": function itReturnsAPromise() {
    var promise = (0, _delegate2["default"])("testFunction");
    return assert.isFunction(promise.then);
  },
};
exports.testDelegate = testDelegate;
