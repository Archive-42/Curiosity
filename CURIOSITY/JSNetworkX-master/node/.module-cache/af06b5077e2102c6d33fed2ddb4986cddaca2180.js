/*global assert*/
"use strict";

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireWildcard =
  require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _classes = require("../../classes");

var _classic = require("../classic");

var classic = _interopRequireWildcard(_classic);

var _classesFunctions = require("../../classes/functions");

function sorted(v) {
  return _Array$from(v).sort();
}

var testGeneratorClassic = {
  testBalancedTree: function testBalancedTree() {
    [
      [2, 2],
      [3, 3],
      [6, 2],
    ].forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var r = _ref2[0];
      var h = _ref2[1];

      var t = classic.balancedTree(r, h);
      var order = t.order();
      assert.equal(order, (Math.pow(r, h + 1) - 1) / (r - 1));
      // TODO: is_connected
      // assert(is_connected(t));
      assert.equal(t.size(), order - 1);
      var dh = (0, _classesFunctions.degreeHistogram)(t);
      assert.equal(dh[0], 0); // no nodes of 0
      assert.equal(dh[1], Math.pow(r, h)); // nodes of degree 1 are leaves
      assert.equal(dh[r], 1); // root is degree r
      // everyone else is degree r+1
      assert.equal(dh[r + 1], order - Math.pow(r, h) - 1);
      assert.equal(dh.length, r + 2);
    });
  },

  //TODO: test_balanced_tree_star

  testFullRaryTree: function testFullRaryTree() {
    var r = 2;
    var n = 9;
    var t = classic.fullRaryTree(r, n);
    assert.equal(t.order(), n);
    //TODO: is_connected
    // assert(is_connected(t));
    var dh = (0, _classesFunctions.degreeHistogram)(t);
    assert.equal(dh[0], 0); // no nodes of 0
    assert.equal(dh[1], 5); // nodes of degree 1 are leaves
    assert.equal(dh[r], 1); // root is degree r
    assert.equal(dh[r + 1], 9 - 5 - 1); // everyone else is degree r+1
    assert.equal(dh.length, r + 2);
  },

  /* TODO: is_isomorphic
  test_rary_tree_balanced: function() {
    var t = classic.full_rary_tree(2,15);
    var th = classic.balanced_tree(2,3);
    assert(is_isomorphic(t, th));
  },
   test_rary_tree_path: function() {
    var t = full_rary_tree(1,10);
    assert.equal(is_isomorphic(t, path_graph(10)), true);
  },
   test_rary_tree_empty: function() {
    var t = full_rary_tree(0,10);
    assert.equal(is_isomorphic(t, empty_graph(10)), true);
    t = full_rary_tree(3,0);
    assert.equal(is_isomorphic(t, empty_graph(0)), true);
  },
  */

  testRaryTree320: function testRaryTree320() {
    var t = classic.fullRaryTree(3, 20);
    assert.equal(t.order(), 20);
  },

  //TODO: test_barbell_graph

  testCompleteGraph: function testCompleteGraph() {
    // complete_graph(m) is a connected graph with
    // m nodes and  m*(m+1)/2 edges
    var G;
    [0, 1, 3, 5].forEach(function (m) {
      G = classic.completeGraph(m);
      assert.equal(G.numberOfNodes(), m);
      assert.equal(G.numberOfEdges(), Math.floor((m * (m - 1)) / 2));
    });

    var MG = classic.completeGraph(5, new _classes.MultiGraph());
    assert.deepEqual(MG.edges(), G.edges());
  },

  testCompleteDigraph: function testCompleteDigraph() {
    // complete_graph(m) is a connected graph with
    // m nodes and  m*(m+1)/2 edges
    [0, 1, 3, 5].forEach(function (m) {
      var G = classic.completeGraph(m, new _classes.DiGraph());
      assert.equal(G.numberOfNodes(), m);
      assert.equal(G.numberOfEdges(), Math.floor(m * (m - 1)));
    });
  },

  //TODO: test_complete_bipartite_graph
  //TODO: test_circular_ladder_graph

  testCycleGraph: function testCycleGraph() {
    var G = classic.cycleGraph(4);
    assert.deepEqual(G.edges(), [
      [0, 1],
      [0, 3],
      [1, 2],
      [2, 3],
    ]);

    var mG = classic.cycleGraph(4, new _classes.MultiGraph());
    assert.deepEqual(sorted(mG.edges()), [
      [0, 1],
      [0, 3],
      [1, 2],
      [2, 3],
    ]);

    G = classic.cycleGraph(4, new _classes.DiGraph());
    assert.equal(G.hasEdge(2, 1), false);
    assert.equal(G.hasEdge(1, 2), true);
  },

  //TODO: test_dorogovtsev_goltsev_mendes_graph

  testEmptyGraph: function testEmptyGraph() {
    var G = classic.emptyGraph();
    assert.equal(G.numberOfNodes(), 0);
    G = classic.emptyGraph(42);
    assert(G.numberOfNodes(), 42);
    assert.equal(G.numberOfEdges(), 0);
    assert.equal(G.name, "emptyGraph(42)");

    // create empty digraph
    G = classic.emptyGraph(42, new _classes.DiGraph(null, { name: "duh" }));
    assert.equal(G.numberOfNodes(), 42);
    assert.equal(G.numberOfEdges(), 0);
    assert.equal(G.name, "emptyGraph(42)");
    assert.equal(G instanceof _classes.DiGraph, true);

    // create empty multigraph
    G = classic.emptyGraph(42, new _classes.MultiGraph(null, { name: "duh" }));
    assert.equal(G.numberOfNodes(), 42);
    assert.equal(G.numberOfEdges(), 0);
    assert.equal(G.name, "emptyGraph(42)");
    assert.equal(G instanceof _classes.MultiGraph, true);

    /* TODO: peterson_graph
    // create empty graph from another
    var pete = petersen_graph();
    G = empty_graph(42, pete);
    assert.equal(number_of_nodes(G), 42);
    assert.equal(number_of_edges(G), 0);
    assert.equal(G.name(), 'empty_graph(42)');
    assert.equal(G instanceof Graph, true);
    */
  },

  testGrid2dGraph: function testGrid2dGraph() {
    var n = 5;
    var m = 6;

    var G = classic.grid2dGraph(n, m);
    assert.equal(G.numberOfNodes(), n * m);
    assert.deepEqual((0, _classesFunctions.degreeHistogram)(G), [
      0,
      0,
      4,
      2 * (n + m) - 8,
      (n - 2) * (m - 2),
    ]);
    var DG = classic.grid2dGraph(n, m, false, new _classes.DiGraph());
    assert.deepEqual(DG.succ, G.adj);
    assert.deepEqual(DG.pred, G.adj);
    var MG = classic.grid2dGraph(n, m, false, new _classes.MultiGraph());
    assert.deepEqual(MG.edges(), G.edges());
  },

  //TODO: test_grid_graph
  //TODO: test_hypercube_graph
  //TODO: test_ladder_grap    h
  //TODO: test_lollipop_graph

  testNullGraph: function testNullGraph() {
    assert.equal(classic.nullGraph().numberOfNodes(), 0);
  },

  //TODO: test_path_graph
  //TODO: test_periodic_grid_2d_graph
  //TODO: test_star_graph

  testTrivialGraph: function testTrivialGraph() {
    assert.equal(classic.trivialGraph().numberOfNodes(), 1);
  },

  //TODO: test_wheel_graph
};
exports.testGeneratorClassic = testGeneratorClassic;
