"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")[
  "default"
];

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
function sorter(a, b) {
  return b[0] - a[0];
}

/**
 * A simple priority queue implementation.
 */

var PriorityQueue = (function () {
  /**
   * Accepts an iterable that emits `[priority, value]` pairs. Iterates over the
   * iterable only once.
   *
   * `priority` must be a number.
   *
   * @param {Iterable} iterable
   */

  function PriorityQueue(iterable) {
    _classCallCheck(this, PriorityQueue);

    this._values = [];
    if (iterable != null) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
          var _iterator = _getIterator(iterable), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          var _step$value = _slicedToArray(_step.value, 2);

          var priority = _step$value[0];
          var value = _step$value[1];

          this._values.push([priority, value]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._values.sort(sorter);
    }
  }

  /**
   * Adds a value to the queue. It will be inserted into the queue according to
   * `priority`.
   *
   * @param {number} priority
   * @param {*} value
   */

  _createClass(PriorityQueue, [
    {
      key: "enqueue",
      value: function enqueue(priority, value) {
        this._values.push([priority, value]);
        this._values.sort(sorter);
      },

      /**
       * Removes and returns the smallest [priority, value] tuple from the queue.
       *
       * @return {?}
       */
    },
    {
      key: "dequeue",
      value: function dequeue() {
        return this._values.pop();
      },

      /**
       * Returns the current size of the queue.
       *
       * @return {number}
       */
    },
    {
      key: "size",
      get: function get() {
        return this._values.length;
      },
    },
  ]);

  return PriorityQueue;
})();

exports["default"] = PriorityQueue;
module.exports = exports["default"];
