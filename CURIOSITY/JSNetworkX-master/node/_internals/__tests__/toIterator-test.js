/*global assert, utils*/
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
var marked0$0 = [generator].map(_regeneratorRuntime.mark);

var _toIterator = require("../toIterator");

var _toIterator2 = _interopRequireDefault(_toIterator);

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

var testToIterator = {
  "from iterator (identity)": function fromIteratorIdentity() {
    var iterator = generator();
    assert.strictEqual((0, _toIterator2["default"])(iterator), iterator);
  },

  "from iterable (e.g. Map)": function fromIterableEGMap() {
    var data = [
      [1, 2],
      [3, 4],
    ];
    var map = new utils.Map(data);

    var iterator = (0, _toIterator2["default"])(map);
    assert(utils.isIterator(iterator));

    assert.deepEqual(_Array$from(iterator), data);
  },

  "from graph": false, // TODO

  "from array-like object": function fromArrayLikeObject() {
    var data = [1, 2, 3];
    var iterator = (0, _toIterator2["default"])(data);

    assert(utils.isIterator(iterator));
    assert.deepEqual(_Array$from(iterator), data);
  },
};
exports.testToIterator = testToIterator;
