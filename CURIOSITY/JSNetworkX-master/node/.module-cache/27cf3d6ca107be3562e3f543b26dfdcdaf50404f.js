/* global assert*/
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _randomGraphs = require("../randomGraphs");

var randomGraphs = {
  // TODO: smoke_test_random_graph
  // TODO: test_random_zero_regular_graph

  testGnp: function testGnp() {
    this.timeout(5000);
    var generators = [
      _randomGraphs.gnpRandomGraph,
      _randomGraphs.binomialGraph,
      _randomGraphs.erdosRenyiGraph,
      _randomGraphs.fastGnpRandomGraph,
    ];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = _getIterator(generators), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        var generator = _step.value;

        var G = generator(10, -1.1);
        assert.equal(G.numberOfNodes(), 10);
        assert.equal(G.numberOfEdges(), 0);

        G = generator(10, 0.1);
        assert.equal(G.numberOfNodes(), 10);

        G = generator(10, 1.1);
        assert.equal(G.numberOfNodes(), 10);
        assert.equal(G.numberOfEdges(), 45);

        G = generator(10, -1.1, true);
        assert(G.isDirected());
        assert.equal(G.numberOfNodes(), 10);
        assert.equal(G.numberOfEdges(), 0);

        G = generator(10, 0.1, true);
        assert(G.isDirected());
        assert.equal(G.numberOfNodes(), 10);

        G = generator(10, 1.1, true);
        assert(G.isDirected());
        assert.equal(G.numberOfNodes(), 10);
        assert.equal(G.numberOfEdges(), 90);

        // assert that random graphs generate all edges for p close to 1
        var edges = 0;
        var runs = 100;
        for (var i = 0; i < runs; i++) {
          edges += generator(10, 0.99999, true).numberOfEdges();
        }
        assert.closeTo(edges / runs, 90, (runs * 2) / 100, generator.name);
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
  },

  // TODO: test_gnm
  // TODO: test_watts_strogatz_big_k
};
exports.randomGraphs = randomGraphs;
