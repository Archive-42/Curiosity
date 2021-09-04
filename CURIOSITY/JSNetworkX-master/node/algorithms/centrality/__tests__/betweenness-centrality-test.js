/*global assert, utils*/
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _classes = require("../../../classes");

var _generators = require("../../../generators");

var _betweenness = require("../betweenness");

var Map = utils.Map;

function weightedG() {
  var G = new _classes.Graph();
  G.addEdge(0, 1, { weight: 3 });
  G.addEdge(0, 2, { weight: 2 });
  G.addEdge(0, 3, { weight: 6 });
  G.addEdge(0, 4, { weight: 4 });
  G.addEdge(1, 3, { weight: 5 });
  G.addEdge(1, 5, { weight: 5 });
  G.addEdge(2, 4, { weight: 1 });
  G.addEdge(3, 4, { weight: 2 });
  G.addEdge(3, 5, { weight: 1 });
  G.addEdge(4, 5, { weight: 4 });
  return G;
}

var testBetweennessCentrality = {
  testk5: function testk5() {
    var G = (0, _generators.completeGraph)(5);
    var bAnswer = new Map({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: false,
    });
    assert.deepEqual(b, bAnswer);
  },

  testk5Endpoints: function testk5Endpoints() {
    var G = (0, _generators.completeGraph)(5);
    var bAnswer = new Map({ 0: 4, 1: 4, 2: 4, 3: 4, 4: 4 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: false,
      endpoints: true,
    });
    assert.deepEqual(b, bAnswer);
  },

  testP3Normalized: function testP3Normalized() {
    var G = (0, _generators.pathGraph)(3);
    var bAnswer = new Map({ 0: 0, 1: 1, 2: 0 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: true,
    });
    assert.deepEqual(b, bAnswer);
  },

  testP3: function testP3() {
    var G = (0, _generators.pathGraph)(3);
    var bAnswer = new Map({ 0: 0, 1: 1, 2: 0 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: false,
    });
    assert.deepEqual(b, bAnswer);
  },

  testP3Endpoints: function testP3Endpoints() {
    var G = (0, _generators.pathGraph)(3);
    var bAnswer = new Map({ 0: 2, 1: 3, 2: 2 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: false,
      endpoints: true,
    });
    assert.deepEqual(b, bAnswer);
  },

  testKrackhardtKiteGraph: function testKrackhardtKiteGraph() {
    var G = (0, _generators.krackhardtKiteGraph)();
    var bAnswer = new Map({
      0: 1.667,
      1: 1.667,
      2: 0.0,
      3: 7.333,
      4: 0.0,
      5: 16.667,
      6: 16.667,
      7: 28.0,
      8: 16.0,
      9: 0.0,
    });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k) / 2);
    });
  },

  testKrackhardtKiteGraphNormalized:
    function testKrackhardtKiteGraphNormalized() {
      var G = (0, _generators.krackhardtKiteGraph)();
      var bAnswer = new Map({
        0: 0.023,
        1: 0.023,
        2: 0.0,
        3: 0.102,
        4: 0.0,
        5: 0.231,
        6: 0.231,
        7: 0.389,
        8: 0.222,
        9: 0.0,
      });
      var b = (0, _betweenness.betweennessCentrality)(G, {
        weight: null,
        normalized: true,
      });
      b.forEach(function (v, k) {
        return assert.almostEqual(v, bAnswer.get(k));
      });
    },

  testFlorentineFamiliesGraph: function testFlorentineFamiliesGraph() {
    var G = (0, _generators.florentineFamiliesGraph)();
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: true,
    });
    var bAnswer = new Map({
      /* eslint-disable key-spacing */
      Acciaiuoli: 0.0,
      Albizzi: 0.212,
      Barbadori: 0.093,
      Bischeri: 0.104,
      Castellani: 0.055,
      Ginori: 0.0,
      Guadagni: 0.255,
      Lamberteschi: 0.0,
      Medici: 0.522,
      Pazzi: 0.0,
      Peruzzi: 0.022,
      Ridolfi: 0.114,
      Salviati: 0.143,
      Strozzi: 0.103,
      Tornabuoni: 0.092,
      /* eslint-enable key-spacing */
    });
    G.nodes().forEach(function (v) {
      return assert.almostEqual(b.get(v), bAnswer.get(v));
    });
  },

  testLadderGraph: function testLadderGraph() {
    var G = new _classes.Graph();
    G.addEdgesFrom([
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [2, 4],
      [4, 5],
      [3, 5],
    ]);
    var bAnswer = new Map({
      0: 1.667,
      1: 1.667,
      2: 6.667,
      3: 6.667,
      4: 1.667,
      5: 1.667,
    });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k) / 2);
    });
  },

  testDisconnectedPath: function testDisconnectedPath() {
    var G = new _classes.Graph();
    G.addPath([0, 1, 2]);
    G.addPath([3, 4, 5, 6]);
    var bAnswer = new Map({ 0: 0, 1: 1, 2: 0, 3: 0, 4: 2, 5: 2, 6: 0 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },

  testDisconnectedPathEndpoints: function testDisconnectedPathEndpoints() {
    var G = new _classes.Graph();
    G.addPath([0, 1, 2]);
    G.addPath([3, 4, 5, 6]);
    var bAnswer = new Map({ 0: 2, 1: 3, 2: 2, 3: 3, 4: 5, 5: 5, 6: 3 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: false,
      endpoints: true,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },

  testDirectedPath: function testDirectedPath() {
    var G = new _classes.DiGraph();
    G.addPath([0, 1, 2]);
    var bAnswer = new Map({ 0: 0.0, 1: 1, 2: 0 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },

  testDirectedPathNormalized: function testDirectedPathNormalized() {
    var G = new _classes.DiGraph();
    G.addPath([0, 1, 2]);
    var bAnswer = new Map({ 0: 0, 1: 0.5, 2: 0 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: null,
      normalized: true,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },
};

exports.testBetweennessCentrality = testBetweennessCentrality;
var testWeightedBetweennessCentrality = {
  testK5: function testK5() {
    var G = (0, _generators.completeGraph)(5);
    var bAnswer = new Map({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },

  testP3Normalized: function testP3Normalized() {
    var G = (0, _generators.pathGraph)(3);
    var bAnswer = new Map({ 0: 0, 1: 1, 2: 0 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: "weight",
      normalized: true,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },

  testP3: function testP3() {
    var G = (0, _generators.pathGraph)(3);
    var bAnswer = new Map({ 0: 0, 1: 1, 2: 0 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },

  testKrackhardtKiteGraph: function testKrackhardtKiteGraph() {
    var G = (0, _generators.krackhardtKiteGraph)();
    var bAnswer = new Map({
      0: 1.667,
      1: 1.667,
      2: 0.0,
      3: 7.333,
      4: 0.0,
      5: 16.667,
      6: 16.667,
      7: 28.0,
      8: 16.0,
      9: 0.0,
    });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k) / 2);
    });
  },

  testKrackhardtKiteGraphNormalized:
    function testKrackhardtKiteGraphNormalized() {
      var G = (0, _generators.krackhardtKiteGraph)();
      var bAnswer = new Map({
        0: 0.023,
        1: 0.023,
        2: 0.0,
        3: 0.102,
        4: 0.0,
        5: 0.231,
        6: 0.231,
        7: 0.389,
        8: 0.222,
        9: 0.0,
      });
      var b = (0, _betweenness.betweennessCentrality)(G, {
        weight: "weight",
        normalized: true,
      });
      b.forEach(function (v, k) {
        return assert.almostEqual(v, bAnswer.get(k));
      });
    },

  testFlorentineFamiliesGraph: function testFlorentineFamiliesGraph() {
    var G = (0, _generators.florentineFamiliesGraph)();
    var bAnswer = new Map({
      /* eslint-disable key-spacing */
      Acciaiuoli: 0.0,
      Albizzi: 0.212,
      Barbadori: 0.093,
      Bischeri: 0.104,
      Castellani: 0.055,
      Ginori: 0.0,
      Guadagni: 0.255,
      Lamberteschi: 0.0,
      Medici: 0.522,
      Pazzi: 0.0,
      Peruzzi: 0.022,
      Ridolfi: 0.114,
      Salviati: 0.143,
      Strozzi: 0.103,
      Tornabuoni: 0.092,
      /* eslint-enable key-spacing */
    });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: "weight",
      normalized: true,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },

  testLadderGraph: function testLadderGraph() {
    var G = new _classes.Graph();
    G.addEdgesFrom([
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [2, 4],
      [4, 5],
      [3, 5],
    ]);
    var bAnswer = new Map({
      0: 1.667,
      1: 1.667,
      2: 6.667,
      3: 6.667,
      4: 1.667,
      5: 1.667,
    });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k) / 2);
    });
  },

  testG: function testG() {
    var G = weightedG();
    var bAnswer = new Map({ 0: 2, 1: 0, 2: 4, 3: 3, 4: 4, 5: 0 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },

  testG2: function testG2() {
    var G = new _classes.DiGraph();
    G.addWeightedEdgesFrom([
      ["s", "u", 10],
      ["s", "x", 5],
      ["u", "v", 1],
      ["u", "x", 2],
      ["v", "y", 1],
      ["x", "u", 3],
      ["x", "v", 5],
      ["x", "y", 2],
      ["y", "s", 7],
      ["y", "v", 6],
    ]);
    var bAnswer = new Map({ y: 5, x: 5, s: 4, u: 2, v: 2 });
    var b = (0, _betweenness.betweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },
};

exports.testWeightedBetweennessCentrality = testWeightedBetweennessCentrality;
var testEdgeBetweennessCentrality = {
  testk5: function testk5() {
    // istanbul ignore next

    var _this = this;

    var G = (0, _generators.completeGraph)(5);
    var edge;
    var bAnswer = new Map(
      _regeneratorRuntime.mark(function callee$1$0() {
        var _iteratorNormalCompletion,
          _didIteratorError,
          _iteratorError,
          _iterator,
          _step,
          _edge;

        return _regeneratorRuntime.wrap(
          function callee$1$0$(context$2$0) {
            while (1)
              switch ((context$2$0.prev = context$2$0.next)) {
                case 0:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$2$0.prev = 3;
                  _iterator = _getIterator(G.edges());

                case 5:
                  if (
                    (_iteratorNormalCompletion = (_step = _iterator.next())
                      .done)
                  ) {
                    context$2$0.next = 12;
                    break;
                  }

                  _edge = _step.value;
                  context$2$0.next = 9;
                  return [_edge, 1];

                case 9:
                  _iteratorNormalCompletion = true;
                  context$2$0.next = 5;
                  break;

                case 12:
                  context$2$0.next = 18;
                  break;

                case 14:
                  context$2$0.prev = 14;
                  context$2$0.t0 = context$2$0["catch"](3);
                  _didIteratorError = true;
                  _iteratorError = context$2$0.t0;

                case 18:
                  context$2$0.prev = 18;
                  context$2$0.prev = 19;

                  if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                  }

                case 21:
                  context$2$0.prev = 21;

                  if (!_didIteratorError) {
                    context$2$0.next = 24;
                    break;
                  }

                  throw _iteratorError;

                case 24:
                  return context$2$0.finish(21);

                case 25:
                  return context$2$0.finish(18);

                case 26:
                case "end":
                  return context$2$0.stop();
              }
          },
          callee$1$0,
          _this,
          [
            [3, 14, 18, 26],
            [19, , 21, 25],
          ]
        );
      })()
    );
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: null,
      normalized: false,
    });
    assert.deepEqual(b, bAnswer);
  },

  testNormalizedK5: function testNormalizedK5() {
    // istanbul ignore next

    var _this2 = this;

    var G = (0, _generators.completeGraph)(5);
    var edge;
    var bAnswer = new Map(
      _regeneratorRuntime.mark(function callee$1$0() {
        var _iteratorNormalCompletion2,
          _didIteratorError2,
          _iteratorError2,
          _iterator2,
          _step2,
          _edge2;

        return _regeneratorRuntime.wrap(
          function callee$1$0$(context$2$0) {
            while (1)
              switch ((context$2$0.prev = context$2$0.next)) {
                case 0:
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  context$2$0.prev = 3;
                  _iterator2 = _getIterator(G.edges());

                case 5:
                  if (
                    (_iteratorNormalCompletion2 = (_step2 = _iterator2.next())
                      .done)
                  ) {
                    context$2$0.next = 12;
                    break;
                  }

                  _edge2 = _step2.value;
                  context$2$0.next = 9;
                  return [_edge2, 1 / 10];

                case 9:
                  _iteratorNormalCompletion2 = true;
                  context$2$0.next = 5;
                  break;

                case 12:
                  context$2$0.next = 18;
                  break;

                case 14:
                  context$2$0.prev = 14;
                  context$2$0.t0 = context$2$0["catch"](3);
                  _didIteratorError2 = true;
                  _iteratorError2 = context$2$0.t0;

                case 18:
                  context$2$0.prev = 18;
                  context$2$0.prev = 19;

                  if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                    _iterator2["return"]();
                  }

                case 21:
                  context$2$0.prev = 21;

                  if (!_didIteratorError2) {
                    context$2$0.next = 24;
                    break;
                  }

                  throw _iteratorError2;

                case 24:
                  return context$2$0.finish(21);

                case 25:
                  return context$2$0.finish(18);

                case 26:
                case "end":
                  return context$2$0.stop();
              }
          },
          callee$1$0,
          _this2,
          [
            [3, 14, 18, 26],
            [19, , 21, 25],
          ]
        );
      })()
    );
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: null,
      normalized: true,
    });
    assert.deepEqual(b, bAnswer);
  },

  testC4: function testC4() {
    // istanbul ignore next

    var _this3 = this;

    var G = (0, _generators.cycleGraph)(4);
    var edge;
    var bAnswer = new Map(
      _regeneratorRuntime.mark(function callee$1$0() {
        var _iteratorNormalCompletion3,
          _didIteratorError3,
          _iteratorError3,
          _iterator3,
          _step3,
          _edge3;

        return _regeneratorRuntime.wrap(
          function callee$1$0$(context$2$0) {
            while (1)
              switch ((context$2$0.prev = context$2$0.next)) {
                case 0:
                  _iteratorNormalCompletion3 = true;
                  _didIteratorError3 = false;
                  _iteratorError3 = undefined;
                  context$2$0.prev = 3;
                  _iterator3 = _getIterator(G.edges());

                case 5:
                  if (
                    (_iteratorNormalCompletion3 = (_step3 = _iterator3.next())
                      .done)
                  ) {
                    context$2$0.next = 12;
                    break;
                  }

                  _edge3 = _step3.value;
                  context$2$0.next = 9;
                  return [_edge3, 2 / 6];

                case 9:
                  _iteratorNormalCompletion3 = true;
                  context$2$0.next = 5;
                  break;

                case 12:
                  context$2$0.next = 18;
                  break;

                case 14:
                  context$2$0.prev = 14;
                  context$2$0.t0 = context$2$0["catch"](3);
                  _didIteratorError3 = true;
                  _iteratorError3 = context$2$0.t0;

                case 18:
                  context$2$0.prev = 18;
                  context$2$0.prev = 19;

                  if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                    _iterator3["return"]();
                  }

                case 21:
                  context$2$0.prev = 21;

                  if (!_didIteratorError3) {
                    context$2$0.next = 24;
                    break;
                  }

                  throw _iteratorError3;

                case 24:
                  return context$2$0.finish(21);

                case 25:
                  return context$2$0.finish(18);

                case 26:
                case "end":
                  return context$2$0.stop();
              }
          },
          callee$1$0,
          _this3,
          [
            [3, 14, 18, 26],
            [19, , 21, 25],
          ]
        );
      })()
    );
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: null,
      normalized: true,
    });
    assert.deepEqual(b, bAnswer);
  },

  testP4: function testP4() {
    var G = (0, _generators.pathGraph)(4);
    var bAnswer = new Map([
      [[0, 1], 3],
      [[1, 2], 4],
      [[2, 3], 3],
    ]);
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: null,
      normalized: false,
    });
    assert.deepEqual(b, bAnswer);
  },

  testNormalizedP4: function testNormalizedP4() {
    var G = (0, _generators.pathGraph)(4);
    var bAnswer = new Map([
      [[0, 1], 3 / 6],
      [[1, 2], 4 / 6],
      [[2, 3], 3 / 6],
    ]);
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: null,
      normalized: true,
    });
    assert.deepEqual(b, bAnswer);
  },

  testBalancedTree: function testBalancedTree() {
    var G = (0, _generators.balancedTree)(2, 2);
    var bAnswer = new Map([
      [[0, 1], 12],
      [[0, 2], 12],
      [[1, 3], 6],
      [[1, 4], 6],
      [[2, 5], 6],
      [[2, 6], 6],
    ]);
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: null,
      normalized: false,
    });
    assert.deepEqual(b, bAnswer);
  },
};

exports.testEdgeBetweennessCentrality = testEdgeBetweennessCentrality;
var testWeightedEdgeBetweennessCentrality = {
  testK5: function testK5() {
    // istanbul ignore next

    var _this4 = this;

    var G = (0, _generators.completeGraph)(5);
    var edge;
    var bAnswer = new Map(
      _regeneratorRuntime.mark(function callee$1$0() {
        var _iteratorNormalCompletion4,
          _didIteratorError4,
          _iteratorError4,
          _iterator4,
          _step4,
          _edge4;

        return _regeneratorRuntime.wrap(
          function callee$1$0$(context$2$0) {
            while (1)
              switch ((context$2$0.prev = context$2$0.next)) {
                case 0:
                  _iteratorNormalCompletion4 = true;
                  _didIteratorError4 = false;
                  _iteratorError4 = undefined;
                  context$2$0.prev = 3;
                  _iterator4 = _getIterator(G.edges());

                case 5:
                  if (
                    (_iteratorNormalCompletion4 = (_step4 = _iterator4.next())
                      .done)
                  ) {
                    context$2$0.next = 12;
                    break;
                  }

                  _edge4 = _step4.value;
                  context$2$0.next = 9;
                  return [_edge4, 1];

                case 9:
                  _iteratorNormalCompletion4 = true;
                  context$2$0.next = 5;
                  break;

                case 12:
                  context$2$0.next = 18;
                  break;

                case 14:
                  context$2$0.prev = 14;
                  context$2$0.t0 = context$2$0["catch"](3);
                  _didIteratorError4 = true;
                  _iteratorError4 = context$2$0.t0;

                case 18:
                  context$2$0.prev = 18;
                  context$2$0.prev = 19;

                  if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                    _iterator4["return"]();
                  }

                case 21:
                  context$2$0.prev = 21;

                  if (!_didIteratorError4) {
                    context$2$0.next = 24;
                    break;
                  }

                  throw _iteratorError4;

                case 24:
                  return context$2$0.finish(21);

                case 25:
                  return context$2$0.finish(18);

                case 26:
                case "end":
                  return context$2$0.stop();
              }
          },
          callee$1$0,
          _this4,
          [
            [3, 14, 18, 26],
            [19, , 21, 25],
          ]
        );
      })()
    );
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    assert.deepEqual(b, bAnswer);
  },

  testC4: function testC4() {
    // istanbul ignore next

    var _this5 = this;

    var G = (0, _generators.cycleGraph)(4);
    var edge;
    var bAnswer = new Map(
      _regeneratorRuntime.mark(function callee$1$0() {
        var _iteratorNormalCompletion5,
          _didIteratorError5,
          _iteratorError5,
          _iterator5,
          _step5,
          _edge5;

        return _regeneratorRuntime.wrap(
          function callee$1$0$(context$2$0) {
            while (1)
              switch ((context$2$0.prev = context$2$0.next)) {
                case 0:
                  _iteratorNormalCompletion5 = true;
                  _didIteratorError5 = false;
                  _iteratorError5 = undefined;
                  context$2$0.prev = 3;
                  _iterator5 = _getIterator(G.edges());

                case 5:
                  if (
                    (_iteratorNormalCompletion5 = (_step5 = _iterator5.next())
                      .done)
                  ) {
                    context$2$0.next = 12;
                    break;
                  }

                  _edge5 = _step5.value;
                  context$2$0.next = 9;
                  return [_edge5, 2];

                case 9:
                  _iteratorNormalCompletion5 = true;
                  context$2$0.next = 5;
                  break;

                case 12:
                  context$2$0.next = 18;
                  break;

                case 14:
                  context$2$0.prev = 14;
                  context$2$0.t0 = context$2$0["catch"](3);
                  _didIteratorError5 = true;
                  _iteratorError5 = context$2$0.t0;

                case 18:
                  context$2$0.prev = 18;
                  context$2$0.prev = 19;

                  if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
                    _iterator5["return"]();
                  }

                case 21:
                  context$2$0.prev = 21;

                  if (!_didIteratorError5) {
                    context$2$0.next = 24;
                    break;
                  }

                  throw _iteratorError5;

                case 24:
                  return context$2$0.finish(21);

                case 25:
                  return context$2$0.finish(18);

                case 26:
                case "end":
                  return context$2$0.stop();
              }
          },
          callee$1$0,
          _this5,
          [
            [3, 14, 18, 26],
            [19, , 21, 25],
          ]
        );
      })()
    );
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    assert.deepEqual(b, bAnswer);
  },

  testP4: function testP4() {
    var G = (0, _generators.pathGraph)(4);
    var bAnswer = new Map([
      [[0, 1], 3],
      [[1, 2], 4],
      [[2, 3], 3],
    ]);
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    assert.deepEqual(b, bAnswer);
  },

  testBalancedTree: function testBalancedTree() {
    var G = (0, _generators.balancedTree)(2, 2);
    var bAnswer = new Map([
      [[0, 1], 12],
      [[0, 2], 12],
      [[1, 3], 6],
      [[1, 4], 6],
      [[2, 5], 6],
      [[2, 6], 6],
    ]);
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    assert.deepEqual(b, bAnswer);
  },

  testWeightedGraph: function testWeightedGraph() {
    var eList = [
      [0, 1, 5],
      [0, 2, 4],
      [0, 3, 3],
      [0, 4, 2],
      [1, 2, 4],
      [1, 3, 1],
      [1, 4, 3],
      [2, 4, 5],
      [3, 4, 4],
    ];
    var G = new _classes.Graph();
    G.addWeightedEdgesFrom(eList);
    var bAnswer = new Map([
      [[0, 1], 0],
      [[0, 2], 1],
      [[0, 3], 2],
      [[0, 4], 1],
      [[1, 2], 2],
      [[1, 3], 3.5],
      [[1, 4], 1.5],
      [[2, 4], 1],
      [[3, 4], 0.5],
    ]);
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: "weight",
      normalized: false,
    });
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k));
    });
  },

  testNormalizedWeightedGraph: function testNormalizedWeightedGraph() {
    var eList = [
      [0, 1, 5],
      [0, 2, 4],
      [0, 3, 3],
      [0, 4, 2],
      [1, 2, 4],
      [1, 3, 1],
      [1, 4, 3],
      [2, 4, 5],
      [3, 4, 4],
    ];
    var G = new _classes.Graph();
    G.addWeightedEdgesFrom(eList);
    var bAnswer = new Map([
      [[0, 1], 0],
      [[0, 2], 1],
      [[0, 3], 2],
      [[0, 4], 1],
      [[1, 2], 2],
      [[1, 3], 3.5],
      [[1, 4], 1.5],
      [[2, 4], 1],
      [[3, 4], 0.5],
    ]);
    var b = (0, _betweenness.edgeBetweennessCentrality)(G, {
      weight: "weight",
      normalized: true,
    });
    var norm = (G.order() * (G.order() - 1)) / 2;
    b.forEach(function (v, k) {
      return assert.almostEqual(v, bAnswer.get(k) / norm);
    });
  },
};
exports.testWeightedEdgeBetweennessCentrality =
  testWeightedEdgeBetweennessCentrality;
