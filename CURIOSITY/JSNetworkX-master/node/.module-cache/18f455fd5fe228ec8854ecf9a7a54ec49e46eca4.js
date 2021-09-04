/*global assert, utils*/
"use strict";

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _relabel = require("../../../relabel");

var _generators = require("../../../generators");

var _classes = require("../../../classes");

var _unweighted = require("../unweighted");

var Map = utils.Map;
var zipSequence = utils.zipSequence;

function validateGridPath(r, c, s, t, p) {
  assert.ok(Array.isArray(p));
  assert.equal(p[0], s);
  assert.equal(p[p.length - 1], t);
  s = [Math.floor((s - 1) / c), (s - 1) % c];
  t = [Math.floor((t - 1) / c), (t - 1) % c];
  assert.equal(p.length, Math.abs(t[0] - s[0]) + Math.abs(t[1] - s[1]) + 1);
  var u;
  p = (function () {
    var _p = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = _getIterator(p), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        var _u = _step.value;

        _p.push([Math.floor((_u - 1) / c), (_u - 1) % c]);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _p;
  })();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (
      var _iterator2 = _getIterator(p), _step2;
      !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
      _iteratorNormalCompletion2 = true
    ) {
      var _u2 = _step2.value;

      assert.ok(0 <= _u2[0] && _u2[0] < r);
      assert.ok(0 <= _u2[1] && _u2[1] < c);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (
      var _iterator3 = _getIterator(
          zipSequence(p.slice(0, p.length - 1), p.slice(1))
        ),
        _step3;
      !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
      _iteratorNormalCompletion3 = true
    ) {
      var _step3$value = _slicedToArray(_step3.value, 2);

      var _u3 = _step3$value[0];
      var v = _step3$value[1];

      assert.isOneOf(
        [Math.abs(v[0] - _u3[0]), Math.abs(v[1] - _u3[1])],
        [
          [0, 1],
          [1, 0],
        ]
      );
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

var testUnweightedPath = {
  beforeEach: function beforeEach() {
    this.grid = (0, _relabel.convertNodeLabelsToIntegers)(
      (0, _generators.grid2dGraph)(4, 4),
      1,
      "sorted"
    );
    this.cycle = (0, _generators.cycleGraph)(7);
    this.directedCycle = (0, _generators.cycleGraph)(7, new _classes.DiGraph());
  },

  testBidirectionalShortestPath: function testBidirectionalShortestPath() {
    assert.deepEqual(
      (0, _unweighted.bidirectionalShortestPath)(this.cycle, 0, 3),
      [0, 1, 2, 3]
    );
    assert.deepEqual(
      (0, _unweighted.bidirectionalShortestPath)(this.cycle, 0, 4),
      [0, 6, 5, 4]
    );
    validateGridPath(
      4,
      4,
      1,
      12,
      (0, _unweighted.bidirectionalShortestPath)(this.grid, 1, 12)
    );
    assert.deepEqual(
      (0, _unweighted.bidirectionalShortestPath)(this.directedCycle, 0, 3),
      [0, 1, 2, 3]
    );
  },

  //TODO: test_shortest_path_length

  testSingleSourceShortestPath: function testSingleSourceShortestPath() {
    var p = (0, _unweighted.singleSourceShortestPath)(this.cycle, 0);
    assert.deepEqual(p.get(3), [0, 1, 2, 3]);
    p = (0, _unweighted.singleSourceShortestPath)(this.cycle, 0, 0);
    assert.deepEqual(p, new Map({ 0: [0] }));
  },

  testSingleSourceShortestPathLength:
    function testSingleSourceShortestPathLength() {
      assert.deepEqual(
        (0, _unweighted.singleSourceShortestPathLength)(this.cycle, 0),
        new Map({ 0: 0, 1: 1, 2: 2, 3: 3, 4: 3, 5: 2, 6: 1 })
      );
    },

  testAllPairsShortestPath: function testAllPairsShortestPath() {
    var p = (0, _unweighted.allPairsShortestPath)(this.cycle);
    assert.deepEqual(p.get(0).get(3), [0, 1, 2, 3]);
    p = (0, _unweighted.allPairsShortestPath)(this.grid);
    validateGridPath(4, 4, 1, 12, p.get(1).get(12));
  },

  testAllPairsShortestPathLength: function testAllPairsShortestPathLength() {
    var l = (0, _unweighted.allPairsShortestPathLength)(this.cycle);
    assert.deepEqual(
      l.get(0),
      new Map({ 0: 0, 1: 1, 2: 2, 3: 3, 4: 3, 5: 2, 6: 1 })
    );
    l = (0, _unweighted.allPairsShortestPathLength)(this.grid);
    assert.deepEqual(l.get(1).get(16), 6);
  },

  testPredecessor: function testPredecessor() {
    var G = (0, _generators.pathGraph)(4);
    assert.deepEqual(
      (0, _unweighted.predecessor)(G, 0),
      new Map({ 0: [], 1: [0], 2: [1], 3: [2] })
    );
    assert.deepEqual((0, _unweighted.predecessor)(G, 0, { target: 3 }), [2]);
    G = (0, _generators.grid2dGraph)(2, 2);
    assert.deepEqual(
      _Array$from((0, _unweighted.predecessor)(G, [0, 0])).sort(),
      [
        [[0, 0], []],
        [[0, 1], [[0, 0]]],
        [[1, 0], [[0, 0]]],
        [
          [1, 1],
          [
            [1, 0],
            [0, 1],
          ],
        ],
      ]
    );
  },

  testPredecessorCutoff: function testPredecessorCutoff() {
    var G = (0, _generators.pathGraph)(4);
    assert.notInclude((0, _unweighted.predecessor)(G, 0, { target: 3 }), 4);
  },

  testPredecessorTarget: function testPredecessorTarget() {
    var G = (0, _generators.pathGraph)(4);
    assert.deepEqual((0, _unweighted.predecessor)(G, 0, { target: 3 }), [2]);
    assert.deepEqual(
      (0, _unweighted.predecessor)(G, 0, { target: 3, cutoff: 2 }),
      []
    );
    assert.deepEqual(
      (0, _unweighted.predecessor)(G, 0, { target: 3, returnSeen: 2 }),
      [[2], 3]
    );
    assert.deepEqual(
      (0, _unweighted.predecessor)(G, 0, {
        target: 3,
        cutoff: 2,
        returnSeen: 2,
      }),
      [[], -1]
    );
  },
};
exports.testUnweightedPath = testUnweightedPath;
