/*global assert, utils*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _classes = require("../../classes");

var _generators = require("../../generators");

var _cluster = require("../cluster");

var Map = utils.Map;

var testTriangles = {
  testEmpty: function testEmpty() {
    var G = new _classes.Graph();
    assert.deepEqual(_Array$from((0, _cluster.triangles)(G).values()), []);
  },

  testPath: function testPath() {
    var G = (0, _generators.pathGraph)(10);
    assert.deepEqual(
      _Array$from((0, _cluster.triangles)(G).values()),
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    assert.deepEqual(
      (0, _cluster.triangles)(G),
      new Map({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 })
    );
  },

  //TODO:
  /*
    test_cubical: function() {
      var G = cubical_graph();
      assert.deepEqual(triangles(G).values(), [0,0,0,0,0,0,0,0]);
      assert.equal(triangles(G, 1), 0);
      assert.deepEqual(triangles(G, [1,2]).values(), [0,0]);
      assert.equal(triangles(G, 1), 0);
      assert.deepEqual(triangles(G, [1,2]), new Map({1: 0, 2: 0}));
    },
  */

  testK5: function testK5() {
    var G = (0, _generators.completeGraph)(5);
    assert.deepEqual(
      _Array$from((0, _cluster.triangles)(G).values()),
      [6, 6, 6, 6, 6]
    );
    assert.equal(
      _Array$from((0, _cluster.triangles)(G).values()).reduce(function (v, p) {
        return p + v;
      }, 0) / 3,
      10
    );
    assert.equal((0, _cluster.triangles)(G, 1), 6);
    G.removeEdge(1, 2);
    assert.deepEqual(
      _Array$from((0, _cluster.triangles)(G).values()),
      [5, 3, 3, 5, 5]
    );
    assert.deepEqual((0, _cluster.triangles)(G, 1), 3);
  },
};

exports.testTriangles = testTriangles;
var testWeightedClustering = {
  testClustering: function testClustering() {
    var G = new _classes.Graph();
    assert.deepEqual(
      _Array$from((0, _cluster.clustering)(G, null, "weight").values()),
      []
    );
    assert.deepEqual((0, _cluster.clustering)(G), new Map());
  },

  testPath: function testPath() {
    var G = (0, _generators.pathGraph)(10);
    assert.deepEqual(
      _Array$from((0, _cluster.clustering)(G, null, "weight").values()),
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    assert.deepEqual(
      (0, _cluster.clustering)(G, null, "weight"),
      new Map({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 })
    );
  },

  //TODO:
  /*
    test_cubical: function() {
      var G = cubical_graph();
      assert.deepEqual(
        clustering(G, null, 'weight').values(),
        [0,0,0,0,0,0,0,0]
      );
      assert.Equal(clustering(G, 1), 0);
      assert.deepEqual(clustering(G, [1,2], 'weight').values(), [0,0]);
      assert.equal(clustering(G, 1, 'weight'), 0);
      assert.deepEqual(clustering(G, [1,2], 'weight')).toEqual({1: 0, 2: 0});
    },
    */

  testK5: function testK5() {
    var G = (0, _generators.completeGraph)(5);
    assert.deepEqual(
      _Array$from((0, _cluster.clustering)(G, null, "weight").values()),
      [1, 1, 1, 1, 1]
    );
    assert.equal((0, _cluster.averageClustering)(G, null, "weight"), 1);
    G.removeEdge(1, 2);
    assert.deepEqual(
      _Array$from((0, _cluster.clustering)(G, null, "weight").values()),
      [5 / 6, 1, 1, 5 / 6, 5 / 6]
    );
    assert.deepEqual(
      (0, _cluster.clustering)(G, [1, 4], "weight"),
      new Map({ 1: 1, 4: 0.8333333333333334 })
    );
  },
};

exports.testWeightedClustering = testWeightedClustering;
var testClustering = {
  testClustering: function testClustering() {
    var G = new _classes.Graph();
    assert.deepEqual(_Array$from((0, _cluster.clustering)(G).values()), []);
    assert.deepEqual((0, _cluster.clustering)(G), new Map());
  },

  testPath: function testPath() {
    var G = (0, _generators.pathGraph)(10);
    assert.deepEqual(
      _Array$from((0, _cluster.clustering)(G).values()),
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    assert.deepEqual(
      (0, _cluster.clustering)(G),
      new Map({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 })
    );
  },

  //TODO:
  /*
    test_cubical: function() {
      var G = cubical_graph();
      assert.ddepEqual(clustering(G), [0,0,0,0,0,0,0,0]);
      assert.equal(clustering(G, 1)).toBe(0);
      assert.deepEqual(clustering(G, [1,2]).values(), [0,0]);
      assert.equal(clustering(G, 1), 0);
      assert.deepEqual(clustering(G, [1,2]), new Map({1: 0, 2: 0}));
    },
  */

  testK5: function testK5() {
    var G = (0, _generators.completeGraph)(5);
    assert.deepEqual(
      _Array$from((0, _cluster.clustering)(G).values()),
      [1, 1, 1, 1, 1]
    );
    assert.equal((0, _cluster.averageClustering)(G), 1);
    G.removeEdge(1, 2);
    assert.deepEqual(_Array$from((0, _cluster.clustering)(G).values()), [
      5 / 6,
      1,
      1,
      5 / 6,
      5 / 6,
    ]);
    assert.deepEqual(
      (0, _cluster.clustering)(G, [1, 4]),
      new Map({ 1: 1, 4: 0.8333333333333334 })
    );
  },

  testAverageClustering: function testAverageClustering() {
    var G = (0, _generators.cycleGraph)(3);
    G.addEdge(2, 3);
    assert.equal((0, _cluster.averageClustering)(G), (1 + 1 + 1 / 3) / 4);
    assert.equal(
      (0, _cluster.averageClustering)(G, null, null, true),
      (1 + 1 + 1 / 3) / 4
    );
    assert.equal(
      (0, _cluster.averageClustering)(G, null, null, false),
      (1 + 1 + 1 / 3) / 3
    );
  },
};

exports.testClustering = testClustering;
var testTransitivity = {
  testTransitivity: function testTransitivity() {
    var G = new _classes.Graph();
    assert.equal((0, _cluster.transitivity)(G), 0);
  },

  testPath: function testPath() {
    var G = (0, _generators.pathGraph)(10);
    assert.equal((0, _cluster.transitivity)(G), 0);
  },

  // TODO:
  /*
  test_cubical: function() {
    var G = cubical_graph();
    assert.equal(transitivity(G), 0);
  },
  */

  testK5: function testK5() {
    var G = (0, _generators.completeGraph)(5);
    assert.equal((0, _cluster.transitivity)(G), 1);
    G.removeEdge(1, 2);
    assert.equal((0, _cluster.transitivity)(G), 0.875);
  },
};

exports.testTransitivity = testTransitivity;
var testSquareClustering = {
  testClustering: function testClustering() {
    var G = new _classes.Graph();
    assert.deepEqual(
      _Array$from((0, _cluster.squareClustering)(G).values()),
      []
    );
    assert.deepEqual((0, _cluster.squareClustering)(G), new Map());
  },

  testPath: function testPath() {
    var G = (0, _generators.pathGraph)(10);
    assert.deepEqual(
      _Array$from((0, _cluster.squareClustering)(G).values()),
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    assert.deepEqual(
      (0, _cluster.squareClustering)(G),
      new Map({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 })
    );
  },

  // TODO
  /*
  test_cubical: function() {
    var G = cubical_graph();
    assert.deepEqual(
      square_clustering(G).values(),
      [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]
    );
    assert.deepEqual(square_clustering(G, [1,2]).values(), [0.5,0.5]);
    assert.equal(square_clustering(G, 1), 0.5);
    assert.deepEqual(
      square_clustering(G, [1,2]),
      new Map({1: 0.5, 2: 0.5})
    );
  },
  */

  testK5: function testK5() {
    var G = (0, _generators.completeGraph)(5);
    assert.deepEqual(
      _Array$from((0, _cluster.squareClustering)(G).values()),
      [1, 1, 1, 1, 1]
    );
  },

  //TODO: test_bipartite_k5

  // Test C4 for figure 1 Lind et al (2005)
  testLindSquareClustering: function testLindSquareClustering() {
    var G = new _classes.Graph([
      [1, 2],
      [1, 3],
      [1, 6],
      [1, 7],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
      [6, 7],
      [7, 8],
      [6, 8],
      [7, 9],
      [7, 10],
      [6, 11],
      [6, 12],
      [2, 13],
      [2, 14],
      [3, 15],
      [3, 16],
    ]);
    var G1 = G.subgraph([1, 2, 3, 4, 5, 13, 14, 15, 16]);
    var G2 = G.subgraph([1, 6, 7, 8, 9, 10, 11, 12]);

    assert.equal((0, _cluster.squareClustering)(G, 1), 3 / 75);
    assert.equal((0, _cluster.squareClustering)(G1, 1), 2 / 6);
    assert.equal((0, _cluster.squareClustering)(G2, 1), 1 / 5);
  },
};
exports.testSquareClustering = testSquareClustering;
