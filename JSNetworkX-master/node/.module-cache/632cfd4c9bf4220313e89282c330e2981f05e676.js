"use strict";

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.toMapOfLists = toMapOfLists;
exports.fromMapOfLists = fromMapOfLists;
exports.toMapOfMaps = toMapOfMaps;
exports.fromMapOfMaps = fromMapOfMaps;

var _prepCreateUsing = require("./prepCreateUsing");

var _prepCreateUsing2 = _interopRequireDefault(_prepCreateUsing);

var _internals = require("../_internals");

/**
 * This module provides functions to convert JSNetworkX graphs to and from
 * non-NetworkX formats.
 */

/**
 * Return adjacency representation of graph as a map of lists.
 *
 * Completely ignores edge data for `MultiGraph` and `MultiDiGraph`.
 *
 * @param {Graph} G A graph
 * @param {Iterable=} optNodelist Use only nods specified in this list.
 *
 * @return {!Map}
 */

function toMapOfLists(G, optNodelist) {
  var map = new _internals.Map();

  if (optNodelist != null) {
    _Array$from(optNodelist).forEach(function (n) {
      return map.set(
        n,
        G.neighbors(n).filter(function (v) {
          return optNodelist.indexOf(v) > -1;
        })
      );
    });
  } else {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = _getIterator(G), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        var n = _step.value;

        map.set(n, G.neighbors(n));
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

  return map;
}

/**
 * Return a graph from a map of lists.
 * *
 * @param {!Map} map A map of lists adjacency representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *    Otherwise a new graph is created.
 *
 * @return {!Graph}
 */

function fromMapOfLists(map, optCreateUsing) {
  var G = (0, _prepCreateUsing2["default"])(optCreateUsing);
  G.addNodesFrom(map.keys());

  if (G.isMultigraph() && !G.isDirected()) {
    // a map_of_lists can't show multiedges.  BUT for undirected graphs,
    // each edge shows up twice in the map_of_lists.
    // So we need to treat this case separately.
    var seen = new _internals.Set();

    map.forEach(function (nbrlist, node) {
      nbrlist.forEach(function (nbr) {
        if (!seen.has(nbr)) {
          G.addEdge(node, nbr);
        }
      });
      seen.add(node); // don't allow reverse edge to show up
    });
  } else {
    map.forEach(function (nbrlist, node) {
      nbrlist.forEach(function (nbr) {
        return G.addEdge(node, nbr);
      });
    });
  }

  return G;
}

/**
 * Return adjacency representation of graph as a map of maps.
 *
 * @param {Graph} G A jsnx Graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 * @param {Object=} optEdgeData If provided,  the value of the map will be
 *      set to edgeData for all edges.  This is useful to make
 *      an adjacency matrix type representation with 1 as the edge data.
 *      If optEdgeData is null or undefined, the edge data in G is used to
 *      fill the values.
 *      If G is a multigraph, the edge data is a dict for each pair (u,v).
 *
 * @return {!Map}
 */

function toMapOfMaps(G, optNodelist, optEdgeData) {
  var mapOfMaps = new _internals.Map();

  if (optNodelist != null) {
    optNodelist = _Array$from(optNodelist);
    optNodelist.forEach(function (u) {
      var mapOfU = mapOfMaps.set(u, new _internals.Map());
      G.get(u).forEach(function (v, data) {
        if (optNodelist.indexOf(v) > -1) {
          mapOfU.set(v, optEdgeData == null ? data : optEdgeData);
        }
      });
    });
  } else {
    // nodelist is undefined
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function () {
        var _step2$value = _slicedToArray(_step2.value, 2);

        var nbrmap = _step2$value[0];
        var u = _step2$value[1];

        /*eslint no-loop-func:0*/
        var mapOfU = mapOfMaps.set(u, new _internals.Map());
        nbrmap.forEach(function (data, v) {
          mapOfU.set(v, optEdgeData == null ? data : optEdgeData);
        });
      };

      for (
        var _iterator2 = _getIterator(G.adjacencyIter()), _step2;
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        _iteratorNormalCompletion2 = true
      ) {
        _loop();
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
  }

  return mapOfMaps;
}

/**
 * Return a graph from a map of maps.
 *
 * @param {!Map} map A map of maps adjacency representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *      Otherwise a new graph is created.
 * @param {boolean=} optMultigraphInput (default=False)
 *      When True, the values of the inner dict are assumed
 *      to be containers of edge data for multiple edges.
 *      Otherwise this routine assumes the edge data are singletons.
 *
 * @return {Graph}
 */

function fromMapOfMaps(map, optCreateUsing, optMultigraphInput) {
  var G = (0, _prepCreateUsing2["default"])(optCreateUsing);
  var seen = new _internals.Set(); // don't add both directions of undirected graph
  G.addNodesFrom(map.keys());

  // is map a MultiGraph or MultiDiGraph?
  if (optMultigraphInput) {
    // make a copy  of the list of edge data (but not the edge data)
    if (G.isDirected()) {
      map.forEach(function (nbrs, u) {
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw expection of not map (object)
          throw new TypeError("Value is not a map.");
        }
        nbrs.forEach(function (datadict, v) {
          for (var key in datadict) {
            var data = datadict[key];
            if (G.isMultigraph()) {
              G.addEdge(u, v, key, data);
            } else {
              G.addEdge(u, v, data);
            }
          }
        });
      });
    } else {
      // undirected
      var isMultigraph = G.isMultigraph();
      map.forEach(function (nbrs, u) {
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not map
          throw new TypeError("Not a map");
        }
        nbrs.forEach(function (datadict, v) {
          // this works because sets convert the value to their string
          // representation
          if (!seen.has((0, _internals.tuple2)(u, v))) {
            for (var key in datadict) {
              var data = datadict[key];
              if (isMultigraph) {
                G.addEdge(u, v, key, data);
              } else {
                G.addEdge(u, v, data);
              }
            }
            seen.add((0, _internals.tuple2)(v, u));
          }
        });
      });
    }
  } else {
    // not a multigraph to multigraph transfer
    if (G.isMultigraph() && !G.isDirected()) {
      // map can have both representations u-v, v-u in dict.  Only add one.
      // We don't need this check for digraphs since we add both directions,
      // or for Graph() since it is done implicitly (parallel edges not allowed)
      map.forEach(function (nbrs, u) {
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Value is not a map");
        }
        nbrs.forEach(function (data, v) {
          if (!seen.has((0, _internals.tuple2)(u, v))) {
            G.addEdge(u, v, data);
            seen.add((0, _internals.tuple2)(v, u));
          }
        });
      });
    } else {
      map.forEach(function (nbrs, u) {
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Value is not a map");
        }
        nbrs.forEach(function (data, v) {
          G.addEdge(u, v, data);
        });
      });
    }
  }

  return G;
}

/*jshint ignore:start*/

/*jshint ignore:end*/
