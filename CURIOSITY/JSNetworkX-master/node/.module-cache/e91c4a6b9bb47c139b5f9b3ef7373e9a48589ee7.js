/*global assert*/
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _classes = require("../../classes/");

var _internals = require("../../_internals");

var _observer = require("../observer");

function calledWith(cb, arg) {
  _sinon2["default"].assert.calledWith(cb, _sinon2["default"].match(arg));
}

var testObserver = {
  testObserve: function testObserve() {
    var G = new _classes.Graph();
    (0, _observer.observe)(G);

    assert.isFunction(G.on);
    assert((0, _observer.isObservable)(G));

    (0, _observer.unobserve)(G);
    assert(!(0, _observer.isObservable)(G));
  },

  testAddNodes: function testAddNodes() {
    var G = new _classes.Graph();
    (0, _observer.observe)(G);

    var cb = _sinon2["default"].spy();
    G.on("addNodes", cb);

    G.addNode(1);
    calledWith(cb, { nodes: [1], newNodes: [1] });
    cb.reset();

    G.addNodesFrom([1, 2, 3]);
    calledWith(cb, { nodes: [1, 2, 3], newNodes: [2, 3] });
    cb.reset();

    G.addNodesFrom([[10, {}], 11]);
    calledWith(cb, { nodes: [[10, {}], 11], newNodes: [10, 11] });
  },

  testAddNodesIterator: function testAddNodesIterator() {
    var marked1$0 = [gen].map(_regeneratorRuntime.mark);

    var G = new _classes.Graph();
    (0, _observer.observe)(G);

    function gen() {
      return _regeneratorRuntime.wrap(
        function gen$(context$2$0) {
          while (1)
            switch ((context$2$0.prev = context$2$0.next)) {
              case 0:
                context$2$0.next = 2;
                return (0, _internals.tuple2)(1, {});

              case 2:
                context$2$0.next = 4;
                return (0, _internals.tuple2)(2, {});

              case 4:
              case "end":
                return context$2$0.stop();
            }
        },
        marked1$0[0],
        this
      );
    }

    var cb = _sinon2["default"].spy();
    G.on("addNodes", cb);
    G.addNodesFrom(gen());

    calledWith(cb, {
      nodes: [
        [1, {}],
        [2, {}],
      ],
      newNodes: [1, 2],
    });
  },

  testAddEdges: function testAddEdges() {
    var G = new _classes.Graph();
    (0, _observer.observe)(G);

    var cb = _sinon2["default"].spy();
    G.on("addEdges", cb);

    G.addEdge(1, 2);
    calledWith(cb, { edges: [[1, 2]], newEdges: [[1, 2]] });
    cb.reset();

    G.addEdgesFrom([
      [1, 2],
      [2, 3],
    ]);
    calledWith(cb, {
      edges: [
        [1, 2],
        [2, 3],
      ],
      newEdges: [[2, 3]],
    });
  },

  testAddEdgesIterator: function testAddEdgesIterator() {
    var marked1$0 = [gen].map(_regeneratorRuntime.mark);

    var G = new _classes.Graph();
    (0, _observer.observe)(G);

    function gen() {
      return _regeneratorRuntime.wrap(
        function gen$(context$2$0) {
          while (1)
            switch ((context$2$0.prev = context$2$0.next)) {
              case 0:
                context$2$0.next = 2;
                return (0, _internals.tuple2)(1, 2);

              case 2:
                context$2$0.next = 4;
                return (0, _internals.tuple2)(2, 3);

              case 4:
              case "end":
                return context$2$0.stop();
            }
        },
        marked1$0[0],
        this
      );
    }

    var cb = _sinon2["default"].spy();
    G.on("addEdges", cb);
    G.addEdgesFrom(gen());

    calledWith(cb, {
      edges: [
        [1, 2],
        [2, 3],
      ],
      newEdges: [
        [1, 2],
        [2, 3],
      ],
    });
  },

  testPreventDefaultNodes: function testPreventDefaultNodes() {
    var G = new _classes.Graph();
    (0, _observer.observe)(G);

    G.addNodesFrom([1, 2]);
    G.on(
      "addNodes",
      function (event) {
        return event.preventDefault();
      },
      null,
      true
    );
    G.addNodesFrom([3, 4]);

    assert.deepEqual(G.nodes(), [1, 2]);
  },

  testPreventDefaultEdges: function testPreventDefaultEdges() {
    var G = new _classes.Graph();
    (0, _observer.observe)(G);

    G.addEdge(1, 2);
    G.on(
      "addEdges",
      function (event) {
        return event.preventDefault();
      },
      null,
      true
    );
    G.addEdge(2, 3);

    assert.deepEqual(G.edges(), [[1, 2]]);
  },
};
exports.testObserver = testObserver;
