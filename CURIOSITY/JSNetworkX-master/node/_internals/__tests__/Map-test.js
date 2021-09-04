/*global utils, assert, regeneratorRuntime*/
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _Map = require("../Map");

var _Map2 = _interopRequireDefault(_Map);

var toIterator = utils.toIterator;

var testMap = {
  beforeEach: function beforeEach() {
    this.map = new _Map2["default"]();
    this.map.set("0", 0);
    this.map.set("1", 1);
    this.map.set("2", 2);
  },

  "new Map()": {
    "no data": function noData() {
      assert.equal(new _Map2["default"]().size, 0, "Empty constructor");
    },

    "from array of pairs": function fromArrayOfPairs() {
      var data = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];
      var map = new _Map2["default"](data);

      assert.equal(map.size, 3);
      assert.equal(map.get(1), 2);
      assert.equal(map.get(3), 4);
      assert.equal(map.get(5), 6);
    },

    "from iterator": function fromIterator() {
      var data = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];
      var iter = toIterator(data);
      var map = new _Map2["default"](iter);

      assert.equal(map.size, 3);
      assert.equal(map.get(1), 2);
      assert.equal(map.get(3), 4);
      assert.equal(map.get(5), 6);
    },

    "from object": function fromObject() {
      var data = { 1: 2, 3: 4 };
      var map = new _Map2["default"](data);
      assert.equal(map.size, 2);
      assert.equal(map.get(1), 2);
      assert.equal(map.get(3), 4);
    },
  },

  "#set() && #get()": {
    "integer keys": function integerKeys() {
      var map = new _Map2["default"]();
      map.set(0, 1);
      map.set(1, 2);

      assert.strictEqual(map.get(0), 1);
      assert.strictEqual(map.get(1), 2);
    },

    "string keys": function stringKeys() {
      var map = new _Map2["default"]();
      map.set("0", 1);
      map.set("1", 2);

      assert.strictEqual(map.get("0"), 1);
      assert.strictEqual(map.get("1"), 2);
    },

    "integers and strings are treated separately":
      function integersAndStringsAreTreatedSeparately() {
        var map = new _Map2["default"]();
        map.set(0, 1);
        map.set("0", 2);

        assert.strictEqual(map.get(0), 1);
        assert.strictEqual(map.get("0"), 2);
      },

    "arrays of primitive are considered equal":
      function arraysOfPrimitiveAreConsideredEqual() {
        var map = new _Map2["default"]();
        map.set([1, 2], 1);

        assert.strictEqual(map.get([1, 2]), 1);
      },

    "object keys with same toString result are considered equal":
      function objectKeysWithSameToStringResultAreConsideredEqual() {
        var map = new _Map2["default"]();
        var obj1 = {
          toString: function toString() {
            return "foo";
          },
        };
        var obj2 = {
          toString: function toString() {
            return "bar";
          },
        };
        var obj3 = {
          toString: function toString() {
            return "bar";
          },
        };

        map.set(obj1, 1);
        map.set(obj2, 2);

        assert.strictEqual(map.get(obj1), 1);
        assert.strictEqual(map.get(obj3), 2);
      },
  },

  "#entries()": function entries() {
    assert(
      _regeneratorRuntime.isGeneratorFunction(this.map.entries),
      "is generator"
    );
    assert.deepEqual(_Array$from(this.map.entries()).sort(), [
      ["0", 0],
      ["1", 1],
      ["2", 2],
    ]);
  },

  "#keys()": function keys() {
    assert(
      _regeneratorRuntime.isGeneratorFunction(this.map.keys),
      "is generator"
    );
    assert.deepEqual(_Array$from(this.map.keys()).sort(), ["0", "1", "2"]);
  },

  "#values()": function values() {
    assert(
      _regeneratorRuntime.isGeneratorFunction(this.map.values),
      "is generator"
    );
    assert.deepEqual(_Array$from(this.map.values()).sort(), [0, 1, 2]);
  },
};
exports.testMap = testMap;
