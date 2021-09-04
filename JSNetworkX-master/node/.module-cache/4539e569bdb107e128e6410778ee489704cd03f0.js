/*global assert, utils*/
"use strict";

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _BaseMultiDiGraphTester = require("./BaseMultiDiGraphTester");

var _BaseMultiDiGraphTester2 = _interopRequireDefault(_BaseMultiDiGraphTester);

var _MultiDiGraph = require("../MultiDiGraph");

var _MultiDiGraph2 = _interopRequireDefault(_MultiDiGraph);

var _exceptions = require("../../exceptions");

var _MultiGraphTest = require("./2_MultiGraph-test");

var Map = utils.Map;

var TestMultiDiGraph = _Object$assign(
  {},
  _MultiGraphTest.TestMultiGraph,
  _BaseMultiDiGraphTester2["default"],
  {
    beforeEach: function beforeEach() {
      this.Graph = _MultiDiGraph2["default"];
      // build K3
      this.k3edges = [
        [0, 1],
        [0, 2],
        [1, 2],
      ];
      this.k3nodes = [0, 1, 2];
      this.K3 = new this.Graph();
      this.K3.adj = new Map({ 0: new Map(), 1: new Map(), 2: new Map() });
      this.K3.succ = this.K3.adj;
      this.K3.pred = new Map({ 0: new Map(), 1: new Map(), 2: new Map() });
      this.k3nodes.forEach(function (u) {
        this.k3nodes.forEach(function (v) {
          if (v !== u) {
            var d = { 0: {} };
            this.K3.succ.get(u).set(v, d);
            this.K3.pred.get(v).set(u, d);
          }
        }, this);
      }, this);

      this.K3.adj = this.K3.succ;
      this.K3.edge = this.K3.adj;
      this.K3.node = new Map({ 0: {}, 1: {}, 2: {} });
    },

    testAddEdge: function testAddEdge() {
      var G = new this.Graph();
      G.addEdge(0, 1);
      assert.deepEqual(
        G.adj,
        new Map({ 0: new Map({ 1: { 0: {} } }), 1: new Map() })
      );
      assert.deepEqual(
        G.succ,
        new Map({ 0: new Map({ 1: { 0: {} } }), 1: new Map() })
      );
      assert.deepEqual(
        G.pred,
        new Map({ 0: new Map(), 1: new Map({ 0: { 0: {} } }) })
      );

      G = new this.Graph();
      G.addEdge.apply(G, [0, 1]);
      assert.deepEqual(
        G.adj,
        new Map({ 0: new Map({ 1: { 0: {} } }), 1: new Map() })
      );
      assert.deepEqual(
        G.succ,
        new Map({ 0: new Map({ 1: { 0: {} } }), 1: new Map() })
      );
      assert.deepEqual(
        G.pred,
        new Map({ 0: new Map(), 1: new Map({ 0: { 0: {} } }) })
      );
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
          1: new Map(),
        })
      );
      assert.deepEqual(
        G.succ,
        new Map({
          0: new Map({ 1: { 0: {}, 1: { weight: 3 } } }),
          1: new Map(),
        })
      );
      assert.deepEqual(
        G.pred,
        new Map({
          0: new Map(),
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
        G.succ,
        new Map({
          0: new Map({
            1: {
              0: {},
              1: { weight: 3 },
              2: { weight: 2 },
              3: { weight: 3 },
            },
          }),
          1: new Map(),
        })
      );
      assert.deepEqual(
        G.pred,
        new Map({
          0: new Map(),
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
      assert.throws(function () {
        return G.addEdgesFrom([0]);
      }, TypeError);
    },

    testRemoveEdge: function testRemoveEdge() {
      var G = this.K3;
      G.removeEdge(0, 1);
      assert.deepEqual(
        G.succ,
        new Map({
          0: new Map({ 2: { 0: {} } }),
          1: new Map({ 0: { 0: {} }, 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );
      assert.deepEqual(
        G.pred,
        new Map({
          0: new Map({ 1: { 0: {} }, 2: { 0: {} } }),
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
      assert.deepEqual(
        G.succ,
        new Map({
          0: new Map({ 1: { 0: {} }, 2: { 0: {} } }),
          1: new Map({ 0: { 0: {} }, 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );
      assert.deepEqual(
        G.pred,
        new Map({
          0: new Map({ 1: { 0: {} }, 2: { 0: {} } }),
          1: new Map({ 0: { 0: {} }, 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );

      G.removeEdge(0, 1);
      assert.deepEqual(
        G.succ,
        new Map({
          0: new Map({ 2: { 0: {} } }),
          1: new Map({ 0: { 0: {} }, 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );
      assert.deepEqual(
        G.pred,
        new Map({
          0: new Map({ 1: { 0: {} }, 2: { 0: {} } }),
          1: new Map({ 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );
      assert.throws(function () {
        return G.removeEdge(-1, 0);
      }, _exceptions.JSNetworkXError);
    },

    testRemoveEdgesFrom: function testRemoveEdgesFrom() {
      var G = this.K3;
      G.removeEdgesFrom([[0, 1]]);
      assert.deepEqual(
        G.succ,
        new Map({
          0: new Map({ 2: { 0: {} } }),
          1: new Map({ 0: { 0: {} }, 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );
      assert.deepEqual(
        G.pred,
        new Map({
          0: new Map({ 1: { 0: {} }, 2: { 0: {} } }),
          1: new Map({ 2: { 0: {} } }),
          2: new Map({ 0: { 0: {} }, 1: { 0: {} } }),
        })
      );
      assert.doesNotThrow(function () {
        return G.removeEdgesFrom([[0, 0]]);
      }); // silent fail
    },
  }
);
exports.TestMultiDiGraph = TestMultiDiGraph;
