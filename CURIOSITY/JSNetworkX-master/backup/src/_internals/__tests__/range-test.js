/*global assert*/
"use strict";

import range from "../range";

export const testRange = {
  end() {
    const r = range(5);
    assert.deepEqual(r, [0, 1, 2, 3, 4]);
  },

  "start - end": function () {
    const r = range(5, 10);
    assert.deepEqual(r, [5, 6, 7, 8, 9]);
  },

  "start - end - step": function () {
    const r = range(0, 10, 2);
    assert.deepEqual(r, [0, 2, 4, 6, 8]);
  },

  "no arguments": function () {
    const r = range();
    assert.deepEqual(r, []);
  },

  "negative step": function () {
    const r = range(10, 5, -1);
    assert.deepEqual(r, [10, 9, 8, 7, 6]);
  },
};
