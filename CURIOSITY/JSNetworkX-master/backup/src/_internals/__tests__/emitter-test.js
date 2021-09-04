/*global assert*/
"use strict";

import emitter from "../emitter";

function onHelper(obj, type, callback) {
  let resolve;
  const promise = new Promise((res) => {
    resolve = res;
  });

  obj.on(type, (x) => (callback && callback(x), resolve(x)));
  return promise;
}

export const testEmitter = {
  API() {
    const ee = emitter();
    assert.isFunction(ee.on);
    assert.isFunction(ee.off);
    assert.isFunction(ee.emit);

    const obj = {};
    const emit = emitter(obj);
    assert.isFunction(emit);
    assert.isFunction(obj.on);
    assert.isFunction(obj.off);
  },

  "on/emit": function () {
    const obj = {};
    const emit = emitter(obj);

    const promises = [];

    promises.push(assert.becomes(onHelper(obj, "foo"), "bar"));
    emit("foo", "bar");

    promises.push(assert.becomes(onHelper(obj, "bar"), "abc"));
    promises.push(assert.becomes(onHelper(obj, "bar"), "abc"));
    emit("bar", "abc");

    return Promise.all(promises);
  },
};
