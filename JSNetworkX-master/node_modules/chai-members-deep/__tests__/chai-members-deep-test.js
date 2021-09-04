/*jshint node:true*/
/*global jest, describe, it, expect*/
"use strict";

jest.autoMockOff();
var chai = require('chai');
var assert = chai.assert;
chai.use(require('../index'));


describe('chai-members-deep assert interface', function() {
  describe('assert.sameMembersDeep', function() {
    it('uses deep comparison', function() {
      expect(function() {
        assert.sameMembersDeep([[1,2,3]], [[1,2,3]]);
      }).not.toThrow();
    });

    it('does not use deep comparison', function() {
      expect(function() {
        var a = [1];
        assert.sameMembersDeep([[a,a]], [[a,[1]]]);
      }).not.toThrow();
    });
  });

  describe('assert.includeMembersDeep', function() {
    it('uses deep comparison', function() {
      expect(function() {
        assert.includeMembersDeep([1,2,3], [3]);
      }).not.toThrow();
    });

    it('does not use deep comparison', function() {
      expect(function() {
        var a = [1];
        assert.includeMembersDeep([a,a], [a]);
      }).not.toThrow();
    });
  });

  describe('assert.sameMembersDeepIdent', function() {
    it('uses deep identical comparison', function() {
      expect(function() {
        var a = [1];
        assert.sameMembersDeep([[a,a]], [[a,[1]],1,2]);
      }).toThrow();
    });
  });

  describe('assert.includeMembersDeep', function() {
    it('uses deep identical comparison', function() {
      expect(function() {
        var a = [1];
        assert.sameMembersDeep([[a,a]], [[a,[1]],1,2]);
      }).toThrow();
    });
  });
});
