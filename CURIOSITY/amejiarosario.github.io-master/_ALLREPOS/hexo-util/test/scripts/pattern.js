'use strict';

var should = require('chai').should(); // eslint-disable-line

describe('Pattern', function() {
  var Pattern = require('../../lib/pattern');

  it('String - posts/:id', function() {
    var pattern = new Pattern('posts/:id');
    var result = pattern.match('/posts/89');

    result.should.eql({
      0: 'posts/89',
      1: '89',
      id: '89'
    });
  });

  it('String - posts/*path', function() {
    var pattern = new Pattern('posts/*path');
    var result = pattern.match('posts/2013/hello-world');

    result.should.eql({
      0: 'posts/2013/hello-world',
      1: '2013/hello-world',
      path: '2013/hello-world'
    });
  });

  it('String - posts/:id?', function() {
    var pattern = new Pattern('posts/:id?');

    pattern.match('posts/').should.eql({
      0: 'posts/',
      1: undefined,
      id: undefined
    });

    pattern.match('posts/89').should.eql({
      0: 'posts/89',
      1: '89',
      id: '89'
    });
  });

  it('RegExp', function() {
    var pattern = new Pattern(/ab?cd/);

    pattern.match('abcd').should.be.ok;
    pattern.match('acd').should.be.ok;
  });

  it('Function', function() {
    var pattern = new Pattern(function(str) {
      str.should.eql('foo');
      return {};
    });

    pattern.match('foo').should.eql({});
  });

  it('rule is required', function() {
    try {
      new Pattern();
    } catch (err) {
      err.should.have.property('message', 'rule must be a function, a string or a regular expression.');
    }
  });
});
