/*global assert*/

import Set, { symmetricDifference, union } from "../Set";

export const testSet = {
  testCreate() {
    const set = new Set();
    assert(set);
  },

  testAddElements() {
    let set = new Set([1, 2, 3]);
    assert.deepEqual(Array.from(set.values()).sort(), [1, 2, 3]);

    set = new Set();
    set.add(1);
    set.add("4");
    assert(set.has(1));
    assert(set.has("4"));
  },

  testRemoveElements() {
    const set = new Set([1, 2, 3]);
    set.delete(2);
    assert(!set.has(2));
    assert(set.has(1));
    assert(set.has(3));
  },

  testCount() {
    const set = new Set([1, 2, 3]);
    assert.equal(set.size, 3);
  },

  difference: {
    "single argument - different set, same elements": function () {
      const set = new Set([1, 2, 3]);
      const diff = set.difference();

      assert.notEqual(diff, set);
      assert.deepEqual(diff, set);
    },

    "two arguments": function () {
      const diff = new Set([1, 2, 3, 4]).difference(new Set([2, 4]));

      assert.deepEqual(diff, new Set([1, 3]));
    },

    "multiple arguments": function () {
      const diff = new Set([1, 2, 3, 4]).difference(
        new Set([2, 6]),
        new Set([4])
      );

      assert.deepEqual(diff, new Set([1, 3]));
    },
  },

  intersection: {
    "two arguments": function () {
      const diff = new Set([1, 2, 3, 4]).intersection(new Set([2, 4]));

      assert.deepEqual(diff, new Set([2, 4]));
    },

    "multiple arguments": function () {
      const diff = new Set([1, 2, 3, 4]).intersection(
        new Set([2, 6]),
        new Set([2, 4])
      );

      assert.deepEqual(diff, new Set([2]));
    },
  },
};

export const testSymmetricDifference = {
  "empty set": function () {
    let full = new Set([1, 2, 3]);
    let empty = new Set();
    let result = symmetricDifference(full, empty);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);

    result = symmetricDifference(empty, full);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);
  },

  "sets with common elements": function () {
    let a = new Set([1, 2, 3, 4]);
    let b = new Set([3, 4, 5, 6]);
    assert.deepEqual(symmetricDifference(a, b), new Set([1, 2, 5, 6]));
    assert.deepEqual(symmetricDifference(b, a), new Set([1, 2, 5, 6]));
  },

  "sets without common elements": function () {
    let a = new Set([1, 2]);
    let b = new Set([3, 4]);
    assert.deepEqual(symmetricDifference(a, b), new Set([1, 2, 3, 4]));
    assert.deepEqual(symmetricDifference(b, a), new Set([1, 2, 3, 4]));
  },
};

export const testUnion = {
  "empty set": function () {
    let full = new Set([1, 2, 3]);
    let empty = new Set();
    let result = union(full, empty);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);

    result = union(empty, full);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);
  },

  "sets with common elements": function () {
    let a = new Set([1, 2, 3, 4]);
    let b = new Set([3, 4, 5, 6]);
    assert.deepEqual(union(a, b), new Set([1, 2, 3, 4, 5, 6]));
    assert.deepEqual(union(b, a), new Set([1, 2, 3, 4, 5, 6]));
  },

  "sets without common elements": function () {
    let a = new Set([1, 2]);
    let b = new Set([3, 4]);
    assert.deepEqual(union(a, b), new Set([1, 2, 3, 4]));
    assert.deepEqual(union(b, a), new Set([1, 2, 3, 4]));
  },
};
