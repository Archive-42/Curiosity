/*global assert*/
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Map = require("babel-runtime/core-js/map")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _eigenvector = require("../eigenvector");

var _classes = require("../../../classes");

var _generators = require("../../../generators");

var testEigenvectorCentrality = {
  testK5: function testK5() {
    var G = (0, _generators.completeGraph)(5);
    var result = (0, _eigenvector.eigenvectorCentrality)(G);
    var v = Math.sqrt(1 / 5);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = _getIterator(G), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        var n = _step.value;

        assert.almostEqual(result.get(n), v);
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

    var nstart = new _Map();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (
        var _iterator2 = _getIterator(G), _step2;
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        _iteratorNormalCompletion2 = true
      ) {
        var n = _step2.value;

        nstart.set(n, 1);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    result = (0, _eigenvector.eigenvectorCentrality)(G, { nstart: nstart });
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (
        var _iterator3 = _getIterator(G), _step3;
        !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
        _iteratorNormalCompletion3 = true
      ) {
        var n = _step3.value;

        assert.almostEqual(result.get(n), v);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  },

  // Doesn't converge, but the Python implementation doesn't either
  // (it uses numpy)
  /*
  testP3() {
    let G = pathGraph(3);
    let answer = new Map([[0, 0.5], [1, 0.7071], [2, 0.5]]);
    let result = eigenvectorCentrality(G);
    for (let n in G) {
      assert.almostEqual(result.get(n), answer.get(n), 4);
    }
  },
   testP3Unweighted() {
   },
  */

  testMaxIter: function testMaxIter() {
    assert.throws(function () {
      return (0,
      _eigenvector.eigenvectorCentrality)((0, _generators.pathGraph)(3), { maxIter: 0 });
    });
  },
};

exports.testEigenvectorCentrality = testEigenvectorCentrality;
var testEigenvectorCentralityDirected = {
  beforeEach: function beforeEach() {
    var G = new _classes.DiGraph();
    var edges = [
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 2],
      [3, 5],
      [4, 2],
      [4, 5],
      [4, 6],
      [5, 6],
      [5, 7],
      [5, 8],
      [6, 8],
      [7, 1],
      [7, 5],
      [7, 8],
      [8, 6],
      [8, 7],
    ];
    G.addEdgesFrom(edges, { weight: 2 });
    this.G = G.reverse();
    this.G.evc = new _Map([
      [1, 0.25368793],
      [2, 0.19576478],
      [3, 0.32817092],
      [4, 0.40430835],
      [5, 0.48199885],
      [6, 0.15724483],
      [7, 0.51346196],
      [8, 0.32475403],
    ]);

    var H = new _classes.DiGraph();
    edges = [
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 2],
      [3, 5],
      [4, 2],
      [4, 5],
      [4, 6],
      [5, 6],
      [5, 7],
      [5, 8],
      [6, 8],
      [7, 1],
      [7, 5],
      [7, 8],
      [8, 6],
      [8, 7],
    ];
    H.addEdgesFrom(edges);
    this.H = H.reverse();
    this.H.evc = new _Map([
      [1, 0.25368793],
      [2, 0.19576478],
      [3, 0.32817092],
      [4, 0.40430835],
      [5, 0.48199885],
      [6, 0.15724483],
      [7, 0.51346196],
      [8, 0.32475403],
    ]);
  },

  testEigenvectorCentralityWeighted:
    function testEigenvectorCentralityWeighted() {
      var result = (0, _eigenvector.eigenvectorCentrality)(this.G);
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (
          var _iterator4 = _getIterator(this.G), _step4;
          !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
          _iteratorNormalCompletion4 = true
        ) {
          var n = _step4.value;

          assert.almostEqual(result.get(n), this.G.evc.get(n));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    },

  testEigenvectorCentralityUnWeighted:
    function testEigenvectorCentralityUnWeighted() {
      var result = (0, _eigenvector.eigenvectorCentrality)(this.H);
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (
          var _iterator5 = _getIterator(this.H), _step5;
          !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
          _iteratorNormalCompletion5 = true
        ) {
          var n = _step5.value;

          assert.almostEqual(result.get(n), this.H.evc.get(n));
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    },
};

exports.testEigenvectorCentralityDirected = testEigenvectorCentralityDirected;
var testEigenvectorCentralityExceptions = {
  testMultigraph: function testMultigraph() {
    assert.throws(function () {
      return (0, _eigenvector.eigenvectorCentrality)(new _classes.MultiGraph());
    });
  },

  testEmpty: function testEmpty() {
    assert.throws(function () {
      return (0, _eigenvector.eigenvectorCentrality)(new _classes.DiGraph());
    });
  },
};
exports.testEigenvectorCentralityExceptions =
  testEigenvectorCentralityExceptions;
