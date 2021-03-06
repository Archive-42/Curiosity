"use strict";
/**
 * @fileoverview
 * A shim for ES6 maps and support for custom hash functions via toString()
 * and does not accept arrays as keys (just like Python does not accept lists).
 */

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")[
  "default"
];

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

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

var _clear2 = require("./clear");

var _clear3 = _interopRequireDefault(_clear2);

var _isIterable = require("./isIterable");

var _isIterable2 = _interopRequireDefault(_isIterable);

var _lodashLangIsFunction = require("lodash/lang/isFunction");

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var _lodashLangIsObject = require("lodash/lang/isObject");

var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

var _isArrayLike = require("./isArrayLike");

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _lodashCollectionSize = require("lodash/collection/size");

var _lodashCollectionSize2 = _interopRequireDefault(_lodashCollectionSize);

var Map = (function () {
  /**
   * @param {Iterable=} opt_data An object, array or iterator to
   *  populate the map with. If 'data' is an array or iterable, each element is
   *  expected to be a 2-tuple. The first element will be the key and second the
   *  value.
   *  If it is an object, the property names will be the keys and the value the
   *  values.
   */

  function Map(optData) {
    _classCallCheck(this, Map);

    // Can't use class syntax because of generator functions
    this._stringValues = _Object$create(null); // strings
    this._numberValues = _Object$create(null); // numbers
    this._values = _Object$create(null); // every other value
    this._keys = _Object$create(null);

    if (optData != null) {
      if ((0, _isIterable2["default"])(optData)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (
            var _iterator = _getIterator(optData), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
          ) {
            var _step$value = _slicedToArray(_step.value, 2);

            var key = _step$value[0];
            var value = _step$value[1];

            this.set(key, value);
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
      } else if ((0, _isArrayLike2["default"])(optData)) {
        for (var i = 0; i < optData.length; i++) {
          var _optData$i = _slicedToArray(optData[i], 2);

          var key = _optData$i[0];
          var value = _optData$i[1];

          this.set(key, value);
        }
      } else if ((0, _lodashLangIsObject2["default"])(optData)) {
        for (var key in optData) {
          this.set(isNaN(+key) ? key : +key, optData[key]);
        }
      }
    }
  }

  /**
   * Returns the appropriate storage object for a given key.
   *
   * @param {*} key
   * @return {Object}
   * @private
   */

  _createClass(Map, [
    {
      key: "_getStorage",
      value: function _getStorage(key) {
        switch (typeof key) {
          case "number":
            return this._numberValues;
          case "string":
            return this._stringValues;
          default:
            return this._values;
        }
      },

      /**
       * Returns the value for the given key.
       *
       * Unlike native ES6 maps, this also accepts a default value which is returned
       * if the map does not contain the value.
       *
       * @param {*} key
       * @param {*=} optDefaultValue
       *
       * @return {*}
       * @export
       */
    },
    {
      key: "get",
      value: function get(key, optDefaultValue) {
        var storage = this._getStorage(key);
        return key in storage ? storage[key] : optDefaultValue;
      },

      /**
       * Returns true if the key is in the map.
       *
       * @param {*} key
       *
       * @return {boolean}
       * @export
       */
    },
    {
      key: "has",
      value: function has(key) {
        return key in this._getStorage(key);
      },

      /**
       * Adds the value and key to the map.
       *
       * @param {*} key
       * @param {*} value
       *
       * @return {Map} the map object itself
       * @export
       */
    },
    {
      key: "set",
      value: function set(key, value) {
        var values = this._getStorage(key);
        values[key] = value;

        // save actual key value
        if (values === this._values) {
          this._keys[key] = key;
        }

        return this;
      },

      /**
       * Remove value with given key.
       *
       * @param {*} key
       *
       * @return {boolean}
       * @export
       */
    },
    {
      key: "delete",
      value: function _delete(key) {
        var values = this._getStorage(key);
        if (key in values) {
          delete values[key];
          if (values === this._values) {
            delete this._keys[key];
          }
          return true;
        }
        return false;
      },

      /**
       * Returns an array of (key, value) tuples.
       *
       * @return {!Iterator}
       * @export
       */
    },
    {
      key: "entries",
      value: _regeneratorRuntime.mark(function entries() {
        var key;
        return _regeneratorRuntime.wrap(
          function entries$(context$2$0) {
            while (1)
              switch ((context$2$0.prev = context$2$0.next)) {
                case 0:
                  context$2$0.t0 = _regeneratorRuntime.keys(this._numberValues);

                case 1:
                  if ((context$2$0.t1 = context$2$0.t0()).done) {
                    context$2$0.next = 7;
                    break;
                  }

                  key = context$2$0.t1.value;
                  context$2$0.next = 5;
                  return [+key, this._numberValues[key]];

                case 5:
                  context$2$0.next = 1;
                  break;

                case 7:
                  context$2$0.t2 = _regeneratorRuntime.keys(this._stringValues);

                case 8:
                  if ((context$2$0.t3 = context$2$0.t2()).done) {
                    context$2$0.next = 14;
                    break;
                  }

                  key = context$2$0.t3.value;
                  context$2$0.next = 12;
                  return [key, this._stringValues[key]];

                case 12:
                  context$2$0.next = 8;
                  break;

                case 14:
                  context$2$0.t4 = _regeneratorRuntime.keys(this._values);

                case 15:
                  if ((context$2$0.t5 = context$2$0.t4()).done) {
                    context$2$0.next = 21;
                    break;
                  }

                  key = context$2$0.t5.value;
                  context$2$0.next = 19;
                  return [this._keys[key], this._values[key]];

                case 19:
                  context$2$0.next = 15;
                  break;

                case 21:
                case "end":
                  return context$2$0.stop();
              }
          },
          entries,
          this
        );
      }),

      /**
       * Returns an iterator over keys.
       *
       * @return {!Iterator}
       * @export
       */
    },
    {
      key: "keys",
      value: _regeneratorRuntime.mark(function keys() {
        var key;
        return _regeneratorRuntime.wrap(
          function keys$(context$2$0) {
            while (1)
              switch ((context$2$0.prev = context$2$0.next)) {
                case 0:
                  context$2$0.t0 = _regeneratorRuntime.keys(this._numberValues);

                case 1:
                  if ((context$2$0.t1 = context$2$0.t0()).done) {
                    context$2$0.next = 7;
                    break;
                  }

                  key = context$2$0.t1.value;
                  context$2$0.next = 5;
                  return +key;

                case 5:
                  context$2$0.next = 1;
                  break;

                case 7:
                  context$2$0.t2 = _regeneratorRuntime.keys(this._stringValues);

                case 8:
                  if ((context$2$0.t3 = context$2$0.t2()).done) {
                    context$2$0.next = 14;
                    break;
                  }

                  key = context$2$0.t3.value;
                  context$2$0.next = 12;
                  return key;

                case 12:
                  context$2$0.next = 8;
                  break;

                case 14:
                  context$2$0.t4 = _regeneratorRuntime.keys(this._values);

                case 15:
                  if ((context$2$0.t5 = context$2$0.t4()).done) {
                    context$2$0.next = 21;
                    break;
                  }

                  key = context$2$0.t5.value;
                  context$2$0.next = 19;
                  return this._keys[key];

                case 19:
                  context$2$0.next = 15;
                  break;

                case 21:
                case "end":
                  return context$2$0.stop();
              }
          },
          keys,
          this
        );
      }),

      /**
       * Returns an array of values.
       *
       * @return {!Array}
       * @export
       */
    },
    {
      key: "values",
      value: _regeneratorRuntime.mark(function values() {
        var key;
        return _regeneratorRuntime.wrap(
          function values$(context$2$0) {
            while (1)
              switch ((context$2$0.prev = context$2$0.next)) {
                case 0:
                  context$2$0.t0 = _regeneratorRuntime.keys(this._numberValues);

                case 1:
                  if ((context$2$0.t1 = context$2$0.t0()).done) {
                    context$2$0.next = 7;
                    break;
                  }

                  key = context$2$0.t1.value;
                  context$2$0.next = 5;
                  return this._numberValues[key];

                case 5:
                  context$2$0.next = 1;
                  break;

                case 7:
                  context$2$0.t2 = _regeneratorRuntime.keys(this._stringValues);

                case 8:
                  if ((context$2$0.t3 = context$2$0.t2()).done) {
                    context$2$0.next = 14;
                    break;
                  }

                  key = context$2$0.t3.value;
                  context$2$0.next = 12;
                  return this._stringValues[key];

                case 12:
                  context$2$0.next = 8;
                  break;

                case 14:
                  context$2$0.t4 = _regeneratorRuntime.keys(this._values);

                case 15:
                  if ((context$2$0.t5 = context$2$0.t4()).done) {
                    context$2$0.next = 21;
                    break;
                  }

                  key = context$2$0.t5.value;
                  context$2$0.next = 19;
                  return this._values[key];

                case 19:
                  context$2$0.next = 15;
                  break;

                case 21:
                case "end":
                  return context$2$0.stop();
              }
          },
          values,
          this
        );
      }),

      /**
       * Returns the number of element in the map.
       *
       * @return {number}
       * @export
       */
    },
    {
      key: "clear",

      /**
       * Empties the map.
       *
       * @export
       */
      value: function clear() {
        (0, _clear3["default"])(this._stringValues);
        (0, _clear3["default"])(this._numberValues);
        (0, _clear3["default"])(this._values);
        (0, _clear3["default"])(this._keys);
      },

      /**
       * Executes the provided callback for each item in the map.
       *
       * @param {function(*,*)} callback A function which gets the key as first
       *  argument and value as second argument.
       * @param {*=} opt_this Object/value to set this to inside the callback
       * @export
       */
    },
    {
      key: "forEach",
      value: function forEach(callback, optThis) {
        if (!(0, _lodashLangIsFunction2["default"])(callback)) {
          throw new TypeError("callback must be a function");
        }
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (
            var _iterator2 = _getIterator(this.entries()), _step2;
            !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
            _iteratorNormalCompletion2 = true
          ) {
            var v = _step2.value;

            callback.call(optThis, v[1], v[0], this);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      },

      /**
       * Returns an iterator for the map object.
       *
       * @return {Iterator}
       */
    },
    {
      key: _Symbol$iterator,
      value: function value() {
        return this.entries();
      },
    },
    {
      key: "size",
      get: function get() {
        return (
          (0, _lodashCollectionSize2["default"])(this._values) +
          (0, _lodashCollectionSize2["default"])(this._numberValues) +
          (0, _lodashCollectionSize2["default"])(this._stringValues)
        );
      },
    },
  ]);

  return Map;
})();

exports["default"] = Map;
module.exports = exports["default"];
