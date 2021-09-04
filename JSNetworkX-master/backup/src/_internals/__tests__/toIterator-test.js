/*global assert, utils*/
"use strict";

import toIterator from "../toIterator";

function* generator() {
  yield 0;
}

export const testToIterator = {
  "from iterator (identity)": function () {
    const iterator = generator();
    assert.strictEqual(toIterator(iterator), iterator);
  },

  "from iterable (e.g. Map)": function () {
    const data = [
      [1, 2],
      [3, 4],
    ];
    const map = new utils.Map(data);

    const iterator = toIterator(map);
    assert(utils.isIterator(iterator));

    assert.deepEqual(Array.from(iterator), data);
  },

  "from graph": false, // TODO

  "from array-like object": function () {
    const data = [1, 2, 3];
    const iterator = toIterator(data);

    assert(utils.isIterator(iterator));
    assert.deepEqual(Array.from(iterator), data);
  },
};
