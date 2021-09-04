/*jshint strict:false, node:true*/
/*global assert */

import clear from "../clear";

export const testClear = {
  "emptys object": function () {
    const obj = { foo: 1, bar: 2 };
    clear(obj);
    assert.deepEqual(obj, {});
  },

  "only removes own properties": function () {
    const proto = { foo: "bar" };
    const obj = Object.create(proto);
    clear(obj);
    assert.property(obj, "foo");
  },
};
