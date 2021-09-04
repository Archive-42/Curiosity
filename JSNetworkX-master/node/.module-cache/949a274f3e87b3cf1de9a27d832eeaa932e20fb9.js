/*global assert, utils*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _BaseAttrGraphTester = require("./BaseAttrGraphTester");

var _BaseAttrGraphTester2 = _interopRequireDefault(_BaseAttrGraphTester);

var _Graph = require("../Graph");

var _Graph2 = _interopRequireDefault(_Graph);

var _exceptionsJSNetworkXError = require("../../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

var _exceptionsKeyError = require("../../exceptions/KeyError");

var _exceptionsKeyError2 = _interopRequireDefault(_exceptionsKeyError);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var Map = utils.Map;

var sorted = function sorted(iterator) {
  return _Array$from(iterator).sort();
};

// Tests specific to dict-of-dict-of-dict graph data structure
var TestGraph = _lodash2["default"].extend(
  {},
  _BaseAttrGraphTester2["default"],
  {
    beforeEach: function beforeEach() {
      var ed1 = {};
      var ed2 = {};
      var ed3 = {};
      this.Graph = _Graph2["default"];
      // build dict-of-dict-of-dict K3
      this.k3adj = new Map([
        [
          0,
          new Map([
            [1, ed1],
            [2, ed2],
          ]),
        ],
        [
          1,
          new Map([
            [0, ed1],
            [2, ed3],
          ]),
        ],
        [
          2,
          new Map([
            [0, ed2],
            [1, ed3],
          ]),
        ],
      ]);
      this.k3edges = [
        [0, 1],
        [0, 2],
        [1, 2],
      ];
      this.k3nodes = [0, 1, 2];
      this.K3 = new this.Graph();

      this.K3.adj = this.K3.edge = this.k3adj;
      this.K3.node = new Map([
        [0, {}],
        [1, {}],
        [2, {}],
      ]);
    },

    testDataInput: function testDataInput() {
      var G = new this.Graph(
        new Map([
          [1, [2]],
          [2, [1]],
        ]),
        { name: "test" }
      );

      assert.deepEqual(sorted(G.adj.entries()), [
        [1, new Map([[2, {}]])],
        [2, new Map([[1, {}]])],
      ]);
    },

    testAdjacencyIter: function testAdjacencyIter() {
      var G = this.K3;

      assert.deepEqual(sorted(G.adjacencyIter()), [
        [
          0,
          new Map([
            [1, {}],
            [2, {}],
          ]),
        ],
        [
          1,
          new Map([
            [0, {}],
            [2, {}],
          ]),
        ],
        [
          2,
          new Map([
            [0, {}],
            [1, {}],
          ]),
        ],
      ]);
    },

    testGetitem: function testGetitem() {
      var G = this.K3;
      assert.deepEqual(
        G.get(0),
        new Map([
          [1, {}],
          [2, {}],
        ])
      );
      assert.throws(function () {
        G.get("j");
      }, _exceptionsKeyError2["default"]);
      //  assert_raises((TypeError,networkx.NetworkXError), G.__getitem__, ['A'])
    },

    testAddNode: function testAddNode() {
      var G = new this.Graph();
      G.addNode(0);
      assert.deepEqual(G.adj, new Map([[0, new Map()]]));
      // test add attributes
      G.addNode(1, { c: "red" });
      G.addNode(2, { c: "blue" });
      assert.throws(function () {
        G.addNode(4, []);
      }, _exceptionsJSNetworkXError2["default"]);
      assert.throws(function () {
        G.addNode(4, 4);
      }, _exceptionsJSNetworkXError2["default"]);
      assert.equal(G.node.get(1).c, "red");
      assert.equal(G.node.get(2).c, "blue");
      // test upding attributes
      G.addNode(1, { c: "blue" });
      G.addNode(2, { c: "red" });
      assert.equal(G.node.get(1).c, "blue");
      assert.equal(G.node.get(2).c, "red");
    },

    testAddNodesFrom: function testAddNodesFrom() {
      var G = new this.Graph();
      G.addNodesFrom([0, 1, 2]);
      assert.deepEqual(
        G.adj,
        new Map([
          [0, new Map()],
          [1, new Map()],
          [2, new Map()],
        ])
      );
      // test add attributes
      G.addNodesFrom([0, 1, 2], { c: "red" });
      assert.equal(G.node.get(0).c, "red");
      assert.equal(G.node.get(2).c, "red");
      // test that attribute dicts are not the same
      assert.notEqual(G.node.get(0), G.node.get(1));
      // test updating attributes
      G.addNodesFrom([0, 1, 2], { c: "blue" });
      assert.equal(G.node.get(0).c, "blue");
      assert.equal(G.node.get(2).c, "blue");
      assert.notEqual(G.node.get(0), G.node.get(1));

      // test tuple input
      var H = new this.Graph();
      H.addNodesFrom(G.nodes(true));
      assert.equal(H.node.get(0).c, "blue");
      assert.equal(H.node.get(2).c, "blue");
      assert.notEqual(H.node.get(0), H.node.get(1));
      // specific overrides general
      H.addNodesFrom([0, [1, { c: "green" }], [3, { c: "cyan" }]], {
        c: "red",
      });
      assert.equal(H.node.get(0).c, "red");
      assert.equal(H.node.get(1).c, "green");
      assert.equal(H.node.get(2).c, "blue");
      assert.equal(H.node.get(3).c, "cyan");
    },

    testRemoveNode: function testRemoveNode() {
      var G = this.K3;
      G.removeNode(0);
      assert.deepEqual(
        G.adj,
        new Map([
          [1, new Map([[2, {}]])],
          [2, new Map([[1, {}]])],
        ])
      );
      assert.throws(function () {
        return G.removeNode(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testRemoveNodesFrom: function testRemoveNodesFrom() {
      var G = this.K3;
      G.removeNodesFrom([0, 1]);
      assert.deepEqual(G.adj, new Map([[2, new Map()]]));
      assert.doesNotThrow(function () {
        return G.removeNodesFrom([-1]);
      }); // silent fail
    },

    testAddEdge: function testAddEdge() {
      var G = new this.Graph();
      G.addEdge(0, 1);
      assert.deepEqual(
        G.adj,
        new Map([
          [0, new Map([[1, {}]])],
          [1, new Map([[0, {}]])],
        ])
      );
      G = new this.Graph();
      G.addEdge.apply(G, [0, 1]); //  G.add_edge(*(0,1))
      assert.deepEqual(
        G.adj,
        new Map([
          [0, new Map([[1, {}]])],
          [1, new Map([[0, {}]])],
        ])
      );
    },

    testAddEdgesFrom: function testAddEdgesFrom() {
      var G = new this.Graph();
      G.addEdgesFrom([
        [0, 1],
        [0, 2, { weight: 3 }],
      ]);
      assert.deepEqual(
        G.adj,
        new Map([
          [
            0,
            new Map([
              [1, {}],
              [2, { weight: 3 }],
            ]),
          ],
          [1, new Map([[0, {}]])],
          [2, new Map([[0, { weight: 3 }]])],
        ])
      );
      G.addEdgesFrom(
        [
          [0, 1],
          [0, 2, { weight: 3 }],
          [1, 2, { data: 4 }],
        ],
        { data: 2 }
      );
      assert.deepEqual(
        G.adj,
        new Map([
          [
            0,
            new Map([
              [1, { data: 2 }],
              [2, { data: 2, weight: 3 }],
            ]),
          ],
          [
            1,
            new Map([
              [0, { data: 2 }],
              [2, { data: 4 }],
            ]),
          ],
          [
            2,
            new Map([
              [0, { weight: 3, data: 2 }],
              [1, { data: 4 }],
            ]),
          ],
        ])
      );
      assert.throws(function () {
        G.addEdgesFrom([[0]]);
      }, _exceptionsJSNetworkXError2["default"]);
      assert.throws(function () {
        G.addEdgesFrom([[0, 1, 2, 3]]);
      }, _exceptionsJSNetworkXError2["default"]); // too many in tuple

      // not a tuple
      assert.throws(function () {
        G.addEdgesFrom([0]);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testRemoveEdge: function testRemoveEdge() {
      var G = this.K3;
      G.removeEdge(0, 1);
      assert.deepEqual(
        G.adj,
        new Map([
          [0, new Map([[2, {}]])],
          [1, new Map([[2, {}]])],
          [
            2,
            new Map([
              [0, {}],
              [1, {}],
            ]),
          ],
        ])
      );
      assert.throws(function () {
        G.removeEdge(-1, 0);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testRemoveEdgesFrom: function testRemoveEdgesFrom() {
      var G = this.K3;
      G.removeEdgesFrom([[0, 1]]);
      assert.deepEqual(
        G.adj,
        new Map([
          [0, new Map([[2, {}]])],
          [1, new Map([[2, {}]])],
          [
            2,
            new Map([
              [0, {}],
              [1, {}],
            ]),
          ],
        ])
      );
      assert.doesNotThrow(function () {
        return G.removeEdgesFrom([[0, 0]]);
      }); // silent fail
    },

    testClear: function testClear() {
      var G = this.K3;
      G.clear();
      assert.deepEqual(G.adj, new Map());
    },

    testEdgesData: function testEdgesData() {
      var G = this.K3;
      assert.deepEqual(sorted(G.edges(true)), [
        [0, 1, {}],
        [0, 2, {}],
        [1, 2, {}],
      ]);
      assert.deepEqual(sorted(G.edges(0, true)), [
        [0, 1, {}],
        [0, 2, {}],
      ]);
      assert.throws(function () {
        G.edges(-1);
      }, _exceptionsJSNetworkXError2["default"]);
    },

    testGetEdgeData: function testGetEdgeData() {
      var G = this.K3;
      assert.deepEqual(G.getEdgeData(0, 1), {});
      assert.equal(G.getEdgeData(10, 20), null);
      assert.equal(G.getEdgeData(-1, 0), null);
      assert.equal(G.getEdgeData(-1, 0, 1), 1);
    },
  }
);
exports.TestGraph = TestGraph;
