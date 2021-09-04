/*global assert, utils*/
"use strict";

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _BaseAttrGraphTester = require("./BaseAttrGraphTester");

var _BaseAttrGraphTester2 = _interopRequireDefault(_BaseAttrGraphTester);

var _shared = require("./shared");

var _shared2 = _interopRequireDefault(_shared);

var _ = require("../");

var Map = utils.Map;

var sharedMulti = {
  deepcopyEdgeAttr: function deepcopyEdgeAttr(H, G) {
    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
    G.get(1).get(2)[0].foo.push(1);
    assert.notDeepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
  },

  shallowCopyEdgeAttr: function shallowCopyEdgeAttr(H, G) {
    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
    G.get(1).get(2)[0].foo.push(1);
    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
  },

  sameAttrdict: function sameAttrdict(H, G) {
    // same attrdict in the edgedata
    var oldFoo = H.get(1).get(2)[0].foo;
    H.addEdge(1, 2, 0, { foo: "baz" });
    assert.deepEqual(G.edge, H.edge);
    H.addEdge(1, 2, 0, { foo: oldFoo });
    assert.deepEqual(G.edge, H.edge);
    // but not same edgedata dict
    H.addEdge(1, 2, { foo: "baz" });
    assert.notDeepEqual(G.edge, H.edge);

    oldFoo = H.node.get(0).foo;
    H.node.get(0).foo = "baz";
    assert.deepEqual(G.node, H.node);
    H.node.get(0).foo = oldFoo;
    assert.deepEqual(G.node, H.node);
  },

  differentAttrdict: function differentAttrdict(H, G) {
    // used by graphEqualButDifferent
    var oldFoo = H.get(1).get(2)[0].foo;
    H.addEdge(1, 2, 0, { foo: "baz" });
    assert.notDeepEqual(G.edge, H.edge);
    H.addEdge(1, 2, 0, { foo: oldFoo });
    assert.deepEqual(G.edge, H.edge);

    var HH = H.copy();
    H.addEdge(1, 2, { foo: "baz" });
    assert.notDeepEqual(G.edge, H.edge);
    H = HH;

    oldFoo = H.node.get(0).foo;
    H.node.get(0).foo = "baz";
    assert.notDeepEqual(G.node, H.node);
    H.node.get(0).foo = oldFoo;
    assert.deepEqual(G.node, H.node);
  },
};

var origShared;
exports["default"] = _Object$assign({}, _BaseAttrGraphTester2["default"], {
  before: function before() {
    // override multigraph methods
    origShared = _Object$assign({}, _shared2["default"]);
    _Object$assign(_shared2["default"], sharedMulti);
  },

  after: function after() {
    // restore original shared
    _Object$assign(_shared2["default"], origShared);
  },

  testHasEdge: function testHasEdge() {
    var G = this.K3;
    assert.equal(G.hasEdge(0, 1), true);
    assert.equal(G.hasEdge(0, -1), false);
    assert.equal(G.hasEdge(0, 1, 0), true);
    assert.equal(G.hasEdge(0, 1, 1), false);
  },

  testGetEdgeData: function testGetEdgeData() {
    var G = this.K3;
    assert.deepEqual(G.getEdgeData(0, 1), { 0: {} });
    assert.deepEqual(G.get(0).get(1), { 0: {} });
    assert.deepEqual(G.get(0).get(1)[0], {});
    assert.equal(G.getEdgeData(10, 20), null);
    assert.deepEqual(G.getEdgeData(0, 1, 0), {});
  },

  testAdjacencyIter: function testAdjacencyIter() {
    var G = this.K3;
    assert.deepEqual(_Array$from(G.adjacencyIter()), [
      [0, new Map({ 1: { 0: {} }, 2: { 0: {} } })],
      [1, new Map({ 0: { 0: {} }, 2: { 0: {} } })],
      [2, new Map({ 0: { 0: {} }, 1: { 0: {} } })],
    ]);
  },

  testToUndirected: function testToUndirected() {
    var G = this.K3;
    _shared2["default"].addAttributes(G);
    var H = new _.MultiGraph(G);
    _shared2["default"].isShallowCopy(H, G);
    H = G.toUndirected();
    _shared2["default"].isDeepcopy(H, G);
  },

  testToDirected: function testToDirected() {
    var G = this.K3;
    _shared2["default"].addAttributes(G);
    var H = new _.MultiDiGraph(G);
    _shared2["default"].isShallowCopy(H, G);
    H = G.toDirected();
    _shared2["default"].isDeepcopy(H, G);
  },

  testSelfloops: function testSelfloops() {
    var G = this.K3;
    G.addEdge(0, 0);
    assert.deepEqual(G.nodesWithSelfloops(), [0]);
    assert.deepEqual(G.selfloopEdges(), [[0, 0]]);
    assert.deepEqual(G.selfloopEdges(true), [[0, 0, {}]]);
    assert.equal(G.numberOfSelfloops(), 1);
  },

  testSelfloops2: function testSelfloops2() {
    var G = this.K3;
    G.addEdge(0, 0);
    G.addEdge(0, 0);
    G.addEdge(0, 0, "parallel edge");
    G.removeEdge(0, 0, "parallel edge");
    assert.equal(G.numberOfEdges(0, 0), 2);
    G.removeEdge(0, 0);
    assert.equal(G.numberOfEdges(0, 0), 1);
  },

  testEdgeAttr4: function testEdgeAttr4() {
    var G = new this.Graph();
    G.addEdge(1, 2, 0, { data: 7, spam: "bar", bar: "foo" });
    assert.deepEqual(G.edges(true), [
      [1, 2, { data: 7, spam: "bar", bar: "foo" }],
    ]);
    // OK to set data like this
    G.get(1).get(2)[0].data = 10;
    assert.deepEqual(G.edges(true), [
      [1, 2, { data: 10, spam: "bar", bar: "foo" }],
    ]);
    G.edge.get(1).get(2)[0].data = 20;
    assert.deepEqual(G.edges(true), [
      [1, 2, { data: 20, spam: "bar", bar: "foo" }],
    ]);
    G.edge.get(1).get(2)[0].listdata = [20, 200];
    G.edge.get(1).get(2)[0].weight = 20;
    assert.deepEqual(G.edges(true), [
      [
        1,
        2,
        { data: 20, spam: "bar", bar: "foo", listdata: [20, 200], weight: 20 },
      ],
    ]);
  },
});
module.exports = exports["default"];
