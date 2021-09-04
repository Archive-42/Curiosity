/*global assert, utils*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _exceptionsJSNetworkXError = require("../../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

// Tests for data-structure independent graph class features.
var Map = utils.Map;
exports["default"] = {
  testOrder: function testOrder() {
    var G = this.K3;
    // assert_equal(len(G), 3)
    assert.equal(G.order(), 3);
    assert.equal(G.numberOfNodes(), 3);
  },

  testNodesIter: function testNodesIter() {
    var G = this.K3;

    assert.sameMembersDeep(_Array$from(G.nodesIter()), this.k3nodes);
    assert.sameMembersDeep(_Array$from(G.nodesIter(true)), [
      [0, {}],
      [1, {}],
      [2, {}],
    ]);
  },

  testNodes: function testNodes() {
    var G = this.K3;

    assert.sameMembersDeep(G.nodes(), this.k3nodes);
    assert.sameMembersDeep(G.nodes(true), [
      [0, {}],
      [1, {}],
      [2, {}],
    ]);
  },

  testHasNode: function testHasNode() {
    var G = this.K3;

    assert.ok(G.hasNode(1));
    assert.ok(!G.hasNode(4));
    assert.ok(!G.hasNode([])); // no exception for nonhashable
    // objects are "hashable"
    // assert.ok(!G.has_node({1: 1})); // no exception for nonhashable
  },

  testHasEdge: function testHasEdge() {
    var G = this.K3;

    assert.ok(G.hasEdge(0, 1));
    assert.ok(!G.hasEdge(0, -1));
  },

  testNeighbours: function testNeighbours() {
    var G = this.K3;

    assert.sameMembers(G.neighbors(0), [1, 2]);
    assert.throws(function () {
      return G.neighbors(-1);
    }, _exceptionsJSNetworkXError2["default"]);
  },

  testNeighboursIter: function testNeighboursIter() {
    var G = this.K3;

    assert.deepEqual(_Array$from(G.neighborsIter(0)).sort(), [1, 2]);
    assert.throws(function () {
      G.neighborsIter(-1);
    }, _exceptionsJSNetworkXError2["default"]);
  },

  testEdges: function testEdges() {
    var G = this.K3;

    assert.deepEqual(G.edges().sort(), [
      [0, 1],
      [0, 2],
      [1, 2],
    ]);
    assert.deepEqual(G.edges(0).sort(), [
      [0, 1],
      [0, 2],
    ]);
    assert.throws(function () {
      G.edges(-1);
    }, _exceptionsJSNetworkXError2["default"]);
  },

  testEdgesIter: function testEdgesIter() {
    var G = this.K3;

    assert.deepEqual(_Array$from(G.edgesIter()).sort(), [
      [0, 1],
      [0, 2],
      [1, 2],
    ]);
    assert.deepEqual(_Array$from(G.edgesIter(0)).sort(), [
      [0, 1],
      [0, 2],
    ]);
    assert.throws(function () {
      _Array$from(G.edgesIter(-1));
    }, _exceptionsJSNetworkXError2["default"]);
  },

  testAdjacencyList: function testAdjacencyList() {
    var G = this.K3;
    assert.deepEqual(G.adjacencyList(), [
      [1, 2],
      [0, 2],
      [0, 1],
    ]);
  },

  testDegree: function testDegree() {
    var G = this.K3;

    assert.deepEqual(_Array$from(G.degree().values()), [2, 2, 2]);
    assert.deepEqual(
      G.degree(),
      new Map([
        [0, 2],
        [1, 2],
        [2, 2],
      ])
    );
    assert.equal(G.degree(0), 2);
    assert.deepEqual(G.degree([0]), new Map([[0, 2]]));
    assert.throws(function () {
      G.degree(-1);
    }, _exceptionsJSNetworkXError2["default"]);
  },

  testWeightedDegree: function testWeightedDegree() {
    var G = new this.Graph();
    G.addEdge(1, 2, { weight: 2 });
    G.addEdge(2, 3, { weight: 3 });

    assert.deepEqual(_Array$from(G.degree(null, "weight").values()), [2, 5, 3]);
    assert.deepEqual(
      G.degree(null, "weight"),
      new Map([
        [1, 2],
        [2, 5],
        [3, 3],
      ])
    );
    assert.equal(G.degree(1, "weight"), 2);
    assert.deepEqual(G.degree([1], "weight"), new Map([[1, 2]]));
  },

  testDegreeIter: function testDegreeIter() {
    var G = this.K3;

    assert.deepEqual(_Array$from(G.degreeIter()), [
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
    assert.deepEqual(
      new Map(G.degreeIter()),
      new Map([
        [0, 2],
        [1, 2],
        [2, 2],
      ])
    );
    assert.deepEqual(_Array$from(G.degreeIter(0)), [[0, 2]]);
  },

  testSize: function testSize() {
    var G = this.K3;
    assert.equal(G.size(), 3);
    assert.equal(G.numberOfEdges(), 3);
  },

  testAddStar: function testAddStar() {
    var G = this.K3.copy();
    var nlist = [12, 13, 14, 15];
    G.addStar(nlist);
    assert.deepEqual(G.edges(nlist), [
      [12, 13],
      [12, 14],
      [12, 15],
    ]);
    G = this.K3.copy();
    G.addStar(nlist, { weight: 2 });
    assert.deepEqual(G.edges(nlist, true), [
      [12, 13, { weight: 2 }],
      [12, 14, { weight: 2 }],
      [12, 15, { weight: 2 }],
    ]);
  },

  testAddPath: function testAddPath() {
    var G = this.K3.copy();
    var nlist = [12, 13, 14, 15];
    G.addPath(nlist);
    assert.deepEqual(_Array$from(G.edges(nlist)), [
      [12, 13],
      [13, 14],
      [14, 15],
    ]);
    G = this.K3.copy();
    G.addPath(nlist, { weight: 2 });
    assert.deepEqual(G.edges(nlist, true), [
      [12, 13, { weight: 2 }],
      [13, 14, { weight: 2 }],
      [14, 15, { weight: 2 }],
    ]);
  },

  testAddCycle: function testAddCycle() {
    var G = this.K3.copy();
    var nlist = [12, 13, 14, 15];
    var oklists = [
      [
        [12, 13],
        [12, 15],
        [13, 14],
        [14, 15],
      ],
      [
        [12, 13],
        [13, 14],
        [14, 15],
        [15, 12],
      ],
    ];
    G.addCycle(nlist);
    assert.isOneOf(G.edges(nlist), oklists);

    G = this.K3.copy();
    oklists = [
      [
        [12, 13, { weight: 1 }],
        [12, 15, { weight: 1 }],
        [13, 14, { weight: 1 }],
        [14, 15, { weight: 1 }],
      ],
      [
        [12, 13, { weight: 1 }],
        [13, 14, { weight: 1 }],
        [14, 15, { weight: 1 }],
        [15, 12, { weight: 1 }],
      ],
    ];
    G.addCycle(nlist, { weight: 1 });
    assert.isOneOf(G.edges(nlist, true), oklists);
  },

  testNbunchIter: function testNbunchIter() {
    var G = this.K3;
    assert.deepEqual(_Array$from(G.nbunchIter()), this.k3nodes); // all nodes
    assert.deepEqual(_Array$from(G.nbunchIter(0)), [0]); // single nodes
    assert.deepEqual(_Array$from(G.nbunchIter([0, 1])), [0, 1]); // sequence
    // sequence with none in graph
    assert.deepEqual(_Array$from(G.nbunchIter([-1])), []);
    // string sequence with none in graph
    //assert.deepEqual(Array.from(G.nbunch_iter("foo")), []);
    // node not in graph doesn't get caught upon creation of iterator
    var bunch = G.nbunchIter(-1);
    // but gets caught when iterator used
    assert.throws(function () {
      return _Array$from(bunch);
    }, _exceptionsJSNetworkXError2["default"]);
    // unhashable doesn't get caught upon creaton of iterator
    bunch = G.nbunchIter([0, 1, 2, []]);
    // there are no unhashable values
    // but gets caught when iterator hits the unhashable
    // assert.throws(function() { Array.from(bunch);}, JSNetworkXError);
  },

  testSelfloopDegree: function testSelfloopDegree() {
    var G = new this.Graph();
    G.addEdge(1, 1);
    assert.deepEqual(_Array$from(G.degree().values()), [2]);
    assert.deepEqual(G.degree(), new Map([[1, 2]]));
    assert.equal(G.degree(1), 2);
    assert.deepEqual(G.degree([1]), new Map([[1, 2]]));
    assert.deepEqual(G.degree([1], "weight"), new Map([[1, 2]]));
  },

  testSelfloops: function testSelfloops() {
    var G = this.K3.copy();
    G.addEdge(0, 0);
    assert.deepEqual(G.nodesWithSelfloops(), [0]);
    assert.deepEqual(G.selfloopEdges(), [[0, 0]]);
    assert.equal(G.numberOfSelfloops(), 1);
    G.removeEdge(0, 0);
    G.addEdge(0, 0);
    G.removeEdgesFrom([[0, 0]]);
    G.addEdge(1, 1);
    G.removeNode(1);
    G.addEdge(0, 0);
    G.addEdge(1, 1);
    G.removeNodesFrom([0, 1]);
  },
};
module.exports = exports["default"];
