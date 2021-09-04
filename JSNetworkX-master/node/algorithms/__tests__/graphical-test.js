/*global assert*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _exceptionsJSNetworkXException = require("../../exceptions/JSNetworkXException");

var _exceptionsJSNetworkXException2 = _interopRequireDefault(
  _exceptionsJSNetworkXException
);

var _graphical = require("../graphical");

var _generatorsRandomGraphs = require("../../generators/randomGraphs");

var graphical = {
  testValidDegreeSequence1: function testValidDegreeSequence1() {
    this.timeout(5000);
    var n = 100;
    var p = 0.3;
    for (var i = 0; i < 10; i++) {
      var G = (0, _generatorsRandomGraphs.erdosRenyiGraph)(n, p);
      var deg = G.degree();
      assert.ok(
        (0, _graphical.isValidDegreeSequence)(deg.values(), /*method=*/ "eg"),
        "eg"
      );
      assert.ok(
        (0, _graphical.isValidDegreeSequence)(deg.values(), /*method=*/ "hh"),
        "hh"
      );
    }
  },

  //TODO: test_valid_degree_sequence2

  testStringInput: function testStringInput() {
    assert.throws(function () {
      return (0, _graphical.isValidDegreeSequence)([], "foo");
    }, _exceptionsJSNetworkXException2["default"]);
  },

  testNegativeInput: function testNegativeInput() {
    assert.ok(!(0, _graphical.isValidDegreeSequence)([-1], "hh"));
    assert.ok(!(0, _graphical.isValidDegreeSequence)([-1], "eg"));
    assert.ok(!(0, _graphical.isValidDegreeSequence)([72.5], "eg"));
  },

  //TODO: test_atlas

  testSmallGraphTrue: function testSmallGraphTrue() {
    var z = [5, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1];
    assert.ok((0, _graphical.isValidDegreeSequence)(z, "hh"), "hh");
    assert.ok((0, _graphical.isValidDegreeSequence)(z, "eg"), "eg");
    z = [10, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2];
    assert.ok((0, _graphical.isValidDegreeSequence)(z, "hh"), "hh");
    assert.ok((0, _graphical.isValidDegreeSequence)(z, "eg"), "eg");
    z = [1, 1, 1, 1, 1, 2, 2, 2, 3, 4];
    assert.ok((0, _graphical.isValidDegreeSequence)(z, "hh"), "hh");
    assert.ok((0, _graphical.isValidDegreeSequence)(z, "eg"), "eg");
  },

  testSmallGraphFalse: function testSmallGraphFalse() {
    var z = [1000, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1];
    assert.ok(!(0, _graphical.isValidDegreeSequence)(z, "hh"));
    assert.ok(!(0, _graphical.isValidDegreeSequence)(z, "eg"));
    z = [6, 5, 4, 4, 2, 1, 1, 1];
    assert.ok(!(0, _graphical.isValidDegreeSequence)(z, "hh"));
    assert.ok(!(0, _graphical.isValidDegreeSequence)(z, "eg"));
    z = [1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4];
    assert.ok(!(0, _graphical.isValidDegreeSequence)(z, "hh"));
    assert.ok(!(0, _graphical.isValidDegreeSequence)(z, "eg"));
  },

  // TODO: test_directed_degree_sequence
  // TODO: test_small_directed_degree_sequence
  // TODO: test_multi_sequence
  // TODO: test_pseudo_sequence
};
exports.graphical = graphical;
