/*jshint strict:false, node:true*/
/*global assert */

import size from "../size";

export const testSize = {
  "of array": function () {
    const data = [1, 2, 3];
    assert.equal(size(data), data.length);
  },

  "of array-like object": function () {
    const obj = { length: 10 };
    assert.equal(size(obj), obj.length);
  },

  "of string": function () {
    const str = "foobar";
    assert.equal(size(str), str.length);
  },

  "of object (number of properties)": function () {
    const obj = { foo: 42, bar: 42 };
    assert.equal(size(obj), Object.keys(obj).length);
  },

  "of graph": false, //TODO
};
