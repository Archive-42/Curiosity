/*global assert*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _classes = require("../../classes");

var _exceptionsJSNetworkXError = require("../../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

var _degreeSequence = require("../degreeSequence");

var degreeSequence = {
  // TODO: test_configuration_model_empty
  // TODO: test_configuration_model
  // TODO: test_configuration_raise
  // TODO: test_configuration_raise_odd
  // TODO: test_directed_configuration_raise_unequal
  // TODO: test_directed_configuration_mode
  // TODO: test_expected_degree_graph_empty
  // TODO: test_expected_degree_graph
  // TODO: test_expected_degree_graph_selfloops
  // TODO: test_expected_degree_graph_skew

  testHavelHakimiConstruction: function testHavelHakimiConstruction() {
    var G = (0, _degreeSequence.havelHakimiGraph)([]);
    assert.equal(G.numberOfNodes(), 0);

    var z = [1000, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1];
    assert.throws(function () {
      return (0, _degreeSequence.havelHakimiGraph)(z);
    }, _exceptionsJSNetworkXError2["default"]);

    z = ["A", 3, 3, 3, 3, 2, 2, 2, 1, 1, 1];
    assert.throws(function () {
      return (0, _degreeSequence.havelHakimiGraph)(z);
    }, _exceptionsJSNetworkXError2["default"]);

    z = [5, 4, 3, 3, 3, 2, 2, 2];
    assert.doesNotThrow(function () {
      return (0, _degreeSequence.havelHakimiGraph)(z);
    });
    //TODO: G = jsnx.configuration_model(z);

    z = [6, 5, 4, 4, 2, 1, 1, 1];
    assert.throws(function () {
      return (0, _degreeSequence.havelHakimiGraph)(z);
    }, _exceptionsJSNetworkXError2["default"]);

    z = [10, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2];
    assert.doesNotThrow(function () {
      return (0, _degreeSequence.havelHakimiGraph)(z);
    });

    assert.throws(function () {
      return (0, _degreeSequence.havelHakimiGraph)(z, new _classes.DiGraph());
    }, _exceptionsJSNetworkXError2["default"]);
  },

  // TODO: test_directed_havel_hakimi
  // TODO: test_degree_sequence_tree
  // TODO: test_random_degree_sequence_graph
  // TODO: test_random_degree_sequence_graph_raise
  // TODO: test_random_degree_sequence_large
};
exports.degreeSequence = degreeSequence;
