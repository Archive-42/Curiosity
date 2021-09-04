/*global assert, sinon */
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _delegateSync = require("../delegateSync");

var _delegateSync2 = _interopRequireDefault(_delegateSync);

var _WorkerSettings = require("../../WorkerSettings");

var _WorkerSettings2 = _interopRequireDefault(_WorkerSettings);

var testDelegateSync = {
  beforeEach: function beforeEach() {
    // istanbul ignore next

    var _this = this;

    this.testFunction = sinon.spy();
    _WorkerSettings2["default"].methodLookupFunction = function (name) {
      return _this[name];
    };
  },

  "it returns a promise": function itReturnsAPromise() {
    var promise = (0, _delegateSync2["default"])("testFunction");
    return assert.isFunction(promise.then);
  },

  "it passes the arguments to the delegated function":
    function itPassesTheArgumentsToTheDelegatedFunction(done) {
      // istanbul ignore next

      var _this2 = this;

      var promise = (0, _delegateSync2["default"])("testFunction", [
        "foo",
        "bar",
      ]);
      promise.then(function () {
        assert(_this2.testFunction.calledWith("foo", "bar"));
        done();
      });
    },

  "it resolves to the return value of the delegated function":
    function itResolvesToTheReturnValueOfTheDelegatedFunction() {
      this.testFunction = function () {
        return "foo";
      };
      var promise = (0, _delegateSync2["default"])("testFunction", [
        "foo",
        "bar",
      ]);
      return assert.becomes(promise, "foo");
    },

  "it rejects if the delegated function throws an error":
    function itRejectsIfTheDelegatedFunctionThrowsAnError() {
      this.testFunction = function () {
        throw new Error("some error");
      };
      var promise = (0, _delegateSync2["default"])("testFunction", [
        "foo",
        "bar",
      ]);
      return assert.isRejected(promise, "some error");
    },
};
exports.testDelegateSync = testDelegateSync;
