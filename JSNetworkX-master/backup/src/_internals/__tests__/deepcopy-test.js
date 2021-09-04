/*global assert */
"use strict";

import deepcopy from "../deepcopy";
import Map from "../Map";

export const testDeepcopy = {
  "it deep copies normal objects and arrays": function () {
    const foo = [1, 2];
    const obj = {
      foo: foo,
      bar: ["bar", foo],
    };

    const copy = deepcopy(obj);
    assert.deepEqualIdent(copy, obj);
  },

  "it deep copies maps": function () {
    const foo = [1, 2, 3];
    const bar = new Map([
      [1, foo],
      [2, foo],
    ]);
    const map = new Map([
      [1, foo],
      [2, bar],
    ]);

    const copy = deepcopy(map);
    assert.notEqual(map, copy);
    assert.strictEqual(map.get(1), map.get(2).get(1));
  },
};
