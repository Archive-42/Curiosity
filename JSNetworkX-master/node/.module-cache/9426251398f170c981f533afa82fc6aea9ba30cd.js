/*global assert, utils*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _relabel = require("../../relabel");

var _generators = require("../../generators");

var _clique = require("../clique");

var clique = {
  beforeEach: function beforeEach() {
    var z = [3, 4, 3, 4, 2, 4, 2, 1, 1, 1, 1];
    this.G = (0, _relabel.convertNodeLabelsToIntegers)(
      (0, _generators.havelHakimiGraph)(z),
      1
    );
    this.cl = _Array$from((0, _clique.findCliques)(this.G));
    var H = (0, _generators.completeGraph)(6);
    H = (0, _relabel.relabelNodes)(H, { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 });
    H.removeEdgesFrom([
      [2, 6],
      [2, 5],
      [2, 4],
      [1, 3],
      [5, 3],
    ]);
    this.H = H;
  },

  testFindCliques1: function testFindCliques1() {
    var cl = _Array$from((0, _clique.findCliques)(this.G));
    var rcl = _Array$from((0, _clique.findCliquesRecursive)(this.G));

    assert.deepEqual(
      cl
        .map(function (v) {
          return v.sort();
        })
        .sort(),
      rcl
        .map(function (v) {
          return v.sort();
        })
        .sort()
    );

    var expected = [
      [2, 6, 1, 3],
      [2, 6, 4],
      [5, 4, 7],
      [8, 9],
      [10, 11],
    ];
    assert.deepEqual(
      cl
        .map(function (v) {
          return v.sort();
        })
        .sort(),
      expected
        .map(function (v) {
          return v.sort();
        })
        .sort()
    );
  },

  testSelfloops: function testSelfloops() {
    this.G.addEdge(1, 1);
    var cl = _Array$from((0, _clique.findCliques)(this.G));
    var rcl = _Array$from((0, _clique.findCliquesRecursive)(this.G));

    assert.deepEqual(
      cl
        .map(function (v) {
          return v.sort();
        })
        .sort(),
      rcl
        .map(function (v) {
          return v.sort();
        })
        .sort()
    );

    var expected = [
      [2, 6, 1, 3],
      [2, 6, 4],
      [5, 4, 7],
      [8, 9],
      [10, 11],
    ];
    assert.deepEqual(
      cl
        .map(function (v) {
          return v.sort();
        })
        .sort(),
      expected
        .map(function (v) {
          return v.sort();
        })
        .sort()
    );
  },

  testFindCliques2: function testFindCliques2() {
    var hcl = _Array$from((0, _clique.findCliques)(this.H));

    assert.deepEqual(
      hcl
        .map(function (v) {
          return v.sort();
        })
        .sort(),
      [
        [1, 2],
        [1, 4, 5, 6],
        [2, 3],
        [3, 4, 6],
      ]
    );
  },

  testCliqueNumber: function testCliqueNumber() {
    assert.equal((0, _clique.graphCliqueNumber)(this.G), 4);
    assert.equal((0, _clique.graphCliqueNumber)(this.G, this.cl), 4);
  },

  testNumberOfCliques: function testNumberOfCliques() {
    var G = this.G;
    assert.equal((0, _clique.graphNumberOfCliques)(G), 5);
    assert.equal((0, _clique.graphNumberOfCliques)(G, this.cl), 5);
    assert.equal((0, _clique.numberOfCliques)(G, 1), 1);
    assert.deepEqual(
      (0, _clique.numberOfCliques)(G, [1]),
      new utils.Map({ 1: 1 })
    );
    assert.deepEqual(
      (0, _clique.numberOfCliques)(G, [1, 2]),
      new utils.Map({ 1: 1, 2: 2 })
    );
    assert.deepEqual((0, _clique.numberOfCliques)(G, 2), 2);

    assert.deepEqual(
      (0, _clique.numberOfCliques)(G),
      new utils.Map({
        1: 1,
        2: 2,
        3: 1,
        4: 2,
        5: 1,
        6: 2,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
      })
    );

    assert.deepEqual(
      (0, _clique.numberOfCliques)(G, G.nodes()),
      new utils.Map({
        1: 1,
        2: 2,
        3: 1,
        4: 2,
        5: 1,
        6: 2,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
      })
    );

    assert.deepEqual(
      (0, _clique.numberOfCliques)(G, [2, 3, 4]),
      new utils.Map({ 2: 2, 3: 1, 4: 2 })
    );

    assert.deepEqual(
      (0, _clique.numberOfCliques)(G, null, this.cl),
      new utils.Map({
        1: 1,
        2: 2,
        3: 1,
        4: 2,
        5: 1,
        6: 2,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
      })
    );

    assert.deepEqual(
      (0, _clique.numberOfCliques)(G, G.nodes(), this.cl),
      new utils.Map({
        1: 1,
        2: 2,
        3: 1,
        4: 2,
        5: 1,
        6: 2,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
      })
    );
  },

  //TODO: test_node_clique_number
  //TODO: test_cliques_containing_node
  //TODO: test_make_clique_bipartite
};
exports.clique = clique;
