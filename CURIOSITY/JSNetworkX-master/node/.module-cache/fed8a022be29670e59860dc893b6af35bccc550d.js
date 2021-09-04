/*global assert */
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _deepcopy = require("../deepcopy");

var _deepcopy2 = _interopRequireDefault(_deepcopy);

var _Map = require("../Map");

var _Map2 = _interopRequireDefault(_Map);

var testDeepcopy = {
  "it deep copies normal objects and arrays":
    function itDeepCopiesNormalObjectsAndArrays() {
      var foo = [1, 2];
      var obj = {
        foo: foo,
        bar: ["bar", foo],
      };

      var copy = (0, _deepcopy2["default"])(obj);
      assert.deepEqualIdent(copy, obj);
    },

  "it deep copies maps": function itDeepCopiesMaps() {
    var foo = [1, 2, 3];
    var bar = new _Map2["default"]([
      [1, foo],
      [2, foo],
    ]);
    var map = new _Map2["default"]([
      [1, foo],
      [2, bar],
    ]);

    var copy = (0, _deepcopy2["default"])(map);
    assert.notEqual(map, copy);
    assert.strictEqual(map.get(1), map.get(2).get(1));
  },
};
exports.testDeepcopy = testDeepcopy;
