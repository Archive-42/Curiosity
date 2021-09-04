/*global assert */
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
var marked0$0 = [generator].map(_regeneratorRuntime.mark);

var _isIterator = require("../isIterator");

var _isIterator2 = _interopRequireDefault(_isIterator);

function generator() {
  return _regeneratorRuntime.wrap(
    function generator$(context$1$0) {
      while (1)
        switch ((context$1$0.prev = context$1$0.next)) {
          case 0:
            context$1$0.next = 2;
            return 0;

          case 2:
          case "end":
            return context$1$0.stop();
        }
    },
    marked0$0[0],
    this
  );
}

var testIsIterator = {
  "true for iterators": function trueForIterators() {
    assert((0, _isIterator2["default"])(generator()));
  },

  "does not fail for null/undefined": function doesNotFailForNullUndefined() {
    assert(!(0, _isIterator2["default"])(null));
    assert(!(0, _isIterator2["default"])(void 0));
  },
};
exports.testIsIterator = testIsIterator;
