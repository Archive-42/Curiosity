/*global assert*/
"use strict";

var _Promise = require("babel-runtime/core-js/promise")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _emitter = require("../emitter");

var _emitter2 = _interopRequireDefault(_emitter);

function onHelper(obj, type, callback) {
  var resolve;
  var promise = new _Promise(function (res) {
    resolve = res;
  });

  obj.on(type, function (x) {
    return callback && callback(x), resolve(x);
  });
  return promise;
}

var testEmitter = {
  API: function API() {
    var ee = (0, _emitter2["default"])();
    assert.isFunction(ee.on);
    assert.isFunction(ee.off);
    assert.isFunction(ee.emit);

    var obj = {};
    var emit = (0, _emitter2["default"])(obj);
    assert.isFunction(emit);
    assert.isFunction(obj.on);
    assert.isFunction(obj.off);
  },

  "on/emit": function onEmit() {
    var obj = {};
    var emit = (0, _emitter2["default"])(obj);

    var promises = [];

    promises.push(assert.becomes(onHelper(obj, "foo"), "bar"));
    emit("foo", "bar");

    promises.push(assert.becomes(onHelper(obj, "bar"), "abc"));
    promises.push(assert.becomes(onHelper(obj, "bar"), "abc"));
    emit("bar", "abc");

    return _Promise.all(promises);
  },
};
exports.testEmitter = testEmitter;
