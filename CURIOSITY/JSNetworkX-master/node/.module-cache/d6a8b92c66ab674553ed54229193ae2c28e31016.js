/*global assert, utils*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _BaseGraphTester = require("./BaseGraphTester");

var _BaseGraphTester2 = _interopRequireDefault(_BaseGraphTester);

var _DiGraph = require("../DiGraph");

var _DiGraph2 = _interopRequireDefault(_DiGraph);

var _exceptionsJSNetworkXError = require("../../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

// Tests specific to dict-of-dict-of-dict graph data structure

var Map = utils.Map;
exports["default"] = _lodash2["default"].extend(
  {},
  _BaseGraphTester2["default"],
  {
    testHasSuccessor: function testHasSuccessor() {
      var G = this.K3;
      assert.ok(G.hasSuccessor(0, 1));
      assert.ok(!G.hasSuccessor(0, -1));
    },

    testSuccessors: function testSuccessors() {
      var G = this.K3;
      assert.deepEqual(G.successors(0), [1, 2]);
      assert.throws(function () {
        return G.successors(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testSuccessorsIter: function testSuccessorsIter() {
      var G = this.K3;
      assert.deepEqual(_Array$from(G.successorsIter(0)), [1, 2]);
      assert.throws(function () {
        return G.successorsIter(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testHasPredecessor: function testHasPredecessor() {
      var G = this.K3;
      assert.ok(G.hasPredecessor(0, 1));
      assert.ok(!G.hasPredecessor(0, -1));
    },

    testPredecessors: function testPredecessors() {
      var G = this.K3;
      assert.deepEqual(G.predecessors(0), [1, 2]);
      assert.throws(function () {
        return G.predecessors(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testPredecessorsIter: function testPredecessorsIter() {
      var G = this.K3;
      assert.deepEqual(_Array$from(G.predecessorsIter(0)), [1, 2]);
      assert.throws(function () {
        return G.predecessorsIter(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testEdges: function testEdges() {
      var G = this.K3;
      assert.deepEqual(G.edges(), [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 1],
      ]);
      assert.deepEqual(G.edges(0), [
        [0, 1],
        [0, 2],
      ]);
      assert.throws(function () {
        return G.edges(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testEdgesIter: function testEdgesIter() {
      var G = this.K3;
      assert.deepEqual(_Array$from(G.edgesIter()), [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 1],
      ]);
      assert.deepEqual(_Array$from(G.edgesIter(0)), [
        [0, 1],
        [0, 2],
      ]);
    },

    testEdgesData: function testEdgesData() {
      var G = this.K3;
      assert.deepEqual(G.edges(true), [
        [0, 1, {}],
        [0, 2, {}],
        [1, 0, {}],
        [1, 2, {}],
        [2, 0, {}],
        [2, 1, {}],
      ]);
      assert.deepEqual(G.edges(0, true), [
        [0, 1, {}],
        [0, 2, {}],
      ]);
      assert.throws(function () {
        return G.edges(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testOutEdges: function testOutEdges() {
      var G = this.K3;
      assert.deepEqual(G.outEdges(), [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 1],
      ]);
      assert.deepEqual(G.outEdges(0), [
        [0, 1],
        [0, 2],
      ]);
      assert.throws(function () {
        return G.edges(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testOutEdgesIter: function testOutEdgesIter() {
      var G = this.K3;
      assert.deepEqual(_Array$from(G.outEdgesIter()), [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 1],
      ]);
      assert.deepEqual(_Array$from(G.outEdgesIter(0)), [
        [0, 1],
        [0, 2],
      ]);
    },

    testOutEdgesDir: function testOutEdgesDir() {
      var G = this.P3;
      assert.deepEqual(G.outEdges(), [
        [0, 1],
        [1, 2],
      ]);
      assert.deepEqual(G.outEdges(0), [[0, 1]]);
      assert.deepEqual(G.outEdges(2), []);
    },

    testOutEdgesIterDir: function testOutEdgesIterDir() {
      var G = this.P3;
      assert.deepEqual(_Array$from(G.outEdgesIter()), [
        [0, 1],
        [1, 2],
      ]);
      assert.deepEqual(_Array$from(G.outEdgesIter(0)), [[0, 1]]);
      assert.deepEqual(_Array$from(G.outEdgesIter(2)), []);
    },

    testInEdgesDir: function testInEdgesDir() {
      var G = this.P3;
      assert.deepEqual(G.inEdges(), [
        [0, 1],
        [1, 2],
      ]);
      assert.deepEqual(G.inEdges(0), []);
      assert.deepEqual(G.inEdges(2), [[1, 2]]);
    },

    testInEdgesIterDir: function testInEdgesIterDir() {
      var G = this.P3;
      assert.deepEqual(_Array$from(G.inEdgesIter()), [
        [0, 1],
        [1, 2],
      ]);
      assert.deepEqual(_Array$from(G.inEdgesIter(0)), []);
      assert.deepEqual(_Array$from(G.inEdgesIter(2)), [[1, 2]]);
    },

    testDegree: function testDegree() {
      var G = this.K3;
      assert.deepEqual(_Array$from(G.degree().values()), [4, 4, 4]);
      assert.deepEqual(
        G.degree(),
        new Map([
          [0, 4],
          [1, 4],
          [2, 4],
        ])
      );
      assert.strictEqual(G.degree(0), 4);
      assert.deepEqual(G.degree([0]), new Map([[0, 4]]));
      assert.throws(function () {
        return G.degree(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testDegreeIter: function testDegreeIter() {
      var G = this.K3;
      assert.deepEqual(_Array$from(G.degreeIter()), [
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
      assert.deepEqual(_Array$from(G.degreeIter(0)), [[0, 4]]);
    },

    testInDegree: function testInDegree() {
      var G = this.K3;
      assert.deepEqual(_Array$from(G.inDegree().values()), [2, 2, 2]);
      assert.deepEqual(
        G.inDegree(),
        new Map([
          [0, 2],
          [1, 2],
          [2, 2],
        ])
      );
      assert.strictEqual(G.inDegree(0), 2);
      assert.deepEqual(G.inDegree([0]), new Map([[0, 2]]));
      assert.throws(function () {
        return G.inDegree(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testInDegreeIter: function testInDegreeIter() {
      var G = this.K3;
      assert.deepEqual(_Array$from(G.inDegreeIter()), [
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
      assert.deepEqual(_Array$from(G.inDegreeIter(0)), [[0, 2]]);
    },

    testInDegreeIterWeighted: function testInDegreeIterWeighted() {
      var G = this.K3;
      G.addEdge(0, 1, { weight: 0.3, other: 1.2 });
      assert.deepEqual(_Array$from(G.inDegreeIter(null, "weight")), [
        [0, 2],
        [1, 1.3],
        [2, 2],
      ]);
      assert.deepEqual(
        new Map(G.inDegreeIter(null, "weight")),
        new Map([
          [0, 2],
          [1, 1.3],
          [2, 2],
        ])
      );
      assert.deepEqual(_Array$from(G.inDegreeIter(1, "weight")), [[1, 1.3]]);
      assert.deepEqual(_Array$from(G.inDegreeIter(null, "other")), [
        [0, 2],
        [1, 2.2],
        [2, 2],
      ]);
      assert.deepEqual(
        new Map(G.inDegreeIter(null, "other")),
        new Map([
          [0, 2],
          [1, 2.2],
          [2, 2],
        ])
      );
      assert.deepEqual(_Array$from(G.inDegreeIter(1, "other")), [[1, 2.2]]);
    },

    testOutDegree: function testOutDegree() {
      var G = this.K3;
      assert.deepEqual(_Array$from(G.outDegree().values()), [2, 2, 2]);
      assert.deepEqual(
        G.outDegree(),
        new Map([
          [0, 2],
          [1, 2],
          [2, 2],
        ])
      );
      assert.strictEqual(G.outDegree(0), 2);
      assert.deepEqual(G.outDegree([0]), new Map([[0, 2]]));
      assert.throws(function () {
        return G.outDegree(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testOutDegreeIter: function testOutDegreeIter() {
      var G = this.K3;
      assert.deepEqual(_Array$from(G.outDegreeIter()), [
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
      assert.deepEqual(_Array$from(G.outDegreeIter(0)), [[0, 2]]);
    },

    testOutDegreeIterWeighted: function testOutDegreeIterWeighted() {
      var G = this.K3;
      G.addEdge(0, 1, { weight: 0.3, other: 1.2 });
      assert.deepEqual(_Array$from(G.outDegreeIter(null, "weight")), [
        [0, 1.3],
        [1, 2],
        [2, 2],
      ]);
      assert.deepEqual(
        new Map(G.outDegreeIter(null, "weight")),
        new Map([
          [0, 1.3],
          [1, 2],
          [2, 2],
        ])
      );
      assert.deepEqual(_Array$from(G.outDegreeIter(0, "weight")), [[0, 1.3]]);
      assert.deepEqual(_Array$from(G.outDegreeIter(null, "other")), [
        [0, 2.2],
        [1, 2],
        [2, 2],
      ]);
      assert.deepEqual(
        new Map(G.outDegreeIter(null, "other")),
        new Map([
          [0, 2.2],
          [1, 2],
          [2, 2],
        ])
      );
      assert.deepEqual(_Array$from(G.outDegreeIter(0, "other")), [[0, 2.2]]);
    },

    testSize: function testSize() {
      var G = this.K3;
      assert.strictEqual(G.size(), 6);
      assert.strictEqual(G.numberOfEdges(), 6);
    },

    testToUndirectedReciprocal: function testToUndirectedReciprocal() {
      var G = new this.Graph();
      G.addEdge(1, 2);
      assert.ok(G.toUndirected().hasEdge(1, 2));
      assert.ok(!G.toUndirected(true).hasEdge(1, 2));
      G.addEdge(2, 1);
      assert.ok(G.toUndirected(true).hasEdge(1, 2));
    },

    testReverseCopy: function testReverseCopy() {
      var G = new _DiGraph2["default"]([
        [0, 1],
        [1, 2],
      ]);
      var R = G.reverse();
      assert.deepEqual(R.edges(), [
        [1, 0],
        [2, 1],
      ]);
      R.removeEdge(1, 0);
      assert.deepEqual(R.edges(), [[2, 1]]);
      assert.deepEqual(G.edges(), [
        [0, 1],
        [1, 2],
      ]);
    },

    testReverseNocopy: function testReverseNocopy() {
      var G = new _DiGraph2["default"]([
        [0, 1],
        [1, 2],
      ]);
      var R = G.reverse(false);
      assert.deepEqual(R.edges(), [
        [1, 0],
        [2, 1],
      ]);
      R.removeEdge(1, 0);
      assert.deepEqual(R.edges(), [[2, 1]]);
      assert.deepEqual(G.edges(), [[2, 1]]);
    },
  }
);
module.exports = exports["default"];
