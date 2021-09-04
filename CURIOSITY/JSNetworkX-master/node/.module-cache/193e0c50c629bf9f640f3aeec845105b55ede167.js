/*jshint strict:false, node:true*/
/*global utils, assert*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard =
  require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _Graph = require("../Graph");

var _Graph2 = _interopRequireDefault(_Graph);

var _DiGraph = require("../DiGraph");

var _DiGraph2 = _interopRequireDefault(_DiGraph);

/*eslint no-native-reassign:0*/

var _exceptionsJSNetworkXError = require("../../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

var _functions = require("../functions");

var funcs = _interopRequireWildcard(_functions);

var Map = utils.Map;
var testFunction = {
  beforeEach: function beforeEach() {
    this.G = new _Graph2["default"](
      { 0: [1, 2, 3], 1: [1, 2, 0], 4: [] },
      { name: "Test" }
    );
    this.Gdegree = new Map({ 0: 3, 1: 2, 3: 1, 4: 0 });
    this.Gnodes = [0, 1, 2, 3, 4];
    this.Gedges = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 0],
      [1, 1],
      [1, 2],
    ];
    this.DG = new _DiGraph2["default"]({ 0: [1, 2, 3], 1: [1, 2, 0], 4: [] });
    this.DGinDegree = new Map({ 0: 1, 1: 2, 2: 2, 3: 1, 4: 0 });
    this.DoutDegree = new Map({ 0: 3, 1: 3, 2: 0, 3: 0, 4: 0 });
    this.DGnodes = [0, 1, 2, 3, 4];
    this.DGedges = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 0],
      [1, 1],
      [1, 2],
    ];
  },

  testNodes: function testNodes() {
    assert.deepEqual(this.G.nodes(), funcs.nodes(this.G));
    assert.deepEqual(this.DG.nodes(), funcs.nodes(this.DG));
  },

  testEdges: function testEdges() {
    assert.deepEqual(this.G.edges(), funcs.edges(this.G));
    assert.deepEqual(this.DG.edges(), funcs.edges(this.DG));
    assert.deepEqual(this.G.edges([0, 1, 3]), funcs.edges(this.G, [0, 1, 3]));
    assert.deepEqual(this.DG.edges([0, 1, 3]), funcs.edges(this.DG, [0, 1, 3]));
  },

  testNodesIter: function testNodesIter() {
    assert.deepEqual(
      _Array$from(this.G.nodesIter()),
      _Array$from(funcs.nodesIter(this.G))
    );
    assert.deepEqual(
      _Array$from(this.DG.nodesIter()),
      _Array$from(funcs.nodesIter(this.DG))
    );
  },

  testEdgesIter: function testEdgesIter() {
    assert.deepEqual(
      _Array$from(this.G.edgesIter()),
      _Array$from(funcs.edgesIter(this.G))
    );
    assert.deepEqual(
      _Array$from(this.DG.edgesIter()),
      _Array$from(funcs.edgesIter(this.DG))
    );
    assert.deepEqual(
      _Array$from(this.G.edgesIter([0, 1, 3])),
      _Array$from(funcs.edgesIter(this.G, [0, 1, 3]))
    );
    assert.deepEqual(
      _Array$from(this.DG.edgesIter([0, 1, 3])),
      _Array$from(funcs.edgesIter(this.DG, [0, 1, 3]))
    );
  },

  testDegree: function testDegree() {
    assert.deepEqual(this.G.degree(), funcs.degree(this.G));
    assert.deepEqual(this.DG.degree(), funcs.degree(this.DG));
    assert.deepEqual(this.G.degree([0, 1]), funcs.degree(this.G, [0, 1]));
    assert.deepEqual(this.DG.degree([0, 1]), funcs.degree(this.DG, [0, 1]));
    assert.deepEqual(
      this.G.degree(null, "weight"),
      funcs.degree(this.G, null, "weight")
    );
    assert.deepEqual(
      this.DG.degree(null, "weight"),
      funcs.degree(this.DG, null, "weight")
    );
  },

  testNeighbors: function testNeighbors() {
    assert.deepEqual(this.G.neighbors(1), funcs.neighbors(this.G, 1));
    assert.deepEqual(this.DG.neighbors(1), funcs.neighbors(this.DG, 1));
  },

  testNumberOfNodes: function testNumberOfNodes() {
    assert.equal(this.G.numberOfNodes(), funcs.numberOfNodes(this.G));
    assert.equal(this.DG.numberOfNodes(), funcs.numberOfNodes(this.DG));
  },

  testNumberOfEdges: function testNumberOfEdges() {
    assert.equal(this.G.numberOfEdges(), funcs.numberOfEdges(this.G));
    assert.equal(this.DG.numberOfEdges(), funcs.numberOfEdges(this.DG));
  },

  testIsDirected: function testIsDirected() {
    assert.equal(this.G.isDirected(), funcs.isDirected(this.G));
    assert.equal(this.DG.isDirected(), funcs.isDirected(this.DG));
  },

  testSubgraph: function testSubgraph() {
    assert.deepEqual(
      this.G.subgraph([0, 1, 2, 4]),
      funcs.subgraph(this.G, [0, 1, 2, 4])
    );
    assert.deepEqual(
      this.DG.subgraph([0, 1, 2, 4]),
      funcs.subgraph(this.DG, [0, 1, 2, 4])
    );
  },

  testCreateEmptyCopy: function testCreateEmptyCopy() {
    var G = funcs.createEmptyCopy(this.G, false);
    assert.deepEqual(G.nodes(), []);
    assert.deepEqual(G.graph, {});
    assert.deepEqual(G.node, new Map());
    assert.deepEqual(G.edge, new Map());

    G = funcs.createEmptyCopy(this.G);
    assert.deepEqual(G.nodes(), this.G.nodes());
    assert.deepEqual(G.graph, {});
    assert.deepEqual(
      G.node,
      new Map(
        this.G.nodes().map(function (v) {
          return [v, {}];
        })
      )
    );
    assert.deepEqual(
      G.edge,
      new Map(
        this.G.nodes().map(function (v) {
          return [v, new Map()];
        })
      )
    );
  },

  testDegreeHistogram: function testDegreeHistogram() {
    assert.deepEqual(funcs.degreeHistogram(this.G), [1, 1, 1, 1, 1]);
  },

  testDensity: function testDensity() {
    assert.equal(funcs.density(this.G), 0.5);
    assert.equal(funcs.density(this.DG), 0.3);
    var G = new _Graph2["default"]();
    G.addNode(1);
    assert.equal(funcs.density(G), 0.0);
  },

  testFreeze: function testFreeze() {
    var G = funcs.freeze(this.G);
    assert.equal(G.frozen, true);
    assert.throws(function () {
      return G.addNode(1);
    }, _exceptionsJSNetworkXError2["default"]);
    assert.throws(function () {
      return G.addNodesFrom([1]);
    }, _exceptionsJSNetworkXError2["default"]);
    assert.throws(function () {
      return G.removeNode(1);
    }, _exceptionsJSNetworkXError2["default"]);
    assert.throws(function () {
      return G.removeNodesFrom([1]);
    }, _exceptionsJSNetworkXError2["default"]);
    assert.throws(function () {
      return G.addEdge([1, 2]);
    }, _exceptionsJSNetworkXError2["default"]);
    assert.throws(function () {
      return G.addEdgesFrom([[1, 2]]);
    }, _exceptionsJSNetworkXError2["default"]);
    assert.throws(function () {
      return G.removeEdge([1, 2]);
    }, _exceptionsJSNetworkXError2["default"]);
    assert.throws(function () {
      return G.removeEdgesFrom([[1, 2]]);
    }, _exceptionsJSNetworkXError2["default"]);
    assert.throws(function () {
      return G.clear();
    }, _exceptionsJSNetworkXError2["default"]);
  },

  testIsFrozen: function testIsFrozen() {
    assert.equal(funcs.isFrozen(this.G), false);
    var G = funcs.freeze(this.G);
    assert.equal(G.frozen, funcs.isFrozen(G));
    assert.equal(funcs.isFrozen(this.G), true);
  },

  /* TODO: Implement when path_graph is implemented
  test_info: function() {
    var G = path_graph(5);
    var info = info(G);
    var expected_graph_info = [
        'Name: path_graph(5)',
        'Type: Graph',
        'Number of nodes: 5',
        'Number of edges: 4',
        'Average degree: 1.6000'
    ].join('\n');
     assert.equal(info, expected_graph_info);
  },
  */

  testInfoDigraph: function testInfoDigraph() {
    var G = new _DiGraph2["default"](null, { name: "path_graph(5)" });
    G.addPath([0, 1, 2, 3, 4]);
    var info = funcs.info(G);
    var expectedGraphInfo = [
      "Name: path_graph(5)",
      "Type: DiGraph",
      "Number of nodes: 5",
      "Number of edges: 4",
      "Average in degree: 0.8000",
      "Average out degree: 0.8000",
    ].join("\n");
    assert.equal(info, expectedGraphInfo);

    info = funcs.info(G, 1);
    var expectedNodeInfo = [
      "Node 1 has the following properties:",
      "Degree: 2",
      "Neighbors: 2",
    ].join("\n");
    assert.equal(info, expectedNodeInfo);

    assert.throws(function () {
      return funcs.info(G, -1);
    }, _exceptionsJSNetworkXError2["default"]);
  },
};
exports.testFunction = testFunction;
