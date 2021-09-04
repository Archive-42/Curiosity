/*global assert*/

"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _binary = require("../binary");

var _classes = require("../../../classes");

var _generatorsClassic = require("../../../generators/classic");

var _exceptions = require("../../../exceptions");

var _internalsSet = require("../../../_internals/Set");

var _internalsSet2 = _interopRequireDefault(_internalsSet);

function sorted(it) {
  return _Array$from(it).sort();
}

var testBinary = {
  testUnionAttributes: function testUnionAttributes() {
    var g = new _classes.Graph();
    g.addNode(0, { x: 4 });
    g.addNode(1, { x: 5 });
    g.addEdge(0, 1, { size: 5 });
    g.graph.name = "g";

    var h = g.copy();
    h.graph.name = "h";
    h.graph.attr = "attr";
    h.node.get(0).x = 7;

    var gh = (0, _binary.union)(g, h, { rename: ["g", "h"] });
    assert.deepEqual(sorted(gh.nodes()), ["g0", "g1", "h0", "h1"]);

    var graphs = { g: g, h: h };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = _getIterator(gh), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        var n = _step.value;

        assert.deepEqual(gh.node.get(n), graphs[n[0]].node.get(Number(n[1])));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    assert.equal(gh.graph.attr, "attr");
    assert.equal(gh.graph.name, "h");
  },

  testIntersection: function testIntersection() {
    var G = new _classes.Graph();
    var H = new _classes.Graph();
    G.addNodesFrom([1, 2, 3, 4]);
    G.addEdgesFrom([
      [1, 2],
      [2, 3],
    ]);
    H.addNodesFrom([1, 2, 3, 4]);
    H.addEdgesFrom([
      [2, 3],
      [3, 4],
    ]);

    var I = (0, _binary.intersection)(G, H);
    assert.deepEqual(sorted(I.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(I.edges(), [[2, 3]]);

    G = new _classes.Graph();
    G.addNodesFrom([1, 2, 3, 4]);
    G.addEdgesFrom([[2, 3]]);
    I = (0, _binary.intersection)(G, H);
    assert.deepEqual(sorted(I.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(I.edges(), [[2, 3]]);
  },

  testIntersectionAttributes: function testIntersectionAttributes() {
    var g = new _classes.Graph();
    g.addNode(0, { x: 4 });
    g.addNode(1, { x: 5 });
    g.addEdge(0, 1, { size: 5 });
    g.graph.name = "g";

    var h = g.copy();
    h.graph.name = "h";
    h.graph.attr = "attr";
    h.node.get(0).x = 7;

    var gh = (0, _binary.intersection)(g, h);
    assert.deepEqual(sorted(gh.nodes()), sorted(g.nodes()));
    assert.deepEqual(sorted(gh.nodes()), sorted(h.nodes()));
    assert.deepEqual(gh.edges(), g.edges());

    h.removeNode(0);
    assert.throws(function () {
      return (0, _binary.intersection)(g, h);
    }, _exceptions.JSNetworkXError);
  },

  testIntersectionMultigraphAttributes:
    function testIntersectionMultigraphAttributes() {
      var g = new _classes.MultiGraph();
      g.addEdge(0, 1, 0);
      g.addEdge(0, 1, 1);
      g.addEdge(0, 1, 2);

      var h = new _classes.MultiGraph();
      h.addEdge(0, 1, 0);
      h.addEdge(0, 1, 3);

      var gh = (0, _binary.intersection)(g, h);
      assert.deepEqual(sorted(gh.nodes()), sorted(g.nodes()));
      assert.deepEqual(sorted(gh.nodes()), sorted(h.nodes()));
      assert.deepEqual(gh.edges(), [[0, 1]]);
      assert.deepEqual(gh.edges(false, true), [[0, 1, "0"]]);
    },

  testDifference: function testDifference() {
    var G = new _classes.Graph();
    var H = new _classes.Graph();
    G.addNodesFrom([1, 2, 3, 4]);
    G.addEdgesFrom([
      [1, 2],
      [2, 3],
    ]);
    H.addNodesFrom([1, 2, 3, 4]);
    H.addEdgesFrom([
      [2, 3],
      [3, 4],
    ]);
    var D = (0, _binary.difference)(G, H);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), [[1, 2]]);
    D = (0, _binary.difference)(H, G);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), [[3, 4]]);
    D = (0, _binary.symmetricDifference)(G, H);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), [
      [1, 2],
      [3, 4],
    ]);
  },

  testDifference2: function testDifference2() {
    var G = new _classes.Graph();
    var H = new _classes.Graph();
    G.addNodesFrom([1, 2, 3, 4]);
    G.addEdgesFrom([
      [1, 2],
      [2, 3],
    ]);
    H.addNodesFrom([1, 2, 3, 4]);
    H.addEdge(1, 2);
    var D = (0, _binary.difference)(G, H);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), [[2, 3]]);
    D = (0, _binary.difference)(H, G);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), []);
    H.addEdge(3, 4);
    D = (0, _binary.difference)(H, G);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), [[3, 4]]);
  },

  testDifferenceAttributes: function testDifferenceAttributes() {
    var g = new _classes.Graph();
    g.addNode(0, { x: 4 });
    g.addNode(1, { x: 5 });
    g.addEdge(0, 1, { size: 5 });
    g.graph.name = "g";

    var h = g.copy();
    h.graph.name = "h";
    h.graph.attr = "attr";
    h.node.get(0).x = 7;

    var gh = (0, _binary.difference)(g, h);
    assert.deepEqual(sorted(gh.nodes()), sorted(g.nodes()));
    assert.deepEqual(sorted(gh.nodes()), sorted(h.nodes()));
    assert.deepEqual(gh.edges(), []);

    h.removeNode(0);
    assert.throws(function () {
      return (0, _binary.intersection)(g, h);
    }, _exceptions.JSNetworkXError);
  },

  testDifferenceMultiGraphAttributes:
    function testDifferenceMultiGraphAttributes() {
      var g = new _classes.MultiGraph();
      g.addEdge(0, 1, 0);
      g.addEdge(0, 1, 1);
      g.addEdge(0, 1, 2);

      var h = new _classes.MultiGraph();
      h.addEdge(0, 1, 0);
      h.addEdge(0, 1, 3);

      var gh = (0, _binary.difference)(g, h);
      assert.deepEqual(sorted(gh.nodes()), sorted(g.nodes()));
      assert.deepEqual(sorted(gh.nodes()), sorted(h.nodes()));
      assert.deepEqual(gh.edges(), [
        [0, 1],
        [0, 1],
      ]);
      assert.deepEqual(gh.edges(false, true), [
        [0, 1, "1"],
        [0, 1, "2"],
      ]);
    },

  testDifferenceThrows: function testDifferenceThrows() {
    assert.throws(function () {
      return (0,
      _binary.difference)((0, _generatorsClassic.pathGraph)(4), (0, _generatorsClassic.pathGraph)(3));
    });
  },

  testSymmetricDifferenceMultiGraph:
    function testSymmetricDifferenceMultiGraph() {
      var g = new _classes.MultiGraph();
      g.addEdge(0, 1, 0);
      g.addEdge(0, 1, 1);
      g.addEdge(0, 1, 2);

      var h = new _classes.MultiGraph();
      h.addEdge(0, 1, 0);
      h.addEdge(0, 1, 3);

      var gh = (0, _binary.symmetricDifference)(g, h);
      assert.deepEqual(sorted(gh.nodes()), sorted(g.nodes()));
      assert.deepEqual(sorted(gh.nodes()), sorted(h.nodes()));
      assert.deepEqual(gh.edges(), [
        [0, 1],
        [0, 1],
        [0, 1],
      ]);
      assert.deepEqual(gh.edges(false, true), [
        [0, 1, "1"],
        [0, 1, "2"],
        [0, 1, "3"],
      ]);
    },

  testSymmetricDifferenceThrows: function testSymmetricDifferenceThrows() {
    assert.throws(function () {
      return (0,
      _binary.difference)((0, _generatorsClassic.pathGraph)(4), (0, _generatorsClassic.pathGraph)(3));
    });
  },

  testUnionAndCompose: function testUnionAndCompose() {
    /*eslint-disable max-len */
    var K3 = (0, _generatorsClassic.completeGraph)(3);
    var P3 = (0, _generatorsClassic.pathGraph)(3);
    var G1 = new _classes.DiGraph();
    G1.addEdgesFrom([
      ["A", "B"],
      ["A", "C"],
      ["A", "D"],
    ]);
    var G2 = new _classes.DiGraph();
    G2.addEdgesFrom([
      ["1", "2"],
      ["1", "3"],
      ["1", "4"],
    ]);

    var G = (0, _binary.union)(G1, G2);
    var H = (0, _binary.compose)(G1, G2);
    assert.deepEqual(sorted(G.edges()), sorted(H.edges()));
    assert.notOk(G.hasEdge("A", 1));
    assert.throws(function () {
      return (0, _binary.union)(K3, P3);
    }, _exceptions.JSNetworkXError);

    var H1 = (0, _binary.union)(H, G1, { rename: ["H", "G1"] });
    assert.deepEqual(sorted(H1.nodes()), [
      "G1A",
      "G1B",
      "G1C",
      "G1D",
      "H1",
      "H2",
      "H3",
      "H4",
      "HA",
      "HB",
      "HC",
      "HD",
    ]);
    var H2 = (0, _binary.union)(H, G2, { rename: ["H", ""] });
    assert.deepEqual(sorted(H2.nodes()), [
      "1",
      "2",
      "3",
      "4",
      "H1",
      "H2",
      "H3",
      "H4",
      "HA",
      "HB",
      "HC",
      "HD",
    ]);
    assert.notOk(H1.hasEdge("HB", "HA"));

    G = (0, _binary.compose)(G, G);
    assert.deepEqual(sorted(G.edges()), sorted(H.edges()));

    G2 = (0, _binary.union)(G2, G2, { rename: ["", "copy"] });
    assert.deepEqual(sorted(G2.nodes()), [
      "1",
      "2",
      "3",
      "4",
      "copy1",
      "copy2",
      "copy3",
      "copy4",
    ]);
    assert.deepEqual(G2.neighbors("copy4"), []);
    assert.deepEqual(sorted(G2.neighbors("copy1")), [
      "copy2",
      "copy3",
      "copy4",
    ]);
    assert.equal(G.order(), 8);
    assert.equal(G.numberOfEdges(), 6);

    var E = (0, _binary.disjointUnion)(G, G);
    assert.equal(E.order(), 16);
    assert.equal(E.numberOfEdges(), 12);

    E = (0, _binary.disjointUnion)(G1, G2);
    assert.deepEqual(
      E.nodes().sort(function (a, b) {
        return a - b;
      }),
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    );
  },

  testUnionMultiGraph: function testUnionMultiGraph() {
    var G = new _classes.MultiGraph();
    G.addEdge(1, 2, 0);
    G.addEdge(1, 2, 1);

    var H = new _classes.MultiGraph();
    H.addEdge(3, 4, 0);
    H.addEdge(3, 4, 1);

    var GH = (0, _binary.union)(G, H);
    assert.deepEqual(
      new _internalsSet2["default"](GH),
      (0, _internalsSet.union)(
        new _internalsSet2["default"](G),
        new _internalsSet2["default"](H)
      )
    );
    assert.deepEqual(
      new _internalsSet2["default"](GH.edges(false, true)),
      (0, _internalsSet.union)(
        new _internalsSet2["default"](G.edges(false, true)),
        new _internalsSet2["default"](H.edges(false, true))
      )
    );
  },

  testDisjointUnionMultiGraph: function testDisjointUnionMultiGraph() {
    var G = new _classes.MultiGraph();
    G.addEdge(0, 1, 0);
    G.addEdge(0, 1, 1);

    var H = new _classes.MultiGraph();
    H.addEdge(2, 3, 0);
    H.addEdge(2, 3, 1);

    var GH = (0, _binary.disjointUnion)(G, H);
    assert.deepEqual(
      new _internalsSet2["default"](GH),
      (0, _internalsSet.union)(
        new _internalsSet2["default"](G),
        new _internalsSet2["default"](H)
      )
    );
    assert.deepEqual(
      new _internalsSet2["default"](GH.edges(false, true)),
      (0, _internalsSet.union)(
        new _internalsSet2["default"](G.edges(false, true)),
        new _internalsSet2["default"](H.edges(false, true))
      )
    );
  },

  testComposeMultiGraph: function testComposeMultiGraph() {
    var G = new _classes.MultiGraph();
    G.addEdge(1, 2, 0);
    G.addEdge(1, 2, 1);

    var H = new _classes.MultiGraph();
    H.addEdge(3, 4, 0);
    H.addEdge(3, 4, 1);

    var GH = (0, _binary.compose)(G, H);
    assert.deepEqual(
      new _internalsSet2["default"](GH),
      (0, _internalsSet.union)(
        new _internalsSet2["default"](G),
        new _internalsSet2["default"](H)
      )
    );
    assert.deepEqual(
      new _internalsSet2["default"](GH.edges(false, true)),
      (0, _internalsSet.union)(
        new _internalsSet2["default"](G.edges(false, true)),
        new _internalsSet2["default"](H.edges(false, true))
      )
    );
    H.addEdge(1, 2, 2);
    GH = (0, _binary.compose)(G, H);
    assert.deepEqual(
      new _internalsSet2["default"](GH.edges(false, true)),
      (0, _internalsSet.union)(
        new _internalsSet2["default"](G.edges(false, true)),
        new _internalsSet2["default"](H.edges(false, true))
      )
    );
  },

  testMixedTypeUnion: function testMixedTypeUnion() {
    assert.throws(function () {
      return (0,
      _binary.union)(new _classes.Graph(), new _classes.MultiGraph());
    }, _exceptions.JSNetworkXError);
  },

  testMixedTypeDisjointUnion: function testMixedTypeDisjointUnion() {
    assert.throws(function () {
      return (0,
      _binary.disjointUnion)(new _classes.Graph(), new _classes.MultiGraph());
    }, _exceptions.JSNetworkXError);
  },

  testMixedTypeIntersection: function testMixedTypeIntersection() {
    assert.throws(function () {
      return (0,
      _binary.intersection)(new _classes.Graph(), new _classes.MultiGraph());
    }, _exceptions.JSNetworkXError);
  },

  testMixedTypeDifference: function testMixedTypeDifference() {
    assert.throws(function () {
      return (0,
      _binary.difference)(new _classes.Graph(), new _classes.MultiGraph());
    }, _exceptions.JSNetworkXError);
  },

  testMixedTypeSymmetricDifference:
    function testMixedTypeSymmetricDifference() {
      assert.throws(function () {
        return (0,
        _binary.symmetricDifference)(new _classes.Graph(), new _classes.MultiGraph());
      }, _exceptions.JSNetworkXError);
    },

  testMixedTypeCompose: function testMixedTypeCompose() {
    assert.throws(function () {
      return (0,
      _binary.union)(new _classes.Graph(), new _classes.MultiGraph());
    }, _exceptions.JSNetworkXError);
  },
};
exports.testBinary = testBinary;
