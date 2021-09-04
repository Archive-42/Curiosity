/*global assert*/
"use strict";

import nodesAreEqual from "../nodesAreEqual";

export const testNodesAreEqual = {
  equal() {
    assert.ok(nodesAreEqual(42, 42));
    assert.ok(nodesAreEqual("foo", "foo"));

    assert.ok(nodesAreEqual([1, 2, 3], [1, 2, 3]));
    const foo = { toString: () => "42" };
    const bar = { toString: () => "42" };
    assert.ok(nodesAreEqual(foo, bar));
  },

  "not equal": function () {
    assert.ok(!nodesAreEqual(1, 2));
    assert.ok(!nodesAreEqual(42, "42"));
  },
};
