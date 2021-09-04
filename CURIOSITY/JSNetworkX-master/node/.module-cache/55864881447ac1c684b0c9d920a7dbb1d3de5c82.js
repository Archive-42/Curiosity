/*global assert */
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
var marked0$0 = [generator].map(_regeneratorRuntime.mark);

var _Map = require("../Map");

var _Map2 = _interopRequireDefault(_Map);

var _forEach = require("../forEach");

var _forEach2 = _interopRequireDefault(_forEach);

function generator(data) {
  var i;
  return _regeneratorRuntime.wrap(
    function generator$(context$1$0) {
      while (1)
        switch ((context$1$0.prev = context$1$0.next)) {
          case 0:
            i = 0;

          case 1:
            if (!(i < data.length)) {
              context$1$0.next = 7;
              break;
            }

            context$1$0.next = 4;
            return data[i];

          case 4:
            i++;
            context$1$0.next = 1;
            break;

          case 7:
          case "end":
            return context$1$0.stop();
        }
    },
    marked0$0[0],
    this
  );
}

var testForEach = {
  "over arrays": function overArrays() {
    var data = [1, 2, 3];
    var counter = 0;
    (0, _forEach2["default"])(data, function (v) {
      assert.equal(v, data[counter++]);
    });
    assert.equal(counter, data.length, "iterated over all data");
  },

  "over iterables (e.g. Maps)": function overIterablesEGMaps() {
    var data = [
      [1, 2],
      [2, 3],
    ];
    var map = new _Map2["default"](data);
    var counter = 0;
    (0, _forEach2["default"])(map, function (kv) {
      assert.deepEqual(kv, data[counter++]);
    });
    assert.equal(counter, data.length, "iterated over all data");
  },

  "over iterators (e.g. from a generator)":
    function overIteratorsEGFromAGenerator() {
      var data = [1, 2, 3];
      var iterator = generator(data);
      var counter = 0;
      (0, _forEach2["default"])(iterator, function (v) {
        assert.equal(v, data[counter++]);
      });
      assert.equal(counter, data.length, "iterated over all data");
    },

  "over objects (iterates over keys)": function overObjectsIteratesOverKeys() {
    var data = { foo: 0, bar: 1 };
    var result = [];
    (0, _forEach2["default"])(data, function (v, k) {
      result.push([k, v]);
    });
    assert.deepEqual(
      result,
      [
        ["foo", 0],
        ["bar", 1],
      ],
      "iterated over all data"
    );
  },

  // TODO
  "over graphs": false,
};
exports.testForEach = testForEach;
