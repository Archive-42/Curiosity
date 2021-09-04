/*global assert, utils*/
"use strict";

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _BaseMultiGraphTester = require("./BaseMultiGraphTester");

var _BaseMultiGraphTester2 = _interopRequireDefault(_BaseMultiGraphTester);

var _GraphTest = require("./0_Graph-test");

var _exceptions = require("../../exceptions");

var _MultiGraph = require("../MultiGraph");

var _MultiGraph2 = _interopRequireDefault(_MultiGraph);

var Map = utils.Map;

var TestMultiGraph = _Object$assign(
  {},
  _GraphTest.TestGraph,
  _BaseMultiGraphTester2["default"],
  {
    beforeEach: function beforeEach() {
      this.Graph = _MultiGraph2["default"];
      var ed1 = { 0: {} };
      var ed2 = { 0: {} };
      var ed3 = { 0: {} };
      this.k3adj = new Map({
        0: new Map({ 1: ed1, 2: ed2 }),
        1: new Map({ 0: ed1, 2: ed3 }),
        2: new Map({ 0: ed2, 1: ed3 }),
      });
      this.k3edges = [
        [0, 1],
        [0, 2],
        [1, 2],
      ];
      this.k3nodes = [0, 1, 2];
      this.K3 = new this.Graph();
      this.K3.adj = this.K3.edge = this.k3adj;
      this.K3.node = new Map({ 0: {}, 1: {}, 2: {} });
    },

    testDataInput: function testDataInput() {
      var G = new this.Graph({ 1: [2], 2: [1] }, { name: "test" });
      assert.equal(G.name, "test");
      assert.deepEqual(_Array$from(G.adj), [
        [1, new Map({ 2: { 0: {} } })],
        [2, new Map({ 1: { 0: {} } })],
      ]);
    },

    testGetitem: function testGetitem() {
      var G = this.K3;
      assert.deepEqual(G.get(0), new Map({ 1: { 0: {} }, 2: { 0: {} } }));
      assert.throws(function () {
        return G.get("j");
      }, _exceptions.KeyError);
      // not implemented:
      // assert.throws(function(){G.get(['A']);}, TypeError);
    },

    testRemoveNode: function testRemoveNode() {
      var G = this.K3;
      G.removeNode(0);
      assert.deepEqual(
        G.adj,
        new Map({
          1: new Map({ 2: { 0: {} } }),
          2: new Map({ 1: { 0: {} } }),
        })
      );
      assert.throws(function () {
        return G.removeNode(-1);
      }, _exceptions.JSNetworkXError);
    },

    testAddEdge: function testAddEdge() {
      var G = new this.Graph();
      G.addEdge(0, 1);
      assert.deepEqual(
        G.adj,
        new Map({
          0: new Map({ 1: { 0: {} } }),
          1: new Map({ 0: { 0: {} } }),
        })
      );
      G = new this.Graph();
      G.addEdge.apply(G, [0, 1]);
      assert.deepEqual(
        G.adj,
        new Map({
          0: new Map({ 1: { 0: {} } }),
          1: new Map({ 0: { 0: {} } }),
        })
      );
    },

    testAddEdgeConflictingKey: function testAddEdgeConflictingKey() {
      var G = new this.Graph();
      G.addEdge(0, 1, 1);
      G.addEdge(0, 1);
      assert.equal(G.numberOfEdges(), 2);
      G = new this.Graph();
      G.addEdgesFrom([[0, 1, 1, {}]]);
      G.addEdgesFrom([[0, 1]]);
      assert.equal(G.numberOfEdges(), 2);
    },

    testAddEdgesFrom: function testAddEdgesFrom() {
      var G = new this.Graph();
      G.addEdgesFrom([
        [0, 1],
        [0, 1, { weight: 3 }],
      ]);
      assert.deepEqual(
        G.adj,
        new Map({
          0: new Map({ 1: { 0: {}, 1: { weight: 3 } } }),
          1: new Map({ 0: { 0: {}, 1: { weight: 3 } } }),
        })
      );
      G.addEdgesFrom(
        [
          [0, 1],
          [0, 1, { weight: 3 }],
        ],
        { weight: 2 }
      );
      assert.deepEqual(
        G.adj,
        new Map({
          0: new Map({
            1: {
              0: {},
              1: { weight: 3 },
              2: { weight: 2 },
              3: { weight: 3 },
            },
          }),
          1: new Map({
            0: { 0: {}, 1: { weight: 3 }, 2: { weight: 2 }, 3: { weight: 3 } },
          }),
        })
      );

      // too few in tuple
      assert.throws(function () {
        return G.addEdgesFrom([[0]]);
      }, _exceptions.JSNetworkXError);
      // too many in tuple
      assert.throws(function () {
        return G.addEdgesFrom([[0, 1, 2, 3, 4]]);
      }, _exceptions.JSNetworkXError);
      // not a tuple
      assert.throws(function () {
        return G.addEdgesFrom([0]);
      }, TypeError);
    },

    testRemoveEdge: function testRemoveEdge() {
      var G = this.K3;
      G.removeEdge(0, 1);
      assert.deepEqual(
        G.adj,
        new Map({
          0: new Map({ 2: { 0: {} } }),
          1: new Map({ 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );
      assert.throws(function () {
        return G.removeEdge(-1, 0);
      }, _exceptions.JSNetworkXError);
      assert.throws(function () {
        return G.removeEdge(0, 2, 1);
      }, _exceptions.JSNetworkXError);
    },

    testRemoveEdgesFrom: function testRemoveEdgesFrom() {
      var G = this.K3;
      G.removeEdgesFrom([[0, 1]]);
      assert.deepEqual(
        G.adj,
        new Map({
          0: new Map({ 2: { 0: {} } }),
          1: new Map({ 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );
      assert.doesNotThrow(function () {
        return G.removeEdgesFrom([[0, 0]]);
      });
    },

    testRemoveMultiedge: function testRemoveMultiedge() {
      var G = this.K3;
      G.addEdge(0, 1, "parallel edge");
      G.removeEdge(0, 1, "parallel edge");

      assert.deepEqual(
        G.adj,
        new Map({
          0: new Map({ 1: { 0: {} }, 2: { 0: {} } }),
          1: new Map({ 0: { 0: {} }, 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );
      G.removeEdge(0, 1);
      assert.deepEqual(
        G.adj,
        new Map({
          0: new Map({ 2: { 0: {} } }),
          1: new Map({ 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );
      assert.throws(function () {
        return G.removeEdge(-1, 0);
      }, _exceptions.JSNetworkXError);
    },
  }
);
exports.TestMultiGraph = TestMultiGraph;
