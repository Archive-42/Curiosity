/*globals assert, utils*/
"use strict";

import mapIterator from "../mapIterator";

function* generator(data) {
  for (let i = 0; i < data.length; i++) {
    yield data[i];
  }
}

export const testMapIterator = () => {
  const iterator = mapIterator(generator([1, 2, 3]), (x) => x * 3);

  assert(utils.isIterator(iterator));

  const result = [];
  for (const v of iterator) {
    result.push(v);
  }
  assert.deepEqual(result, [3, 6, 9]);
};
