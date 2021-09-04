/*global assert*/
"use strict";

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _PriorityQueue = require("../PriorityQueue");

var _PriorityQueue2 = _interopRequireDefault(_PriorityQueue);

var testPriorityQueue = {
  constructor: function constructor() {
    var queue = new _PriorityQueue2["default"]();
    assert.equal(queue.size, 0);

    queue = new _PriorityQueue2["default"]([
      [3, 42],
      [10, 21],
      [1, 10],
    ]);
    assert.equal(queue.size, 3);
  },

  queue: function queue() {
    var queue = new _PriorityQueue2["default"]();
    queue.enqueue(10, 42);
    queue.enqueue(3, 21);
    assert.equal(queue.size, 2);
  },

  dequeue: function dequeue() {
    var queue = new _PriorityQueue2["default"]();
    queue.enqueue(10, 42);
    queue.enqueue(3, 21);

    assert.equal(queue.size, 2);
    assert.deepEqual(queue.dequeue(), [3, 21]);
    assert.equal(queue.size, 1);

    queue.enqueue(1, 0);
    assert.deepEqual(queue.dequeue(), [1, 0]);
  },
};
exports.testPriorityQueue = testPriorityQueue;
