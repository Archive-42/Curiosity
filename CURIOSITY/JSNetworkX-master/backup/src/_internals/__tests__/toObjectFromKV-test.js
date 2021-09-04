/*global assert*/
"use strict";

import toObjectFromKV from "../toObjectFromKV";

export const testToObjectFromKV = {
  "generate object from array of pairs": function () {
    const obj = toObjectFromKV([
      ["foo", 5],
      [10, [1, 2]],
    ]);
    assert.deepEqual(obj, { foo: 5, 10: [1, 2] });
  },

  "generate empty object from empty array": function () {
    const obj = toObjectFromKV([]);
    assert.deepEqual(obj, {});
  },
};
