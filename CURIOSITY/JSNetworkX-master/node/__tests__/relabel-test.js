/*globals assert*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireWildcard =
  require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _classes = require("../classes");

var _exceptions = require("../exceptions");

var _relabel = require("../relabel");

var relabel = _interopRequireWildcard(_relabel);

var _generators = require("../generators");

var testRelabel = {
  testConvertNodeLabelsToIntegers: function testConvertNodeLabelsToIntegers() {
    // test that empty graph converts fine for all options
    var G = (0, _generators.emptyGraph)();
    var H = relabel.convertNodeLabelsToIntegers(G, 100);
    assert.equal(H.name, "(emptyGraph(0))WithIntLabels");
    assert.deepEqual(H.nodes(), []);
    assert.deepEqual(H.edges(), []);

    ["default", "sorted", "increasing degree", "decreasing degree"].forEach(
      function (opt) {
        /* eslint-disable no-shadow */
        var G = (0, _generators.emptyGraph)();
        var H = relabel.convertNodeLabelsToIntegers(G, 100, opt);
        /* eslint-enable no-shadow */
        assert.equal(H.name, "(emptyGraph(0))WithIntLabels");
        assert.deepEqual(H.nodes(), []);
        assert.deepEqual(H.edges(), []);
      }
    );

    G = (0, _generators.emptyGraph)();
    G.addEdgesFrom([
      ["A", "B"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ]);
    G.name = "paw";
    H = relabel.convertNodeLabelsToIntegers(G);
    var degH = _Array$from(H.degree().values());
    var degG = _Array$from(G.degree().values());
    assert.deepEqual(degH.sort(), degG.sort());

    H = relabel.convertNodeLabelsToIntegers(G, 1000);
    degH = _Array$from(H.degree().values());
    degG = _Array$from(G.degree().values());
    assert.deepEqual(degH.sort(), degG.sort());
    assert.deepEqual(H.nodes(), [1000, 1001, 1002, 1003]);

    H = relabel.convertNodeLabelsToIntegers(G, "increasing degree");
    degH = _Array$from(H.degree().values());
    degG = _Array$from(G.degree().values());
    assert.deepEqual(degH.sort(), degG.sort());
    assert.equal(H.degree(0), 1);
    assert.equal(H.degree(1), 2);
    assert.equal(H.degree(2), 2);
    assert.equal(H.degree(3), 3);

    H = relabel.convertNodeLabelsToIntegers(G, "decreasing degree");
    degH = _Array$from(H.degree().values());
    degG = _Array$from(G.degree().values());
    assert.deepEqual(degH.sort(), degG.sort());
    assert.deepEqual(H.degree(0), 3);
    assert.deepEqual(H.degree(1), 2);
    assert.deepEqual(H.degree(2), 2);
    assert.deepEqual(H.degree(3), 1);
  },

  testRelabelNodesCopy: function testRelabelNodesCopy() {
    var G = (0, _generators.emptyGraph)();
    G.addEdgesFrom([
      ["A", "B"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ]);
    var mapping = { A: "aardvark", B: "bear", C: "cat", D: "dog" };
    var H = relabel.relabelNodes(G, mapping);
    assert.deepEqual(H.nodes().sort(), ["aardvark", "bear", "cat", "dog"]);
  },

  testRelabelNodesFunction: function testRelabelNodesFunction() {
    var G = (0, _generators.emptyGraph)();
    G.addEdgesFrom([
      ["A", "B"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ]);
    var H = relabel.relabelNodes(G, function (n) {
      return n.charCodeAt(0);
    });
    assert.deepEqual(H.nodes().sort(), [65, 66, 67, 68]);
  },

  testRelabelNodesGraph: function testRelabelNodesGraph() {
    var G = new _classes.Graph([
      ["A", "B"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ]);
    var mapping = { A: "aardvark", B: "bear", C: "cat", D: "dog" };
    var H = relabel.relabelNodes(G, mapping);
    assert.deepEqual(H.nodes().sort(), ["aardvark", "bear", "cat", "dog"]);
  },

  testRelabelNodesDigraph: function testRelabelNodesDigraph() {
    var G = new _classes.DiGraph([
      ["A", "B"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ]);
    var mapping = { A: "aardvark", B: "bear", C: "cat", D: "dog" };
    var H = relabel.relabelNodes(G, mapping, false);
    assert.deepEqual(H.nodes().sort(), ["aardvark", "bear", "cat", "dog"]);
  },

  testRelabelNodesMultigraph: function testRelabelNodesMultigraph() {
    var G = new _classes.MultiGraph([
      ["a", "b"],
      ["a", "b"],
    ]);
    var mapping = { a: "aardvark", b: "bear" };
    var H = relabel.relabelNodes(G, mapping, false);
    assert.deepEqual(H.nodes().sort(), ["aardvark", "bear"]);
    assert.deepEqual(H.edges().sort(), [
      ["aardvark", "bear"],
      ["aardvark", "bear"],
    ]);
  },

  testRelabelNodesMultidigraph: function testRelabelNodesMultidigraph() {
    var G = new _classes.MultiDiGraph([
      ["a", "b"],
      ["a", "b"],
    ]);
    var mapping = { a: "aardvark", b: "bear" };
    var H = relabel.relabelNodes(G, mapping, false);
    assert.deepEqual(H.nodes().sort(), ["aardvark", "bear"]);
    assert.deepEqual(H.edges().sort(), [
      ["aardvark", "bear"],
      ["aardvark", "bear"],
    ]);
  },

  testRelabelNodesMissing: function testRelabelNodesMissing() {
    var G = new _classes.Graph([
      ["A", "B"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ]);
    var mapping = { 0: "aardvark" };
    assert.throws(function () {
      return relabel.relabelNodes(G, mapping, false);
    }, _exceptions.JSNetworkXError);
  },

  //TODO: testRelabelNodesTopsort
};
exports.testRelabel = testRelabel;
