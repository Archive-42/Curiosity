/*global assert */
"use strict";

import toObjectFromKeys from "../toObjectFromKeys";

export const testToObjectFromKeys = {
  "without default value (null)": function () {
    const keys = ["foo", "bar", "baz"];
    assert.deepEqual(toObjectFromKeys(keys), {
      foo: null,
      bar: null,
      baz: null,
    });
  },

  "with default value": function () {
    const keys = ["foo", "bar", "baz"];
    assert.deepEqual(toObjectFromKeys(keys, 42), { foo: 42, bar: 42, baz: 42 });
  },
};
