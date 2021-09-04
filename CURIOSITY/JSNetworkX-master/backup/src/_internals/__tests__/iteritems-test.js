/*global utils, assert*/
"use strict";

import iteritems from "../iteritems";

export const testIteritems = () => {
  const obj = { foo: 5, bar: [1, 2], 5: 42 };
  const iter = iteritems(obj);
  assert(utils.isIterator(iter));
  assert.sameMembersDeep(Array.from(iter), [
    ["5", 42],
    ["bar", [1, 2]],
    ["foo", 5],
  ]);
};
