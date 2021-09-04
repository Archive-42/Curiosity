/*global assert, utils*/
"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")[
  "default"
];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _message = require("../message");

var _classes = require("../../classes");

var _utils = utils;
var Map = _utils.Map;
var Set = _utils.Set;

function convert(v) {
  return (0, _message.deserialize)((0, _message.serialize)(v));
}

function graph() {
  var edges = [
    [1, 2],
    [2, 3],
  ];
  var data = { foo: "bar" };
  return new _classes.Graph(edges, data);
}

var testMessage = {
  isSupported: function isSupported() {
    // primitives
    assert.ok((0, _message.isSupported)(null));
    assert.ok((0, _message.isSupported)(undefined));
    assert.ok((0, _message.isSupported)("foo"));
    assert.ok((0, _message.isSupported)(42));
    assert.ok((0, _message.isSupported)(false));

    // plain objects, and arrays
    assert.ok((0, _message.isSupported)({ foo: "bar" }));
    assert.ok((0, _message.isSupported)([1, 2, 3]));

    // Maps, Sets
    assert.ok((0, _message.isSupported)(new Map({ foo: "bar" })));
    assert.ok((0, _message.isSupported)(new Set([1, 2, 3])));

    // Graphs
    assert.ok((0, _message.isSupported)(new _classes.Graph()));
    assert.ok((0, _message.isSupported)(new _classes.DiGraph()));

    // Custom classes not supported

    var Foo = function Foo() {
      _classCallCheck(this, Foo);
    };

    assert.ok(!(0, _message.isSupported)(new Foo()));

    // Iterables
    assert.ok((0, _message.isSupported)(new Set().values()));
  },

  "serialize/deserialize": function serializeDeserialize() {
    // primitives
    assert.equal(convert(null), null);
    assert.equal(convert(undefined), undefined);
    assert.equal(convert("foo"), "foo");
    assert.equal(convert(42), 42);
    assert.equal(convert(false), false);

    // plain objects, and arrays
    assert.deepEqual(convert({ foo: "bar" }), { foo: "bar" });
    assert.deepEqual(convert([1, 2, 3]), [1, 2, 3]);

    // Maps, Sets
    var m = new Map({ foo: "bar" });
    assert.notEqual((0, _message.serialize)(m), m);
    assert.deepEqual(convert(m), m);
    var s = new Set([1, 2, 3]);
    assert.notEqual((0, _message.serialize)(s), s);
    assert.deepEqual(convert(s), s);

    // Graphs
    var G = graph();
    assert.notEqual((0, _message.serialize)(G), G);
    assert.deepEqual(convert(G), G);
    G = G.toDirected();
    assert.notEqual((0, _message.serialize)(G), G);
    assert.deepEqual(convert(G), G);

    // Everything else is just returned as is

    var Foo = function Foo() {
      _classCallCheck(this, Foo);
    };

    var foo = new Foo();
    assert.equal((0, _message.serialize)(foo), foo);
    assert.equal(convert(foo), foo);

    // Iterables (only serialized)
    foo = _regeneratorRuntime.mark(function callee$1$0() {
      return _regeneratorRuntime.wrap(
        function callee$1$0$(context$2$0) {
          while (1)
            switch ((context$2$0.prev = context$2$0.next)) {
              case 0:
                context$2$0.next = 2;
                return 1;

              case 2:
                context$2$0.next = 4;
                return 2;

              case 4:
                context$2$0.next = 6;
                return 3;

              case 6:
              case "end":
                return context$2$0.stop();
            }
        },
        callee$1$0,
        this
      );
    });
    assert.deepEqual((0, _message.serialize)(foo()), [1, 2, 3]);
  },
};
exports.testMessage = testMessage;
