/*global utils, assert, regeneratorRuntime*/
import Map from "../Map";

const toIterator = utils.toIterator;

export const testMap = {
  beforeEach() {
    this.map = new Map();
    this.map.set("0", 0);
    this.map.set("1", 1);
    this.map.set("2", 2);
  },

  "new Map()": {
    "no data": function () {
      assert.equal(new Map().size, 0, "Empty constructor");
    },

    "from array of pairs": function () {
      const data = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];
      const map = new Map(data);

      assert.equal(map.size, 3);
      assert.equal(map.get(1), 2);
      assert.equal(map.get(3), 4);
      assert.equal(map.get(5), 6);
    },

    "from iterator": function () {
      const data = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];
      const iter = toIterator(data);
      const map = new Map(iter);

      assert.equal(map.size, 3);
      assert.equal(map.get(1), 2);
      assert.equal(map.get(3), 4);
      assert.equal(map.get(5), 6);
    },

    "from object": function () {
      const data = { 1: 2, 3: 4 };
      const map = new Map(data);
      assert.equal(map.size, 2);
      assert.equal(map.get(1), 2);
      assert.equal(map.get(3), 4);
    },
  },

  "#set() && #get()": {
    "integer keys": function () {
      const map = new Map();
      map.set(0, 1);
      map.set(1, 2);

      assert.strictEqual(map.get(0), 1);
      assert.strictEqual(map.get(1), 2);
    },

    "string keys": function () {
      const map = new Map();
      map.set("0", 1);
      map.set("1", 2);

      assert.strictEqual(map.get("0"), 1);
      assert.strictEqual(map.get("1"), 2);
    },

    "integers and strings are treated separately": function () {
      const map = new Map();
      map.set(0, 1);
      map.set("0", 2);

      assert.strictEqual(map.get(0), 1);
      assert.strictEqual(map.get("0"), 2);
    },

    "arrays of primitive are considered equal": function () {
      const map = new Map();
      map.set([1, 2], 1);

      assert.strictEqual(map.get([1, 2]), 1);
    },

    "object keys with same toString result are considered equal": function () {
      const map = new Map();
      const obj1 = {
        toString() {
          return "foo";
        },
      };
      const obj2 = {
        toString() {
          return "bar";
        },
      };
      const obj3 = {
        toString() {
          return "bar";
        },
      };

      map.set(obj1, 1);
      map.set(obj2, 2);

      assert.strictEqual(map.get(obj1), 1);
      assert.strictEqual(map.get(obj3), 2);
    },
  },

  "#entries()": function () {
    assert(
      regeneratorRuntime.isGeneratorFunction(this.map.entries),
      "is generator"
    );
    assert.deepEqual(Array.from(this.map.entries()).sort(), [
      ["0", 0],
      ["1", 1],
      ["2", 2],
    ]);
  },

  "#keys()": function () {
    assert(
      regeneratorRuntime.isGeneratorFunction(this.map.keys),
      "is generator"
    );
    assert.deepEqual(Array.from(this.map.keys()).sort(), ["0", "1", "2"]);
  },

  "#values()": function () {
    assert(
      regeneratorRuntime.isGeneratorFunction(this.map.values),
      "is generator"
    );
    assert.deepEqual(Array.from(this.map.values()).sort(), [0, 1, 2]);
  },
};
