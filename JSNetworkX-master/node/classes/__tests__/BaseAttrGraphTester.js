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

var _Graph = require("../Graph");

var _Graph2 = _interopRequireDefault(_Graph);

var _DiGraph = require("../DiGraph");

var _DiGraph2 = _interopRequireDefault(_DiGraph);

var _exceptionsJSNetworkXError = require("../../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

var _shared = require("./shared");

var _shared2 = _interopRequireDefault(_shared);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var Map = utils.Map;
exports["default"] = _lodash2["default"].extend(
  {},
  _BaseGraphTester2["default"],
  {
    testWeightedDegree: function testWeightedDegree() {
      var G = new this.Graph();
      G.addEdge(1, 2, { weight: 2, other: 3 });
      G.addEdge(2, 3, { weight: 3, other: 4 });
      assert.deepEqual(
        _Array$from(G.degree(null, "weight").values()),
        [2, 5, 3]
      );
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

      assert.deepEqual(
        _Array$from(G.degree(null, "other").values()),
        [3, 7, 4]
      );
      assert.deepEqual(
        G.degree(null, "other"),
        new Map([
          [1, 3],
          [2, 7],
          [3, 4],
        ])
      );
      assert.equal(G.degree(1, "other"), 3);
      assert.deepEqual(G.degree([1], "other"), new Map([[1, 3]]));
    },

    testName: function testName() {
      var G = new this.Graph(null, { name: "" });
      assert.equal(G.name, "");
      G = new this.Graph(null, { name: "test" });
      assert.equal(G.toString(), "test");
      assert.equal(G.name, "test");
    },

    testCopy: function testCopy() {
      var G = this.K3;
      _shared2["default"].addAttributes(G);
      var H = G.copy();
      //shared.is_deepcopy(H, G);
      H = new G.constructor(G);
      _shared2["default"].isShallowCopy(H, G);
    },

    testCopyAttr: function testCopyAttr() {
      var G = new this.Graph(null, { foo: [] });
      G.addNode(0, { foo: [] });
      G.addEdge(1, 2, { foo: [] });
      var H = G.copy();
      _shared2["default"].isDeepcopy(H, G);
      H = new G.constructor(G); // just copy
      _shared2["default"].isShallowCopy(H, G);
    },

    testGraphAttr: function testGraphAttr() {
      var G = this.K3;
      G.graph.foo = "bar";
      assert.equal(G.graph.foo, "bar");
      delete G.graph.foo;
      assert.deepEqual(G.graph, {});
      var H = new this.Graph(null, { foo: "bar" });
      assert.equal(H.graph.foo, "bar");
    },

    testNodeAttr: function testNodeAttr() {
      var G = this.K3;
      G.addNode(1, { foo: "bar" });
      assert.deepEqual(G.nodes(), [0, 1, 2]);
      assert.deepEqual(G.nodes(true), [
        [0, {}],
        [1, { foo: "bar" }],
        [2, {}],
      ]);
      G.node.get(1).foo = "baz";
      assert.deepEqual(G.nodes(true), [
        [0, {}],
        [1, { foo: "baz" }],
        [2, {}],
      ]);
    },

    testNodeAttr2: function testNodeAttr2() {
      var G = this.K3;
      var a = { foo: "bar" };
      G.addNode(3, a);
      assert.deepEqual(G.nodes(), [0, 1, 2, 3]);
      assert.deepEqual(G.nodes(true), [
        [0, {}],
        [1, {}],
        [2, {}],
        [3, { foo: "bar" }],
      ]);
    },

    testEdgeAttr: function testEdgeAttr() {
      var G = new this.Graph();
      G.addEdge(1, 2, { foo: "bar" });
      assert.deepEqual(G.edges(true), [[1, 2, { foo: "bar" }]]);
    },

    testEdgeAttr2: function testEdgeAttr2() {
      var G = new this.Graph();
      G.addEdgesFrom(
        [
          [1, 2],
          [3, 4],
        ],
        { foo: "foo" }
      );
      assert.deepEqual(G.edges(true).sort(), [
        [1, 2, { foo: "foo" }],
        [3, 4, { foo: "foo" }],
      ]);
    },

    testEdgeAttr3: function testEdgeAttr3() {
      var G = new this.Graph();
      G.addEdgesFrom(
        [
          [1, 2, { weight: 32 }],
          [3, 4, { weight: 64 }],
        ],
        { foo: "foo" }
      );
      assert.deepEqual(G.edges(true), [
        [1, 2, { foo: "foo", weight: 32 }],
        [3, 4, { foo: "foo", weight: 64 }],
      ]);

      G.removeEdgesFrom([
        [1, 2],
        [3, 4],
      ]);
      G.addEdge(1, 2, { data: 7, spam: "bar", bar: "foo" });
      assert.deepEqual(G.edges(true), [
        [1, 2, { data: 7, spam: "bar", bar: "foo" }],
      ]);
    },

    testEdgeAttr4: function testEdgeAttr4() {
      var G = new this.Graph();
      G.addEdge(1, 2, { data: 7, spam: "bar", bar: "foo" });
      assert.deepEqual(G.edges(true), [
        [1, 2, { data: 7, spam: "bar", bar: "foo" }],
      ]);
      G.get(1).get(2).data = 10; // OK to set data like this
      assert.deepEqual(G.edges(true), [
        [1, 2, { data: 10, spam: "bar", bar: "foo" }],
      ]);

      G.edge.get(1).get(2).data = 20; // another spelling, "edge"
      assert.deepEqual(G.edges(true), [
        [1, 2, { data: 20, spam: "bar", bar: "foo" }],
      ]);
      G.edge.get(1).get(2).listdata = [20, 200];
      G.edge.get(1).get(2).weight = 20;
      assert.deepEqual(G.edges(true), [
        [
          1,
          2,
          {
            data: 20,
            spam: "bar",
            bar: "foo",
            listdata: [20, 200],
            weight: 20,
          },
        ],
      ]);
    },

    testAttrDictNotDict: function testAttrDictNotDict() {
      // attr_dict must be dict
      var G = new this.Graph();
      var edges = [[1, 2]];
      assert.throws(function () {
        G.addEdgesFrom(edges, []);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testToUndirected: function testToUndirected() {
      var G = this.K3;
      _shared2["default"].addAttributes(G);
      var H = new _Graph2["default"](G);
      _shared2["default"].isShallowCopy(H, G);
      H = G.toUndirected();
      _shared2["default"].isDeepcopy(H, G);
    },

    testToDirected: function testToDirected() {
      var G = this.K3;
      _shared2["default"].addAttributes(G);
      var H = new _DiGraph2["default"](G);
      _shared2["default"].isShallowCopy(H, G);
      H = G.toDirected();
      _shared2["default"].isDeepcopy(H, G);
    },

    testSubgraph: function testSubgraph() {
      var G = this.K3;
      _shared2["default"].addAttributes(G);
      var H = G.subgraph([0, 1, 2, 5]);
      // assert.equal(H.name, 'Subgraph of ('+G.name+')')
      H.name = G.name;
      _shared2["default"].graphsEqual(H, G);
      _shared2["default"].sameAttrdict(H, G);
      _shared2["default"].shallowCopyAttrdict(H, G);

      H = G.subgraph(0);
      assert.deepEqual(H.adj, new Map([[0, new Map()]]));
      H = G.subgraph([]);
      assert.deepEqual(H.adj, new Map());
      assert.notDeepEqual(G.adj, new Map());
    },

    testSelfloopsAttr: function testSelfloopsAttr() {
      var G = this.K3.copy();
      G.addEdge(0, 0);
      G.addEdge(1, 1, { weight: 2 });
      assert.deepEqual(G.selfloopEdges(true), [
        [0, 0, {}],
        [1, 1, { weight: 2 }],
      ]);
    },
  }
);
module.exports = exports["default"];
