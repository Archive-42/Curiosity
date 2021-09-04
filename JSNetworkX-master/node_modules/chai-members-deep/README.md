## chai-members-deep [![Build Status](https://travis-ci.org/fkling/chai-members-deep.svg?branch=master)](https://travis-ci.org/fkling/chai-members-deep)

This extends chai.js with deep equality member checks, optionally also tracking
the identity of nested objects (see [`deep-equal-ident`](https://github.com/fkling/deep-equal-ident))
for more info on that.

### Install

    npm install chai-members-deep

### Usage

    chai.use(require('chai-members-deep'));

The `require` and `should` interfaces already provided the ability to test for
members with the `deep` flag. This extensions adds the equivalent methods to the 
`assert` interface:

```javascript
assert.sameMembersDeep(a, b);
assert.sameMembersDeepIdent(a, b);
assert.includeMembersDeep(a, b);
assert.includeMembersDeepIdent(a, b);
```

Since it uses the chai extension of `deep-equal-ident`, it also includes

```javascript
expect(a).to.identically.deep.equal(b);
assert.deepEqualIdent(a, b);
```
