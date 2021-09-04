/*global assert*/
"use strict";

var _interopRequireWildcard =
  require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _classes = require("../../../classes");

var _isomorph = require("../isomorph");

var iso = _interopRequireWildcard(_isomorph);

var testIsomorph = {
  beforeEach: function beforeEach() {
    this.G1 = new _classes.Graph();
    this.G2 = new _classes.Graph();
    this.G3 = new _classes.Graph();
    this.G4 = new _classes.Graph();
    this.G1.addEdgesFrom([
      [1, 2],
      [1, 3],
      [1, 5],
      [2, 3],
    ]);
    this.G2.addEdgesFrom([
      [10, 20],
      [20, 30],
      [10, 30],
      [10, 50],
    ]);
    this.G3.addEdgesFrom([
      [1, 2],
      [1, 3],
      [1, 5],
      [2, 5],
    ]);
    this.G4.addEdgesFrom([
      [1, 2],
      [1, 3],
      [1, 5],
      [2, 4],
    ]);
  },

  testCouldBeIsomorphic: function testCouldBeIsomorphic() {
    assert(iso.couldBeIsomorphic(this.G1, this.G2));
    assert(iso.couldBeIsomorphic(this.G1, this.G3));
    assert(!iso.couldBeIsomorphic(this.G1, this.G4));
    assert(iso.couldBeIsomorphic(this.G3, this.G2));
  },

  testFastCouldBeIsomorphic: function testFastCouldBeIsomorphic() {
    assert(iso.fastCouldBeIsomorphic(this.G3, this.G2));
  },

  testFasterCouldBeIsomorphic: function testFasterCouldBeIsomorphic() {
    assert(iso.fasterCouldBeIsomorphic(this.G3, this.G2));
  },

  // TODO
  /*
  testIsIsomorphic: function() {
    assert(iso.isIsomorphic(this.G1, this.G2));
    assert(iso.isIsomorphic(this.G1, this.G4));
  },
  */
};
exports.testIsomorph = testIsomorph;
