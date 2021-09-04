/*global assert*/

"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _Set = require("../Set");

var _Set2 = _interopRequireDefault(_Set);

var testSet = {
  testCreate: function testCreate() {
    var set = new _Set2["default"]();
    assert(set);
  },

  testAddElements: function testAddElements() {
    var set = new _Set2["default"]([1, 2, 3]);
    assert.deepEqual(_Array$from(set.values()).sort(), [1, 2, 3]);

    set = new _Set2["default"]();
    set.add(1);
    set.add("4");
    assert(set.has(1));
    assert(set.has("4"));
  },

  testRemoveElements: function testRemoveElements() {
    var set = new _Set2["default"]([1, 2, 3]);
    set["delete"](2);
    assert(!set.has(2));
    assert(set.has(1));
    assert(set.has(3));
  },

  testCount: function testCount() {
    var set = new _Set2["default"]([1, 2, 3]);
    assert.equal(set.size, 3);
  },

  difference: {
    "single argument - different set, same elements":
      function singleArgumentDifferentSetSameElements() {
        var set = new _Set2["default"]([1, 2, 3]);
        var diff = set.difference();

        assert.notEqual(diff, set);
        assert.deepEqual(diff, set);
      },

    "two arguments": function twoArguments() {
      var diff = new _Set2["default"]([1, 2, 3, 4]).difference(
        new _Set2["default"]([2, 4])
      );

      assert.deepEqual(diff, new _Set2["default"]([1, 3]));
    },

    "multiple arguments": function multipleArguments() {
      var diff = new _Set2["default"]([1, 2, 3, 4]).difference(
        new _Set2["default"]([2, 6]),
        new _Set2["default"]([4])
      );

      assert.deepEqual(diff, new _Set2["default"]([1, 3]));
    },
  },

  intersection: {
    "two arguments": function twoArguments() {
      var diff = new _Set2["default"]([1, 2, 3, 4]).intersection(
        new _Set2["default"]([2, 4])
      );

      assert.deepEqual(diff, new _Set2["default"]([2, 4]));
    },

    "multiple arguments": function multipleArguments() {
      var diff = new _Set2["default"]([1, 2, 3, 4]).intersection(
        new _Set2["default"]([2, 6]),
        new _Set2["default"]([2, 4])
      );

      assert.deepEqual(diff, new _Set2["default"]([2]));
    },
  },
};

exports.testSet = testSet;
var testSymmetricDifference = {
  "empty set": function emptySet() {
    var full = new _Set2["default"]([1, 2, 3]);
    var empty = new _Set2["default"]();
    var result = (0, _Set.symmetricDifference)(full, empty);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);

    result = (0, _Set.symmetricDifference)(empty, full);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);
  },

  "sets with common elements": function setsWithCommonElements() {
    var a = new _Set2["default"]([1, 2, 3, 4]);
    var b = new _Set2["default"]([3, 4, 5, 6]);
    assert.deepEqual(
      (0, _Set.symmetricDifference)(a, b),
      new _Set2["default"]([1, 2, 5, 6])
    );
    assert.deepEqual(
      (0, _Set.symmetricDifference)(b, a),
      new _Set2["default"]([1, 2, 5, 6])
    );
  },

  "sets without common elements": function setsWithoutCommonElements() {
    var a = new _Set2["default"]([1, 2]);
    var b = new _Set2["default"]([3, 4]);
    assert.deepEqual(
      (0, _Set.symmetricDifference)(a, b),
      new _Set2["default"]([1, 2, 3, 4])
    );
    assert.deepEqual(
      (0, _Set.symmetricDifference)(b, a),
      new _Set2["default"]([1, 2, 3, 4])
    );
  },
};

exports.testSymmetricDifference = testSymmetricDifference;
var testUnion = {
  "empty set": function emptySet() {
    var full = new _Set2["default"]([1, 2, 3]);
    var empty = new _Set2["default"]();
    var result = (0, _Set.union)(full, empty);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);

    result = (0, _Set.union)(empty, full);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);
  },

  "sets with common elements": function setsWithCommonElements() {
    var a = new _Set2["default"]([1, 2, 3, 4]);
    var b = new _Set2["default"]([3, 4, 5, 6]);
    assert.deepEqual(
      (0, _Set.union)(a, b),
      new _Set2["default"]([1, 2, 3, 4, 5, 6])
    );
    assert.deepEqual(
      (0, _Set.union)(b, a),
      new _Set2["default"]([1, 2, 3, 4, 5, 6])
    );
  },

  "sets without common elements": function setsWithoutCommonElements() {
    var a = new _Set2["default"]([1, 2]);
    var b = new _Set2["default"]([3, 4]);
    assert.deepEqual((0, _Set.union)(a, b), new _Set2["default"]([1, 2, 3, 4]));
    assert.deepEqual((0, _Set.union)(b, a), new _Set2["default"]([1, 2, 3, 4]));
  },
};
exports.testUnion = testUnion;
