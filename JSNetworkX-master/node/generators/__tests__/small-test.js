/*global assert*/
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _algorithms = require("../../algorithms");

var _small = require("../small");

var testGeneratorSmall = {
  testMakeSmallGraph: function testMakeSmallGraph() {
    var d = {
      type: "adjacencylist",
      name: "Bull Graph",
      n: 5,
      list: [[2, 3], [1, 3, 4], [1, 2, 5], [2], [3]],
    };
    var G = (0, _small.makeSmallGraph)(d);
    assert.ok((0, _algorithms.couldBeIsomorphic)(G, (0, _small.bullGraph)()));
  },

  testPropertiesNamedSmallGraphs: function testPropertiesNamedSmallGraphs() {
    var G = (0, _small.bullGraph)();
    assert.equal(G.numberOfNodes(), 5);
    assert.equal(G.numberOfEdges(), 5);
    var d = _Array$from(G.degree().values()).sort();
    assert.deepEqual(d, [1, 1, 2, 3, 3]);

    // TODO: expect(diameter(G)).toBe(3)
    // TODO: expect(radius(G)).toBe(2)

    // TODO: chvatal_graph
    // TODO: cubical_graph
    // TODO: desargues_graph
    // TODO: diamond_graph
    // TODO: dodecahedral_graph
    // TODO: frucht_graph
    // TODO: heawood_graph
    // TODO: house_graph
    // TODO: house_x_graph
    // TODO: icosahedral_graph
    // TODO: moebius_kantor_graph
    // TODO: octahedral_graph

    G = (0, _small.krackhardtKiteGraph)();
    assert.equal(G.numberOfNodes(), 10);
    assert.equal(G.numberOfEdges(), 18);
    d = _Array$from(G.degree().values()).sort();
    assert.deepEqual(d, [1, 2, 3, 3, 3, 4, 4, 5, 5, 6]);

    // TODO: pappus_graph
    // TODO: petersen_graph
    // TODO: sedgewick_maze_graph
    // TODO: tetrahedral_graph
    // TODO: truncated_cube_graph
    // TODO: truncated_tetrahedron_graph
    // TODO: tutte_graph
  },
};
exports.testGeneratorSmall = testGeneratorSmall;
