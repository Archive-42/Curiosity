/*global assert, utils*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _BaseMultiGraphTester = require("./BaseMultiGraphTester");

var _BaseMultiGraphTester2 = _interopRequireDefault(_BaseMultiGraphTester);

var _ = require("../");

var _exceptions = require("../../exceptions");

var _shared = require("./shared");

var _shared2 = _interopRequireDefault(_shared);

var Map = utils.Map;

function sorted(value) {
  return _Array$from(value).sort();
}

var sharedMultiDigraph = {
  isShallow: function isShallow(H, G) {
    // graph
    assert.deepEqual(G.graph.foo, H.graph.foo);
    G.graph.foo.push(1);
    assert.deepEqual(G.graph.foo, H.graph.foo);
    // node
    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
    G.node.get(0).foo.push(1);
    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
    // edge
    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
    G.get(1).get(2)[0].foo.push(1);
    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
  },

  isDeep: function isDeep(H, G) {
    // graph
    assert.deepEqual(G.graph.foo, H.graph.foo);
    G.graph.foo.push(1);
    assert.notDeepEqual(G.graph.foo, H.graph.foo);
    // node
    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
    G.node.get(0).foo.push(1);
    assert.notDeepEqual(G.node.get(0).foo, H.node.get(0).foo);
    // edge
    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
    G.get(1).get(2)[0].foo.push(1);
    assert.notDeepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
  },
};

exports["default"] = _Object$assign({}, _BaseMultiGraphTester2["default"], {
  testEdges: function testEdges() {
    var G = this.K3;
    assert.deepEqual(sorted(G.edges()), [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
    assert.deepEqual(sorted(G.edges(0)), [
      [0, 1],
      [0, 2],
    ]);
    assert.throws(function () {
      return G.edges(-1);
    }, _exceptions.JSNetworkxError);
  },

  testEdgesData: function testEdgesData() {
    var G = this.K3;
    assert.deepEqual(sorted(G.edges(true)), [
      [0, 1, {}],
      [0, 2, {}],
      [1, 0, {}],
      [1, 2, {}],
      [2, 0, {}],
      [2, 1, {}],
    ]);
    assert.deepEqual(sorted(G.edges(0, true)), [
      [0, 1, {}],
      [0, 2, {}],
    ]);
    assert.throws(function () {
      return G.neighbors(-1);
    }, _exceptions.JSNetworkxError);
  },

  testEdgesIter: function testEdgesIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.edgesIter()), [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
    assert.deepEqual(sorted(G.edgesIter(0)), [
      [0, 1],
      [0, 2],
    ]);
    G.addEdge(0, 1);
    assert.deepEqual(sorted(G.edgesIter()), [
      [0, 1],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
  },

  testOutEdges: function testOutEdges() {
    var G = this.K3;
    assert.deepEqual(sorted(G.outEdges()), [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
    assert.deepEqual(sorted(G.outEdges(0)), [
      [0, 1],
      [0, 2],
    ]);
    assert.throws(function () {
      return G.outEdges(-1);
    }, _exceptions.JSNetworkxError);
    assert.deepEqual(sorted(G.outEdges(0, false, true)), [
      [0, 1, 0],
      [0, 2, 0],
    ]);
  },

  testOutEdgesIter: function testOutEdgesIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.outEdgesIter()), [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
    assert.deepEqual(sorted(G.outEdgesIter(0)), [
      [0, 1],
      [0, 2],
    ]);
    G.addEdge(0, 1, 2);
    assert.deepEqual(sorted(G.edgesIter()), [
      [0, 1],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
  },

  testInEdges: function testInEdges() {
    var G = this.K3;
    assert.deepEqual(sorted(G.inEdges()), [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
    assert.deepEqual(sorted(G.inEdges(0)), [
      [1, 0],
      [2, 0],
    ]);
    G.addEdge(0, 1, 2);
    assert.deepEqual(sorted(G.inEdges()), [
      [0, 1],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
    assert.deepEqual(sorted(G.inEdges(0, false, true)), [
      [1, 0, 0],
      [2, 0, 0],
    ]);
  },

  testInEdgesIter: function testInEdgesIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.inEdgesIter()), [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
    assert.deepEqual(sorted(G.inEdgesIter(0)), [
      [1, 0],
      [2, 0],
    ]);
    G.addEdge(0, 1, 2);
    assert.deepEqual(sorted(G.inEdgesIter()), [
      [0, 1],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
    assert.deepEqual(sorted(G.inEdges(true)), [
      [0, 1, {}],
      [0, 1, {}],
      [0, 2, {}],
      [1, 0, {}],
      [1, 2, {}],
      [2, 0, {}],
      [2, 1, {}],
    ]);
  },

  testToUndirected: function testToUndirected() {
    // MultiDiGraph -> MultiGraph changes number of edges so it is
    // not a copy operation... use isShallow, not isShallowCopy
    var G = this.K3;
    _shared2["default"].addAttributes(G);
    var H = new _.MultiGraph(G);
    sharedMultiDigraph.isShallow(H, G);
    H = G.toUndirected();
    sharedMultiDigraph.isDeep(H, G);
  },

  testHasSuccessor: function testHasSuccessor() {
    var G = this.K3;
    assert.equal(G.hasSuccessor(0, 1), true);
    assert.equal(G.hasSuccessor(0, -1), false);
  },

  testSuccessors: function testSuccessors() {
    var G = this.K3;
    assert.deepEqual(sorted(G.successors(0)), [1, 2]);
    assert.throws(function () {
      return G.successors(-1);
    }, _exceptions.JSNetworkxError);
  },

  testSuccessorsIter: function testSuccessorsIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.successorsIter(0)), [1, 2]);
    assert.throws(function () {
      return G.successorsIter(-1);
    }, _exceptions.JSNetworkxError);
  },

  testHasPredecessor: function testHasPredecessor() {
    var G = this.K3;
    assert.equal(G.hasPredecessor(0, 1), true);
    assert.equal(G.hasPredecessor(0, -1), false);
  },

  testPredecessors: function testPredecessors() {
    var G = this.K3;
    assert.deepEqual(sorted(G.predecessors(0)), [1, 2]);
    assert.throws(function () {
      return G.predecessors(-1);
    }, _exceptions.JSNetworkxError);
  },

  testPredecessorsIter: function testPredecessorsIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.predecessorsIter(0)), [1, 2]);
    assert.throws(function () {
      return G.predecessorsIter(-1);
    }, _exceptions.JSNetworkxError);
  },

  testDegree: function testDegree() {
    var G = this.K3;
    assert.deepEqual(_Array$from(G.degree().values()), [4, 4, 4]);
    assert.deepEqual(G.degree(), new Map({ 0: 4, 1: 4, 2: 4 }));
    assert.equal(G.degree(0), 4);
    assert.deepEqual(G.degree([0]), new Map({ 0: 4 }));
    assert.throws(function () {
      return G.degree(-1);
    }, _exceptions.JSNetworkxError);
  },

  testDegreeIter: function testDegreeIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.degreeIter()), [
      [0, 4],
      [1, 4],
      [2, 4],
    ]);
    assert.deepEqual(
      new Map(G.degreeIter()),
      new Map([
        [0, 4],
        [1, 4],
        [2, 4],
      ])
    );
    assert.deepEqual(sorted(G.degreeIter(0)), [[0, 4]]);
    G.addEdge(0, 1, { weight: 0.3, other: 1.2 });
    assert.deepEqual(sorted(G.degreeIter(null, "weight")), [
      [0, 4.3],
      [1, 4.3],
      [2, 4],
    ]);
    assert.deepEqual(sorted(G.degreeIter(null, "other")), [
      [0, 5.2],
      [1, 5.2],
      [2, 4],
    ]);
  },

  testInDegree: function testInDegree() {
    var G = this.K3;
    assert.deepEqual(_Array$from(G.inDegree().values()), [2, 2, 2]);
    assert.deepEqual(G.inDegree(), new Map({ 0: 2, 1: 2, 2: 2 }));
    assert.equal(G.inDegree(0), 2);
    assert.deepEqual(G.inDegree([0]), new Map({ 0: 2 }));
    assert.throws(function () {
      return G.inDegree(-1);
    }, _exceptions.JSNetworkxError);
  },

  testInDegreeIter: function testInDegreeIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.inDegreeIter()), [
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
    assert.deepEqual(
      new Map(G.inDegreeIter()),
      new Map([
        [0, 2],
        [1, 2],
        [2, 2],
      ])
    );
    assert.deepEqual(sorted(G.inDegreeIter(0)), [[0, 2]]);
    assert.deepEqual(sorted(G.inDegreeIter(0, "weight")), [[0, 2]]);
  },

  testOutDegree: function testOutDegree() {
    var G = this.K3;
    assert.deepEqual(_Array$from(G.outDegree().values()), [2, 2, 2]);
    assert.deepEqual(G.outDegree(), new Map({ 0: 2, 1: 2, 2: 2 }));
    assert.equal(G.outDegree(0), 2);
    assert.deepEqual(G.outDegree([0]), new Map({ 0: 2 }));
    assert.throws(function () {
      return G.outDegree(-1);
    }, _exceptions.JSNetworkxError);
  },

  testOutDegreeIter: function testOutDegreeIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.outDegreeIter()), [
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
    assert.deepEqual(
      new Map(G.outDegreeIter()),
      new Map([
        [0, 2],
        [1, 2],
        [2, 2],
      ])
    );
    assert.deepEqual(sorted(G.outDegreeIter(0)), [[0, 2]]);
    assert.deepEqual(sorted(G.outDegreeIter(0, "weight")), [[0, 2]]);
  },

  testSize: function testSize() {
    var G = this.K3;
    assert.equal(G.size(), 6);
    assert.equal(G.numberOfEdges(), 6);
    G.addEdge(0, 1, { weight: 0.3, other: 1.2 });
    assert.equal(G.size("weight"), 6.3);
    assert.equal(G.size("other"), 7.2);
  },

  testToUndirectedReciprocal: function testToUndirectedReciprocal() {
    var G = new this.Graph();
    G.addEdge(1, 2);
    assert.equal(G.toUndirected().hasEdge(1, 2), true);
    assert.equal(G.toUndirected(true).hasEdge(1, 2), false);
    G.addEdge(2, 1);
    assert.equal(G.toUndirected(true).hasEdge(1, 2), true);
  },

  testReverseCopy: function testReverseCopy() {
    var G = new _.MultiDiGraph([
      [0, 1],
      [0, 1],
    ]);
    var R = G.reverse();
    assert.deepEqual(sorted(R.edges()), [
      [1, 0],
      [1, 0],
    ]);
    R.removeEdge(1, 0);
    assert.deepEqual(sorted(R.edges()), [[1, 0]]);
    assert.deepEqual(sorted(G.edges()), [
      [0, 1],
      [0, 1],
    ]);
  },

  testReverseNocopy: function testReverseNocopy() {
    var G = new _.MultiDiGraph([
      [0, 1],
      [0, 1],
    ]);
    var R = G.reverse(false);
    assert.deepEqual(sorted(R.edges()), [
      [1, 0],
      [1, 0],
    ]);
    R.removeEdge(1, 0);
    assert.deepEqual(sorted(R.edges()), [[1, 0]]);
    assert.deepEqual(sorted(G.edges()), [[1, 0]]);
  },
});
module.exports = exports["default"];
