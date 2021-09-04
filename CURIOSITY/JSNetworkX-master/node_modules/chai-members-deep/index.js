/*jshint node:true*/
"use strict";

var deepEqualIdentChai = require('deep-equal-ident/chai');

function extendChai(chai) {
  var Assertion = chai.Assertion;
  var assert = chai.assert;

  // Add deep-equal-ident extension
  chai.use(deepEqualIdentChai);

  // expect interface already works without changes

  // assert interface
  /**
   * Same as `assert.sameMembers`, but uses deep equality for member comparison
   */
  assert.sameMembersDeep = function(set1, set2, msg) {
    new Assertion(set1, msg).to.have.same.deep.members(set2);
  };

  /**
   * Same as `assert.includeMembers`, but uses deep equality for member
   * comparison
   */
  assert.includeMembersDeep = function(set1, set2, msg) {
    new Assertion(set1, msg).to.include.deep.members(set2);
  };

  /**
   * Same as `assert.sameMembersDeep`, but uses deep-equal-ident for member
   * comparison.
   */
  assert.sameMembersDeepIdent = function(set1, set2, msg) {
    new Assertion(set1, msg).to.have.same.identically.deep.members(set2);
  };

  /**
   * Same as `assert.includeMembersDeep`, but uses deep-equal-ident for member
   * comparison.
   */
  assert.includeMembersDeepIdent = function(set1, set2, msg) {
    new Assertion(set1, msg).to.identically.include.deep.members(set2);
  };

}

module.exports = extendChai;
