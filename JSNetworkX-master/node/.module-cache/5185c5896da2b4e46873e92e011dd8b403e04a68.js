"use strict";
/**
 * @fileoverview
 * A shim for ES6 maps and support for custom hash functions via toString().
 */

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")[
  "default"
];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Symbol$iterator = require("babel-runtime/core-js/symbol/iterator")[
  "default"
];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.symmetricDifference = symmetricDifference;
exports.union = union;

var _Map = require("./Map");

var _Map2 = _interopRequireDefault(_Map);

var _toIterator = require("./toIterator");

var _toIterator2 = _interopRequireDefault(_toIterator);

var Set = (function () {
  /**
   * @param {Iterable} opt_data An object, array or iterator to populate the set
   * with.
   */

  function Set(optData) {
    _classCallCheck(this, Set);

    this._map = new _Map2["default"]();

    if (optData != null) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
          var _iterator = _getIterator((0, _toIterator2["default"])(optData)),
            _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          var v = _step.value;

          this.add(v);
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
    }
  }

  /**
   * Returns true if the key is in the map.
   *
   * @param {*} value
   *
   * @return {boolean}
   */

  _createClass(Set, [
    {
      key: "has",
      value: function has(value) {
        return this._map.has(value);
      },

      /**
       * Adds the value and key to the map.
       *
       * @param {*} value
       *
       * @export
       */
    },
    {
      key: "add",
      value: function add(value) {
        this._map.set(value, true);
      },

      /**
       * Remove value with given key.
       *
       * @param {*} value
       *
       * @export
       */
    },
    {
      key: "delete",
      value: function _delete(value) {
        return this._map["delete"](value);
      },

      /**
       * Returns an array of values.
       *
       * @return {!Iterator}
       * @export
       */
    },
    {
      key: "values",
      value: function values() {
        return this._map.keys();
      },

      /**
       * Returns an array of values.
       *
       * @return {!Iterator}
       * @export
       */
    },
    {
      key: "keys",
      value: function keys() {
        return this.values();
      },

      /**
       * Returns an array of values.
       *
       * @return {!Iterator}
       * @export
       */
    },
    {
      key: "entries",
      value: _regeneratorRuntime.mark(function entries() {
        var _iteratorNormalCompletion2,
          _didIteratorError2,
          _iteratorError2,
          _iterator2,
          _step2,
          v;

        return _regeneratorRuntime.wrap(
          function entries$(context$2$0) {
            while (1)
              switch ((context$2$0.prev = context$2$0.next)) {
                case 0:
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  context$2$0.prev = 3;
                  _iterator2 = _getIterator(this.values());

                case 5:
                  if (
                    (_iteratorNormalCompletion2 = (_step2 = _iterator2.next())
                      .done)
                  ) {
                    context$2$0.next = 12;
                    break;
                  }

                  v = _step2.value;
                  context$2$0.next = 9;
                  return [v, v];

                case 9:
                  _iteratorNormalCompletion2 = true;
                  context$2$0.next = 5;
                  break;

                case 12:
                  context$2$0.next = 18;
                  break;

                case 14:
                  context$2$0.prev = 14;
                  context$2$0.t0 = context$2$0["catch"](3);
                  _didIteratorError2 = true;
                  _iteratorError2 = context$2$0.t0;

                case 18:
                  context$2$0.prev = 18;
                  context$2$0.prev = 19;

                  if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                    _iterator2["return"]();
                  }

                case 21:
                  context$2$0.prev = 21;

                  if (!_didIteratorError2) {
                    context$2$0.next = 24;
                    break;
                  }

                  throw _iteratorError2;

                case 24:
                  return context$2$0.finish(21);

                case 25:
                  return context$2$0.finish(18);

                case 26:
                case "end":
                  return context$2$0.stop();
              }
          },
          entries,
          this,
          [
            [3, 14, 18, 26],
            [19, , 21, 25],
          ]
        );
      }),

      /**
       * Returns the number of element in the set.
       *
       * @return {number}
       * @export
       */
    },
    {
      key: "clear",

      /**
       * Empties the set.
       *
       * @export
       */
      value: function clear() {
        this._map.clear();
      },

      /**
       * Executes the provided callback for each item in the set.
       *
       * @param {function(*)} callback A function which gets the key as first
       *  argument and value as second argument.
       * @param {*=} opt_this Object/value to set this to inside the callback
       * @export
       */
    },
    {
      key: "forEach",
      value: function forEach(callback, optThis) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (
            var _iterator3 = _getIterator(this.values()), _step3;
            !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
            _iteratorNormalCompletion3 = true
          ) {
            var v = _step3.value;

            callback.call(optThis, v, v, this);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      },

      /** EXTENSIONS **/
      /**
       * The following methods are not part of the ES6 Set class but are provided
       * for convenience. Once Sets become more widely available, we could simply
       * extend the native Set class.
       */

      /**
       * Returns a new set with the values of this set, not found in the other
       * sets.
       *
       * @param {...(Set|Array)} others
       */
    },
    {
      key: "difference",
      value: function difference() {
        var result = new Set(this);

        for (
          var _len = arguments.length, others = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          others[_key] = arguments[_key];
        }

        for (var i = 0, l = others.length; i < l; i++) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (
              var _iterator4 = _getIterator(others[i]), _step4;
              !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
              _iteratorNormalCompletion4 = true
            ) {
              var v = _step4.value;

              result["delete"](v);
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                _iterator4["return"]();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
        return result;
      },

      /**
       * Returns a new set containing only elements found in this and every
       * other set/array.
       *
       * @param {...(Set|Array)} others
       */
    },
    {
      key: "intersection",
      value: function intersection() {
        var result = new Set();
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (
            var _len2 = arguments.length, others = Array(_len2), _key2 = 0;
            _key2 < _len2;
            _key2++
          ) {
            others[_key2] = arguments[_key2];
          }

          for (
            var _iterator5 = _getIterator(this), _step5;
            !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
            _iteratorNormalCompletion5 = true
          ) {
            var v = _step5.value;

            /* eslint-disable no-loop-func */
            if (
              others.every(function (other) {
                return other.has(v);
              })
            ) {
              result.add(v);
            }
            /* eslint-enable no-loop-func */
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        return result;
      },

      /**
       * Removes and returns an element from the set.
       *
       * @return {?}
       */
    },
    {
      key: "pop",
      value: function pop() {
        try {
          var value = this.values().next().value;
          this["delete"](value);
          return value;
        } catch (ex) {} // eslint-disable-line no-empty
      },

      /**
       * Returns an iterator for the set object.
       *
       * @return {Iterator}
       */
    },
    {
      key: _Symbol$iterator,
      value: function value() {
        return this.values();
      },
    },
    {
      key: "size",
      get: function get() {
        return this._map.size;
      },
    },
  ]);

  return Set;
})();

exports["default"] = Set;

function symmetricDifference(a, b) {
  var c = new Set(a);
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (
      var _iterator6 = _getIterator(b), _step6;
      !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
      _iteratorNormalCompletion6 = true
    ) {
      var v = _step6.value;

      if (a.has(v)) {
        c["delete"](v);
      } else {
        c.add(v);
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return c;
}

function union(a, b) {
  var c = new Set(a);
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (
      var _iterator7 = _getIterator(b), _step7;
      !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);
      _iteratorNormalCompletion7 = true
    ) {
      var v = _step7.value;

      c.add(v);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
        _iterator7["return"]();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return c;
}
