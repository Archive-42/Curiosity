/*global assert*/
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _ = require("../../../");

var _generators = require("../../../generators");

var _generic = require("../generic");

var _unweighted = require("../unweighted");

var _weighted = require("../weighted");

function validateGridPath(r, c, s, t, p) {
  assert.isArray(p);
  assert.equal(p[0], s);
  assert.equal(p[p.length - 1], t);
  s = [Math.floor((s - 1) / c), (s - 1) % c];
  t = [Math.floor((t - 1) / c), (t - 1) % c];
  assert.equal(p.length, Math.abs(t[0] - s[0]) + Math.abs(t[1] - s[1]) + 1);
  p = p.map(function (u) {
    return [Math.floor((u - 1) / c), (u - 1) % c];
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = _getIterator(p), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var u = _step.value;

      assert.ok(0 <= u[0] && u[0] < r);
      assert.ok(0 <= u[1] && u[1] < c);
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

  for (var i = 0; i < p.length - 1; i++) {
    assert.deepEqual(
      [Math.abs(p[i + 1][0] - p[i][0]), Math.abs(p[i + 1][1] - p[i][1])].sort(),
      [0, 1]
    );
  }
}

var testGenericPath = {
  beforeEach: function beforeEach() {
    this.grid = (0, _.convertNodeLabelsToIntegers)(
      (0, _generators.grid2dGraph)(4, 4),
      1,
      "sorted"
    );
    this.cycle = (0, _generators.cycleGraph)(7);
    this.directedCycle = (0, _generators.cycleGraph)(7, new _.DiGraph());
  },

  testShortestPath: function testShortestPath() {
    assert.deepEqual(
      (0, _generic.shortestPath)(this.cycle, { source: 0, target: 3 }),
      [0, 1, 2, 3]
    );
    assert.deepEqual(
      (0, _generic.shortestPath)(this.cycle, { source: 0, target: 4 }),
      [0, 6, 5, 4]
    );
    validateGridPath(
      4,
      4,
      1,
      12,
      (0, _generic.shortestPath)(this.grid, { source: 1, target: 12 })
    );
    assert.deepEqual(
      (0, _generic.shortestPath)(this.directedCycle, { source: 0, target: 3 }),
      [0, 1, 2, 3]
    );

    // now with weights
    assert.deepEqual(
      (0, _generic.shortestPath)(this.cycle, {
        source: 0,
        target: 3,
        weight: "weight",
      }),
      [0, 1, 2, 3]
    );
    assert.deepEqual(
      (0, _generic.shortestPath)(this.cycle, {
        source: 0,
        target: 4,
        weight: "weight",
      }),
      [0, 6, 5, 4]
    );
    validateGridPath(
      4,
      4,
      1,
      12,
      (0, _generic.shortestPath)(this.grid, {
        source: 1,
        target: 12,
        weight: "weight",
      })
    );
    assert.deepEqual(
      (0, _generic.shortestPath)(this.directedCycle, {
        source: 0,
        target: 3,
        weight: "weight",
      }),
      [0, 1, 2, 3]
    );
  },

  testShortestPathTarget: function testShortestPathTarget() {
    var paths = (0, _generic.shortestPath)((0, _generators.pathGraph)(3), {
      target: 1,
    });
    assert.deepEqual(
      paths,
      new _.Map([
        [0, [0, 1]],
        [1, [1]],
        [2, [2, 1]],
      ])
    );
  },

  testShortestPathLength: function testShortestPathLength() {
    assert.equal(
      (0, _generic.shortestPathLength)(this.cycle, { source: 0, target: 3 }),
      3
    );
    assert.equal(
      (0, _generic.shortestPathLength)(this.grid, { source: 1, target: 12 }),
      5
    );
    assert.equal(
      (0, _generic.shortestPathLength)(this.directedCycle, {
        source: 0,
        target: 4,
      }),
      4
    );

    // now with weights
    assert.equal(
      (0, _generic.shortestPathLength)(this.cycle, {
        source: 0,
        target: 3,
        weight: "weight",
      }),
      3
    );
    assert.equal(
      (0, _generic.shortestPathLength)(this.grid, {
        source: 1,
        target: 12,
        weight: "weight",
      }),
      5
    );
    assert.equal(
      (0, _generic.shortestPathLength)(this.directedCycle, {
        source: 0,
        target: 4,
        weight: "weight",
      }),
      4
    );
  },

  testShortestPathLengthTarget: function testShortestPathLengthTarget() {
    var distances = (0, _generic.shortestPathLength)(
      (0, _generators.pathGraph)(3),
      { target: 1 }
    );
    assert.equal(distances.get(0), 1);
    assert.equal(distances.get(1), 0);
    assert.equal(distances.get(2), 1);
  },

  testSingleSourceShortestPath: function testSingleSourceShortestPath() {
    var paths = (0, _generic.shortestPath)(this.cycle, { source: 0 });
    assert.deepEqual(paths.get(3), [0, 1, 2, 3]);
    assert.deepEqual(
      paths,
      (0, _unweighted.singleSourceShortestPath)(this.cycle, 0)
    );
    paths = (0, _generic.shortestPath)(this.grid, { source: 1 });
    validateGridPath(4, 4, 1, 12, paths.get(12));

    // now with weights
    paths = (0, _generic.shortestPath)(this.cycle, {
      source: 0,
      weight: "weight",
    });
    assert.deepEqual(paths.get(3), [0, 1, 2, 3]);
    assert.deepEqual(
      paths,
      (0, _weighted.singleSourceDijkstraPath)(this.cycle, { source: 0 })
    );
    paths = (0, _generic.shortestPath)(this.grid, {
      source: 1,
      weight: "weight",
    });
    validateGridPath(4, 4, 1, 12, paths.get(12));
  },

  testSingleSourceShortestPathLength:
    function testSingleSourceShortestPathLength() {
      var distances = (0, _generic.shortestPathLength)(this.cycle, {
        source: 0,
      });
      assert.deepEqual(
        distances,
        new _.Map([
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 3],
          [5, 2],
          [6, 1],
        ])
      );
      assert.deepEqual(
        distances,
        (0, _unweighted.singleSourceShortestPathLength)(this.cycle, 0)
      );
      distances = (0, _generic.shortestPathLength)(this.grid, { source: 1 });
      assert.equal(distances.get(16), 6);

      // now with weights
      distances = (0, _generic.shortestPathLength)(this.cycle, {
        source: 0,
        weight: "weight",
      });
      assert.deepEqual(
        distances,
        new _.Map([
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 3],
          [5, 2],
          [6, 1],
        ])
      );
      assert.deepEqual(
        distances,
        (0, _weighted.singleSourceDijkstraPathLength)(this.cycle, { source: 0 })
      );
      distances = (0, _generic.shortestPathLength)(this.grid, {
        source: 1,
        weight: "weight",
      });
      assert.equal(distances.get(16), 6);
    },

  testAllPairsShortestPath: function testAllPairsShortestPath() {
    var paths = (0, _generic.shortestPath)(this.cycle);
    assert.deepEqual(paths.get(0).get(3), [0, 1, 2, 3]);
    assert.deepEqual(paths, (0, _unweighted.allPairsShortestPath)(this.cycle));
    paths = (0, _generic.shortestPath)(this.grid);
    validateGridPath(4, 4, 1, 12, paths.get(1).get(12));

    // now with weights
    paths = (0, _generic.shortestPath)(this.cycle, { weight: "weight" });
    assert.deepEqual(paths.get(0).get(3), [0, 1, 2, 3]);
    assert.deepEqual(paths, (0, _weighted.allPairsDijkstraPath)(this.cycle));
    paths = (0, _generic.shortestPath)(this.grid, { weight: "weight" });
    validateGridPath(4, 4, 1, 12, paths.get(1).get(12));
  },

  testAllPairsShortestPathLength: function testAllPairsShortestPathLength() {
    var distances = (0, _generic.shortestPathLength)(this.cycle);
    assert.deepEqual(
      distances.get(0),
      new _.Map([
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 3],
        [5, 2],
        [6, 1],
      ])
    );
    assert.deepEqual(
      distances,
      (0, _unweighted.allPairsShortestPathLength)(this.cycle)
    );
    distances = (0, _generic.shortestPathLength)(this.grid);
    assert.equal(distances.get(1).get(16), 6);

    // now with weights
    distances = (0, _generic.shortestPathLength)(this.cycle, {
      weight: "weight",
    });
    assert.deepEqual(
      distances.get(0),
      new _.Map([
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 3],
        [5, 2],
        [6, 1],
      ])
    );
    assert.deepEqual(
      distances,
      (0, _weighted.allPairsDijkstraPathLength)(this.cycle)
    );
    distances = (0, _generic.shortestPathLength)(this.grid, {
      weight: "weight",
    });
    assert.equal(distances.get(1).get(16), 6);
  },

  // TODO testAverageShortestPath
  // TODO testWeightedAverageShortestPath
  // TODO testAverageShortestDisconnect

  testHasPath: function testHasPath() {
    var G = new _.Graph();
    G.addPath([0, 1, 2]);
    G.addPath([3, 4]);
    assert.ok((0, _generic.hasPath)(G, { source: 0, target: 2 }));
    assert.notOk((0, _generic.hasPath)(G, { source: 0, target: 4 }));
  },
};
exports.testGenericPath = testGenericPath;
//
// TODO testAllShortestPaths
// TODO testAllShortestPathsRaise
