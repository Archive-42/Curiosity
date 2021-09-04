/*global assert*/
"use strict";

import mapSequence from "../mapSequence";

function* generator(data) {
  for (let i = 0; i < data.length; i++) {
    yield data[i];
  }
}

export const testMapSequence = {
  "from array": function () {
    assert.deepEqual(
      mapSequence([1, 2, 3], (x) => x * 3),
      [3, 6, 9]
    );
  },

  "from array-like": function () {
    assert.deepEqual(
      mapSequence({ 0: 1, 1: 2, 2: 3, length: 3 }, (x) => x * 3),
      [3, 6, 9]
    );
  },

  "from iterator": function () {
    const iterator = mapSequence(generator([1, 2, 3]), (x) => x * 3);
    const result = [];
    for (const v of iterator) {
      result.push(v);
    }
    assert.deepEqual(result, [3, 6, 9]);
  },

  "from object": function () {
    assert.deepEqual(
      mapSequence({ foo: 1, bar: 2 }, (x) => x * 3),
      { foo: 3, bar: 6 }
    );
  },
};
