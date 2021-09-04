/*global assert, utils*/
"use strict";

import { isSupported, serialize, deserialize } from "../message";
import { Graph, DiGraph } from "../../classes";

const { Map, Set } = utils;

function convert(v) {
  return deserialize(serialize(v));
}

function graph() {
  const edges = [
    [1, 2],
    [2, 3],
  ];
  const data = { foo: "bar" };
  return new Graph(edges, data);
}

export const testMessage = {
  isSupported() {
    // primitives
    assert.ok(isSupported(null));
    assert.ok(isSupported(undefined));
    assert.ok(isSupported("foo"));
    assert.ok(isSupported(42));
    assert.ok(isSupported(false));

    // plain objects, and arrays
    assert.ok(isSupported({ foo: "bar" }));
    assert.ok(isSupported([1, 2, 3]));

    // Maps, Sets
    assert.ok(isSupported(new Map({ foo: "bar" })));
    assert.ok(isSupported(new Set([1, 2, 3])));

    // Graphs
    assert.ok(isSupported(new Graph()));
    assert.ok(isSupported(new DiGraph()));

    // Custom classes not supported
    class Foo {}
    assert.ok(!isSupported(new Foo()));

    // Iterables
    assert.ok(isSupported(new Set().values()));
  },

  "serialize/deserialize": function () {
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
    const m = new Map({ foo: "bar" });
    assert.notEqual(serialize(m), m);
    assert.deepEqual(convert(m), m);
    const s = new Set([1, 2, 3]);
    assert.notEqual(serialize(s), s);
    assert.deepEqual(convert(s), s);

    // Graphs
    let G = graph();
    assert.notEqual(serialize(G), G);
    assert.deepEqual(convert(G), G);
    G = G.toDirected();
    assert.notEqual(serialize(G), G);
    assert.deepEqual(convert(G), G);

    // Everything else is just returned as is
    class Foo {}
    let foo = new Foo();
    assert.equal(serialize(foo), foo);
    assert.equal(convert(foo), foo);

    // Iterables (only serialized)
    foo = function* () {
      yield 1;
      yield 2;
      yield 3;
    };
    assert.deepEqual(serialize(foo()), [1, 2, 3]);
  },
};
