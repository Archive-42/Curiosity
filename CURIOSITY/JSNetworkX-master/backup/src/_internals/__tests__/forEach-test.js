/*global assert */
"use strict";

import Map from "../Map";
import forEach from "../forEach";

function* generator(data) {
  for (let i = 0; i < data.length; i++) {
    yield data[i];
  }
}

export const testForEach = {
  "over arrays": function () {
    const data = [1, 2, 3];
    let counter = 0;
    forEach(data, (v) => {
      assert.equal(v, data[counter++]);
    });
    assert.equal(counter, data.length, "iterated over all data");
  },

  "over iterables (e.g. Maps)": function () {
    const data = [
      [1, 2],
      [2, 3],
    ];
    const map = new Map(data);
    let counter = 0;
    forEach(map, (kv) => {
      assert.deepEqual(kv, data[counter++]);
    });
    assert.equal(counter, data.length, "iterated over all data");
  },

  "over iterators (e.g. from a generator)": function () {
    const data = [1, 2, 3];
    const iterator = generator(data);
    let counter = 0;
    forEach(iterator, (v) => {
      assert.equal(v, data[counter++]);
    });
    assert.equal(counter, data.length, "iterated over all data");
  },

  "over objects (iterates over keys)": function () {
    const data = { foo: 0, bar: 1 };
    const result = [];
    forEach(data, (v, k) => {
      result.push([k, v]);
    });
    assert.deepEqual(
      result,
      [
        ["foo", 0],
        ["bar", 1],
      ],
      "iterated over all data"
    );
  },

  // TODO
  "over graphs": false,
};
