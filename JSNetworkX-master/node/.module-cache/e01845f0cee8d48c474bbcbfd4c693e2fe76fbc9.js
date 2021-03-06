"use strict";

var _defineProperty = require("babel-runtime/helpers/define-property")[
  "default"
];

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard =
  require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.isSupported = isSupported;
exports.serialize = serialize;
exports.deserialize = deserialize;
exports.serializeAll = serializeAll;

var _isIterable = require("./isIterable");

var _isIterable2 = _interopRequireDefault(_isIterable);

var _isPlainObject = require("./isPlainObject");

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _Map = require("./Map");

var _Map2 = _interopRequireDefault(_Map);

var _Set = require("./Set");

var _Set2 = _interopRequireDefault(_Set);

var _classes = require("../classes");

var classes = _interopRequireWildcard(_classes);

var KEY = "__type-jsnx__";

/**
 * @fileoverview
 * Helper methods to serialize and unserialize data for communicating with
 * workers.
 */

function serializeSet(value) {
  // istanbul ignore next

  var _ref;

  // TODO: serialize nested values
  return (
    (_ref = {}),
    _defineProperty(_ref, KEY, "Set"),
    _defineProperty(_ref, "data", _Array$from(value.values())),
    _ref
  );
}

function deserializeSet(value) {
  return new _Set2["default"](value.data);
}

function serializeMap(value) {
  // istanbul ignore next

  var _ref2;

  return (
    (_ref2 = {}),
    _defineProperty(_ref2, KEY, "Map"),
    _defineProperty(
      _ref2,
      "data",
      (function () {
        var _data = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (
            var _iterator = _getIterator(value), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
          ) {
            var _step$value = _slicedToArray(_step.value, 2);

            var k = _step$value[0];
            var v = _step$value[1];

            _data.push([k, serialize(v)]);
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

        return _data;
      })()
    ),
    _ref2
  );
}

//eslint-disable-line no-undef
function deserializeMap(value) {
  return new _Map2["default"](
    value.data.map(function (kv) {
      return (kv[1] = deserialize(kv[1])), kv;
    })
  );
}

function serializeGraph(value) {
  // istanbul ignore next

  var _ref3;

  // TODO: serialize complex edge and node data
  return (
    (_ref3 = {}),
    _defineProperty(_ref3, KEY, value.constructor.__name__),
    _defineProperty(_ref3, "data", value.graph),
    _defineProperty(_ref3, "nodes", _Array$from(value.node)),
    _defineProperty(_ref3, "edges", value.edges(null, true)),
    _ref3
  );
}

function deserializeGraph(value) {
  var G = new classes[value[KEY]](value.edges, value.data);
  G.addNodesFrom(value.nodes);
  return G;
}

/**
 * Returns true if the value can be properly serialized, otherwise false.
 *
 * @param {*} value
 * @return {boolean}
 */

function isSupported(value) {
  var type = typeof value;
  return (
    // Primitives
    value == null ||
    type === "string" ||
    type === "number" ||
    type === "boolean" ||
    // Objects and arrays (we just assume they contain only primitives)
    (0, _isPlainObject2["default"])(value) ||
    Array.isArray(value) ||
    // Our custom collections (shallow)
    value instanceof _Map2["default"] ||
    value instanceof _Set2["default"] ||
    // Graphs
    value.constructor.__name__ === "Graph" ||
    value.constructor.__name__ === "DiGraph" ||
    // Generic iterables
    (0, _isIterable2["default"])(value)
  );
}

function serialize(value) {
  // primitives
  var type = typeof value;
  if (!value || type === "string" || type === "number" || type === "boolean") {
    return value;
  }
  // Collections
  if (value instanceof _Set2["default"]) {
    return serializeSet(value);
  } else if (value instanceof _Map2["default"]) {
    return serializeMap(value);
  }
  // Graphs
  else if (
    value.constructor.__name__ === "Graph" ||
    value.constructor.__name__ === "DiGraph"
  ) {
    return serializeGraph(value);
  }
  // Iterables
  else if ((0, _isIterable2["default"])(value)) {
    // We keep it simple for now and don't serialize the values of the iterable
    // itself
    return _Array$from(value);
  }
  // TODO: Handle arrays and objects better

  // default
  return value;
}

function deserialize(value) {
  // primitives
  var type = typeof value;
  if (!value || type === "string" || type === "number" || type === "boolean") {
    return value;
  }
  // custom serializtion?
  if (value[KEY]) {
    switch (value[KEY]) {
      case "Map":
        return deserializeMap(value);
      case "Set":
        return deserializeSet(value);
      case "Graph":
      case "DiGraph":
        return deserializeGraph(value);
    }
  }
  // TODO: Handle arrays and objects better

  // default
  return value;
}

/**
 * Serialize an array of values (e.g. arguments passed to a method).,
 *
 * @param {Array} values
 * @return {{serializable: bool, values: Array}}
 */

function serializeAll() {
  var values =
    arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  var serializedValues = new Array(values.length);
  var serializable = values.every(function (value, i) {
    var supported = isSupported(value);
    if (supported) {
      serializedValues[i] = serialize(value);
    }
    return supported;
  });

  return { serializable: serializable, serializedValues: serializedValues };
}
