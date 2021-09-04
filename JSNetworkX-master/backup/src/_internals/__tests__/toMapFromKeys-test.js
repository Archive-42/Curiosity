/*global assert */
"use strict";

/*jshint ignore:start*/
import Map from "../Map";
/*jshint ignore:end*/
import toMapFromKeys from "../toMapFromKeys";

export const testToMapFromKeys = {
  "without default value (null)": function () {
    const keys = ["foo", "bar", "baz"];
    assert.deepEqual(
      toMapFromKeys(keys),
      new Map({ foo: null, bar: null, baz: null })
    );
  },

  "with default value": function () {
    const keys = ["foo", "bar", "baz"];
    assert.deepEqual(
      toMapFromKeys(keys, 42),
      new Map({ foo: 42, bar: 42, baz: 42 })
    );
  },
};
