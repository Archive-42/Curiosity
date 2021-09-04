/*global assert, sinon */
"use strict";

import delegate from "../delegateSync";
import WorkerSettings from "../../WorkerSettings";

export const testDelegateSync = {
  beforeEach() {
    this.testFunction = sinon.spy();
    WorkerSettings.methodLookupFunction = (name) => this[name];
  },

  "it returns a promise": function () {
    const promise = delegate("testFunction");
    return assert.isFunction(promise.then);
  },

  "it passes the arguments to the delegated function": function (done) {
    const promise = delegate("testFunction", ["foo", "bar"]);
    promise.then(() => {
      assert(this.testFunction.calledWith("foo", "bar"));
      done();
    });
  },

  "it resolves to the return value of the delegated function": function () {
    this.testFunction = () => {
      return "foo";
    };
    const promise = delegate("testFunction", ["foo", "bar"]);
    return assert.becomes(promise, "foo");
  },

  "it rejects if the delegated function throws an error": function () {
    this.testFunction = () => {
      throw new Error("some error");
    };
    const promise = delegate("testFunction", ["foo", "bar"]);
    return assert.isRejected(promise, "some error");
  },
};
