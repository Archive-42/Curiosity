/*globals assert, utils*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard =
  require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _classes = require("../../classes");

var _exceptionsJSNetworkXError = require("../../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

var _exceptionsJSNetworkXUnfeasible = require("../../exceptions/JSNetworkXUnfeasible");

var _exceptionsJSNetworkXUnfeasible2 = _interopRequireDefault(
  _exceptionsJSNetworkXUnfeasible
);

var _dag = require("../dag");

var dag = _interopRequireWildcard(_dag);

var _generators = require("../../generators");

var TestDAG = {
  testTopologicalSort1: function testTopologicalSort1() {
    var DG = new _classes.DiGraph();
    DG.addEdgesFrom([
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
    assert.deepEqual(dag.topologicalSort(DG), [1, 2, 3]);
    assert.deepEqual(dag.topologicalSortRecursive(DG), [1, 2, 3]);
  },

  testTopologicalSort2: function testTopologicalSort2() {
    var DG = new _classes.DiGraph({
      1: [2],
      2: [3],
      3: [4],
      4: [5],
      5: [1],
      11: [12],
      12: [13],
      13: [14],
      14: [15],
    });

    assert.throws(function () {
      return dag.topologicalSort(DG);
    }, _exceptionsJSNetworkXUnfeasible2["default"]);
    assert.throws(function () {
      return dag.topologicalSortRecursive(DG);
    }, _exceptionsJSNetworkXUnfeasible2["default"]);

    assert(!dag.isDirectedAcyclicGraph(DG));

    DG.removeEdge(1, 2);
    assert.deepEqual(
      dag.topologicalSortRecursive(DG),
      [11, 12, 13, 14, 15, 2, 3, 4, 5, 1]
    );
    assert.deepEqual(
      dag.topologicalSort(DG),
      [11, 12, 13, 14, 15, 2, 3, 4, 5, 1]
    );
    assert(dag.isDirectedAcyclicGraph(DG));
  },

  testTopologicalSort3: function testTopologicalSort3() {
    var DG = new _classes.DiGraph();
    DG.addEdgesFrom(
      utils.range(2, 5).map(function (i) {
        return [1, i];
      })
    );
    DG.addEdgesFrom(
      utils.range(5, 9).map(function (i) {
        return [2, i];
      })
    );
    DG.addEdgesFrom(
      utils.range(9, 12).map(function (i) {
        return [6, i];
      })
    );
    DG.addEdgesFrom(
      utils.range(12, 15).map(function (i) {
        return [4, i];
      })
    );

    /*
    * Doesn't validate, probably because the order in which the nodes are
    * iterated over is different.
    assert.deepEqual(
      dag.topological_sort_recursive(DG),
      [1,4,14,13,12,3,2,7,6,11,10,9,5,8]
    );
    assert.deepEqual(
      dag.topological_sort(DG),
      [1,2,8,5,6,9,10,11,7,3,4,12,13,14]
    );
    */

    DG.addEdge(14, 1);

    assert.throws(function () {
      return dag.topologicalSort(DG);
    }, _exceptionsJSNetworkXUnfeasible2["default"]);
    assert.throws(function () {
      return dag.topologicalSortRecursive(DG);
    }, _exceptionsJSNetworkXUnfeasible2["default"]);
  },

  testTopologicalSort4: function testTopologicalSort4() {
    var G = new _classes.Graph();
    G.addEdge(0, 1);
    assert.throws(function () {
      return dag.topologicalSort(G);
    }, _exceptionsJSNetworkXError2["default"]);
    assert.throws(function () {
      return dag.topologicalSortRecursive(G);
    }, _exceptionsJSNetworkXError2["default"]);
  },

  testTopologicalSort5: function testTopologicalSort5() {
    var G = new _classes.DiGraph();
    G.addEdge(0, 1);
    assert.deepEqual(dag.topologicalSortRecursive(G), [0, 1]);
    assert.deepEqual(dag.topologicalSort(G), [0, 1]);
  },

  testNbunchArgument: function testNbunchArgument() {
    var G = new _classes.DiGraph();
    G.addEdgesFrom([
      [1, 2],
      [2, 3],
      [1, 4],
      [1, 5],
      [2, 6],
    ]);
    assert.deepEqual(dag.topologicalSort(G), [1, 2, 3, 6, 4, 5]);
    assert.deepEqual(dag.topologicalSortRecursive(G), [1, 5, 4, 2, 6, 3]);
    assert.deepEqual(dag.topologicalSort(G, [1]), [1, 2, 3, 6, 4, 5]);
    assert.deepEqual(dag.topologicalSortRecursive(G, [1]), [1, 5, 4, 2, 6, 3]);
    assert.deepEqual(dag.topologicalSort(G, [5]), [5]);
    assert.deepEqual(dag.topologicalSortRecursive(G, [5]), [5]);
  },

  testIsAperiodicCycle: function testIsAperiodicCycle() {
    var G = new _classes.DiGraph();
    G.addCycle([1, 2, 3, 4]);
    assert(!dag.isAperiodic(G));
  },

  testIsAperiodicCycle2: function testIsAperiodicCycle2() {
    var G = new _classes.DiGraph();
    G.addCycle([1, 2, 3, 4]);
    G.addCycle([3, 4, 5, 6, 7]);
    assert(dag.isAperiodic(G));
  },

  testIsAperiodicCycle3: function testIsAperiodicCycle3() {
    var G = new _classes.DiGraph();
    G.addCycle([1, 2, 3, 4]);
    G.addCycle([3, 4, 5, 6]);
    assert(!dag.isAperiodic(G));
  },

  testIsAperiodicCycle4: function testIsAperiodicCycle4() {
    var G = new _classes.DiGraph();
    G.addCycle([1, 2, 3, 4]);
    G.addCycle([1, 3]);
    assert(dag.isAperiodic(G));
  },

  testIsAperiodicSelfloop: function testIsAperiodicSelfloop() {
    var G = new _classes.DiGraph();
    G.addCycle([1, 2, 3, 4]);
    G.addEdge(1, 1);
    assert(dag.isAperiodic(G));
  },

  testIsAperiodicRaise: function testIsAperiodicRaise() {
    var G = new _classes.Graph();
    assert.throws(function () {
      return dag.isAperiodic(G);
    }, _exceptionsJSNetworkXError2["default"]);
  },

  /* TODO: davis_southern_women_graph
  test_is_aperiodic_bipartite: function() {
    var G = new DiGraph(davis_southern_women_graph());
    assert(!dag.is_aperiodic(G));
  },
  */

  testIsAperiodicRaryTree: function testIsAperiodicRaryTree() {
    var G = (0, _generators.fullRaryTree)(3, 27, new _classes.DiGraph());
    assert(!dag.isAperiodic(G));
  },

  testIsAperiodicDisconnected: function testIsAperiodicDisconnected() {
    var G = new _classes.DiGraph();
    G.addCycle([1, 2, 3, 4]);
    G.addCycle([5, 6, 7, 8]);
    assert(!dag.isAperiodic(G));
    G.addEdge(1, 3);
    G.addEdge(5, 7);
    assert(dag.isAperiodic(G));
  },

  testIsAperiodicDisconnected2: function testIsAperiodicDisconnected2() {
    var G = new _classes.DiGraph();
    G.addCycle([0, 1, 2]);
    G.addEdge(3, 3);
    assert(!dag.isAperiodic(G));
  },
};
exports.TestDAG = TestDAG;
