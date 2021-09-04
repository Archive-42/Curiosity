/*global assert*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _exceptionsJSNetworkXError = require("../../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

exports["default"] = {
  addAttributes: function addAttributes(G) {
    G.graph.foo = [];
    G.node.get(0).foo = [];
    G.removeEdge(1, 2);
    var ll = [];
    G.addEdge(1, 2, { foo: ll });
    G.addEdge(2, 1, { foo: ll });
    // must be dict
    assert.throws(function () {
      return G.addEdge(0, 1, []);
    }, _exceptionsJSNetworkXError2["default"]);
  },

  isDeepcopy: function isDeepcopy(H, G) {
    this.graphsEqual(H, G);
    this.differentAttrdict(H, G);
    this.deepCopyAttrdict(H, G);
  },

  deepCopyAttrdict: function deepCopyAttrdict(H, G) {
    this.deepcopyGraphAttr(H, G);
    this.deepcopyNodeAttr(H, G);
    this.deepcopyEdgeAttr(H, G);
  },

  deepcopyGraphAttr: function deepcopyGraphAttr(H, G) {
    assert.deepEqual(G.graph.foo, H.graph.foo);
    G.graph.foo.push(1);
    assert.notDeepEqual(G.graph.foo, H.graph.foo);
  },

  deepcopyNodeAttr: function deepcopyNodeAttr(H, G) {
    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
    G.node.get(0).foo.push(1);
    assert.notDeepEqual(G.node.get(0).foo, H.node.get(0).foo);
  },

  deepcopyEdgeAttr: function deepcopyEdgeAttr(H, G) {
    assert.deepEqual(G.get(1).get(2).foo, H.get(1).get(2).foo);
    G.get(1).get(2).foo.push(1);
    assert.notDeepEqual(G.get(1).get(2).foo, H.get(1).get(2).foo);
  },

  graphsEqual: function graphsEqual(H, G) {
    assert.deepEqual(G.adj, H.adj);
    assert.deepEqual(G.edge, H.edge);
    assert.deepEqual(G.node, H.node);
    assert.deepEqual(G.graph, H.graph);
    assert.deepEqual(G.name, H.name);
    if (!G.isDirected() && !H.isDirected()) {
      assert.strictEqual(H.adj.get(1).get(2), H.adj.get(2).get(1));
      assert.strictEqual(G.adj.get(1).get(2), G.adj.get(2).get(1));
    } else {
      // at least one is directed
      if (!G.isDirected()) {
        G.pred = G.adj;
        G.succ = G.adj;
      }
      if (!H.isDirected()) {
        H.pred = H.adj;
        H.succ = H.adj;
      }
      assert.deepEqual(G.pred, H.pred);
      assert.deepEqual(G.succ, H.succ);
      assert.strictEqual(H.succ.get(1).get(2), H.pred.get(2).get(1));
      assert.strictEqual(G.succ.get(1).get(2), G.pred.get(2).get(1));
    }
  },

  differentAttrdict: function differentAttrdict(H, G) {
    var oldFoo = H.get(1).get(2).foo;
    H.addEdge(1, 2, { foo: "baz" });
    assert.notDeepEqual(G.edge, H.edge);
    H.addEdge(1, 2, { foo: oldFoo });
    assert.deepEqual(G.edge, H.edge);
    oldFoo = H.node.get(0).foo;
    H.node.get(0).foo = "baz";
    assert.notDeepEqual(G.node, H.node);
    H.node.get(0).foo = oldFoo;
    assert.deepEqual(G.node, H.node);
  },

  isShallowCopy: function isShallowCopy(H, G) {
    this.graphsEqual(H, G);
    this.differentAttrdict(H, G);
    this.shallowCopyAttrdict(H, G);
  },

  shallowCopyAttrdict: function shallowCopyAttrdict(H, G) {
    this.shallowCopyGraphAttr(H, G);
    this.shallowCopyNodeAttr(H, G);
    this.shallowCopyEdgeAttr(H, G);
  },

  shallowCopyGraphAttr: function shallowCopyGraphAttr(H, G) {
    assert.equal(G.graph.foo, H.graph.foo);
    G.graph.foo.push(1);
    assert.deepEqual(G.graph.foo, H.graph.foo);
  },

  shallowCopyNodeAttr: function shallowCopyNodeAttr(H, G) {
    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
    G.node.get(0).foo.push(1);
    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
  },

  shallowCopyEdgeAttr: function shallowCopyEdgeAttr(H, G) {
    assert.deepEqual(G.get(1).get(2).foo, H.get(1).get(2).foo);
    G.get(1).get(2).foo.push(1);
    assert.deepEqual(G.get(1).get(2).foo, H.get(1).get(2).foo);
  },

  sameAttrdict: function sameAttrdict(H, G) {
    var oldFoo = H.get(1).get(2).foo;
    H.addEdge(1, 2, { foo: "baz" });
    assert.deepEqual(G.edge, H.edge);
    H.addEdge(1, 2, { foo: oldFoo });
    assert.deepEqual(G.edge, H.edge);
    oldFoo = H.node.get(0).foo;
    H.node.get(0).foo = "baz";
    assert.deepEqual(G.node, H.node);
    H.node.get(0).foo = oldFoo;
    assert.deepEqual(G.node, H.node);
  },
};
module.exports = exports["default"];
