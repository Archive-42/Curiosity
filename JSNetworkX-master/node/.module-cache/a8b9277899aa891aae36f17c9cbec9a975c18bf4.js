"use strict";
/**
 * This module provides functions to convert
 * NetworkX graphs to and from other formats.
 *
 * The preferred way of converting data to a NetworkX graph
 * is through the graph constuctor.  The constructor calls
 * the to_networkx_graph() function which attempts to guess the
 * input type and convert it automatically.
 */

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireWildcard =
  require("babel-runtime/helpers/interop-require-wildcard")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.toNetworkxGraph = toNetworkxGraph;
exports.convertToUndirected = convertToUndirected;
exports.convertToDirected = convertToDirected;
exports.toDictOfLists = toDictOfLists;
exports.fromDictOfLists = fromDictOfLists;
exports.toDictOfDicts = toDictOfDicts;
exports.fromDictOfDicts = fromDictOfDicts;
exports.toEdgelist = toEdgelist;
exports.fromEdgelist = fromEdgelist;

var _contribConvert = require("./contrib/convert");

var convertMap = _interopRequireWildcard(_contribConvert);

var _contribPrepCreateUsing = require("./contrib/prepCreateUsing");

var _contribPrepCreateUsing2 = _interopRequireDefault(_contribPrepCreateUsing);

var _lodashObjectMapValues = require("lodash/object/mapValues");

var _lodashObjectMapValues2 = _interopRequireDefault(_lodashObjectMapValues);

var _internals = require("./_internals");

var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Make a JSNetworkX graph from a known data structure.
 *
 * The preferred way to call this is automatically from the class constructor
 *
 * ```
 * var data = {0: {1 : {weight: 1}}} // object of objects single edge (0,1)
 * var G = new jsnx.Graph(d);
 * ```
 *
 * instead of the equivalent
 *
 * ```
 * var G = jsnx.fromDictOfDicts(d);
 * ```
 *
 * @param {?} data An object to be converted
 *   Current accepts types are:
 *
 *   - any JSNetworkX graph
 *   - object of objects
 *   - object of lists
 *   - list of edges
 *
 * @param {Graph=} optCreateUsing NetworkX graph
 *     Use specified graph for result.  Otherwise a new graph is created.
 * @param {boolean=} optMultigraphInput
 *     If `true` and  `data` is an object of objects,
 *     try to create a multigraph assuming object of objects of lists
 *     If data and createUsing are both multigraphs then create
 *     a multigraph from a multigraph.
 * @return {Graph}
 */

function toNetworkxGraph(data, optCreateUsing) {
  var optMultigraphInput =
    arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var result = null;

  // jsnx graph
  if (hasOwn.call(data, "adj")) {
    try {
      result = convertMap.fromMapOfMaps(
        data.adj,
        optCreateUsing,
        data.isMultigraph()
      );
      if (hasOwn.call(data, "graph") && typeof data.graph === "object") {
        result.graph = (0, _internals.clone)(data.graph);
      }
      if (hasOwn.call(data, "node") && (0, _internals.isMap)(data.node)) {
        result.node = new _internals.Map();
        data.node.forEach(function (element, k) {
          return result.node.set(k, (0, _internals.clone)(element));
        });
      }
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  // map of maps / lists
  if ((0, _internals.isMap)(data)) {
    try {
      return convertMap.fromMapOfMaps(data, optCreateUsing, optMultigraphInput);
    } catch (e) {
      try {
        return convertMap.fromMapOfLists(data, optCreateUsing);
      } catch (ex) {
        throw new Error("Map data structure cannot be converted to a graph.");
      }
    }
  }

  // dict of dicts / lists
  if ((0, _internals.isPlainObject)(data)) {
    try {
      return fromDictOfDicts(data, optCreateUsing, optMultigraphInput);
    } catch (e) {
      try {
        return fromDictOfLists(data, optCreateUsing);
      } catch (ex) {
        throw new Error(
          "Object data structure cannot be converted to a graph."
        );
      }
    }
  }

  // list of edges
  if ((0, _internals.isArrayLike)(data)) {
    try {
      return fromEdgelist(data, optCreateUsing);
    } catch (e) {
      throw new Error("Input is not a valid edge list");
    }
  }

  return result;
}

/**
 * Return a new undirected representation of the graph G.
 *
 * @param {Graph} G Graph to convert
 * @return {!Graph}
 */

function convertToUndirected(G) {
  return G.toUndirected();
}

/**
 * Return a new directed representation of the graph G.
 *
 * @param {Graph} G Graph to convert
 * @return {!Graph}
 */

function convertToDirected(G) {
  return G.toDirected();
}

/**
 * Return adjacency representation of graph as a dictionary of lists.
 *
 * Completely ignores edge data for MultiGraph and MultiDiGraph.
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 *
 * @return {!Object.<Array>}
 */

function toDictOfLists(G, optNodelist) {
  var contains = function contains(n) {
    return optNodelist.indexOf(n) > -1;
  };
  var d = _Object$create(null);

  if (optNodelist == null) {
    optNodelist = G;
    contains = function (n) {
      return optNodelist.hasNode(n);
    };
  } else {
    optNodelist = _Array$from(optNodelist);
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = _getIterator(optNodelist), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var n = _step.value;

      d[n] = G.neighbors(n).filter(contains);
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

  return d;
}

/**
 * Return a graph from a dictionary of lists.
 *
 * ### Examples
 *
 * ```
 * var data = {0: [1]}; // single edge (0,1)
 * var G = jsnx.fromDictOfLists(data);
 * // or
 * var G = new jsnx.Graph(data);
 * ```
 *
 * @param {!Object.<Array>} d A dictionary of lists adjacency representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *    Otherwise a new graph is created.
 * @return {!Graph}
 */

function fromDictOfLists(d, optCreateUsing) {
  var G = (0, _contribPrepCreateUsing2["default"])(optCreateUsing);

  // Convert numeric property names to numbers
  G.addNodesFrom(
    _regeneratorRuntime.mark(function callee$1$0() {
      var n;
      return _regeneratorRuntime.wrap(
        function callee$1$0$(context$2$0) {
          while (1)
            switch ((context$2$0.prev = context$2$0.next)) {
              case 0:
                context$2$0.t0 = _regeneratorRuntime.keys(d);

              case 1:
                if ((context$2$0.t1 = context$2$0.t0()).done) {
                  context$2$0.next = 7;
                  break;
                }

                n = context$2$0.t1.value;
                context$2$0.next = 5;
                return isNaN(n) ? n : +n;

              case 5:
                context$2$0.next = 1;
                break;

              case 7:
              case "end":
                return context$2$0.stop();
            }
        },
        callee$1$0,
        this
      );
    })()
  );

  var node;
  var nbrlist;
  if (G.isMultigraph() && !G.isDirected()) {
    // a dict_of_lists can't show multiedges.  BUT for undirected graphs,
    // each edge shows up twice in the dict_of_lists.
    // So we need to treat this case separately.
    var seen = new _internals.Set();

    for (node in d) {
      nbrlist = d[node];
      // treat numeric keys like numbers
      node = isNaN(node) ? node : +node;
      /*eslint no-loop-func:0*/
      (0, _internals.forEach)(nbrlist, function (nbr) {
        if (!seen.has(nbr)) {
          G.addEdge(node, nbr);
        }
      });
      seen.add(node); // don't allow reverse edge to show up
    }
  } else {
    var edgeList = [];
    for (node in d) {
      nbrlist = d[node];
      // treat numeric keys like numbers
      node = isNaN(node) ? node : +node;
      (0, _internals.forEach)(nbrlist, function (nbr) {
        edgeList.push([node, nbr]);
      });
    }

    G.addEdgesFrom(edgeList);
  }

  return G;
}

/**
 * Return adjacency representation of graph as a dictionary of dictionaries.
 *
 * @param {Graph} G A jsnx Graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 * @param {Object=} optEdgeData If provided,  the value of the dictionary will
 *      be set to edgeData for all edges.  This is useful to make
 *      an adjacency matrix type representation with 1 as the edge data.
 *      If edgedata is null or undefined, the edgedata in G is used to fill
 *      the values.
 *      If G is a multigraph, the edgedata is a dict for each pair (u,v).
 * @return {!Object.<Object>}
 */

function toDictOfDicts(G, optNodelist, optEdgeData) {
  var dod = {};

  if (optNodelist != null) {
    optNodelist = _Array$from(optNodelist);
    if (optEdgeData != null) {
      optNodelist.forEach(function (u) {
        dod[u] = {};
        G.get(u).forEach(function (data, v) {
          if (optNodelist.indexOf(v) > -1) {
            dod[u][v] = optEdgeData;
          }
        });
      });
    } else {
      // nodelist and edgeData are defined
      optNodelist.forEach(function (u) {
        dod[u] = {};
        G.get(u).forEach(function (data, v) {
          if (optNodelist.indexOf(v) > -1) {
            dod[u][v] = data;
          }
        });
      });
    }
  } else {
    // nodelist is undefined
    if (optEdgeData != null) {
      // dn = [nbrdict, u]
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (
          var _iterator2 = _getIterator(G.adjacencyIter()), _step2;
          !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
          _iteratorNormalCompletion2 = true
        ) {
          var _step2$value = _slicedToArray(_step2.value, 2);

          var nbrdict = _step2$value[0];
          var u = _step2$value[1];

          /*jshint loopfunc:true*/
          dod[u] = (0, _lodashObjectMapValues2["default"])(
            nbrdict,
            function () {
              return optEdgeData;
            }
          );
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
    } else {
      // edge_data is defined
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (
          var _iterator3 = _getIterator(G.adjacencyIter()), _step3;
          !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
          _iteratorNormalCompletion3 = true
        ) {
          var _step3$value = _slicedToArray(_step3.value, 2);

          var nbrdict = _step3$value[0];
          var u = _step3$value[1];

          dod[u] = (0, _internals.clone)(nbrdict);
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
    }
  }

  return dod;
}

/**
 * Return a graph from a dictionary of dictionaries.
 *
 *
 * ### Examples
 *
 * ```
 * var data = {0: {1: {weight: 1}}}; // single edge (0,1)
 * var G = jsnx.fromDictOfDicts(data);
 * // or
 * var G = new jsnx.Graph(data);
 * ```
 *
 * @param {!Object.<!Object>} d A dictionary of dictionaries adjacency
 *      representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *      Otherwise a new graph is created.
 * @param {boolean=} optMultigraphInput
 *      When `true`, the values of the inner object are assumed
 *      to be containers of edge data for multiple edges.
 *      Otherwise this routine assumes the edge data are singletons.
 *
 * @return {Graph}
 */

function fromDictOfDicts(d, optCreateUsing) {
  var optMultigraphInput =
    arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var G = (0, _contribPrepCreateUsing2["default"])(optCreateUsing);
  var seen = new _internals.Set();

  // Convert numeric property names to numbers
  G.addNodesFrom(
    _regeneratorRuntime.mark(function callee$1$0() {
      var n;
      return _regeneratorRuntime.wrap(
        function callee$1$0$(context$2$0) {
          while (1)
            switch ((context$2$0.prev = context$2$0.next)) {
              case 0:
                context$2$0.t0 = _regeneratorRuntime.keys(d);

              case 1:
                if ((context$2$0.t1 = context$2$0.t0()).done) {
                  context$2$0.next = 7;
                  break;
                }

                n = context$2$0.t1.value;
                context$2$0.next = 5;
                return isNaN(n) ? n : +n;

              case 5:
                context$2$0.next = 1;
                break;

              case 7:
              case "end":
                return context$2$0.stop();
            }
        },
        callee$1$0,
        this
      );
    })()
  );

  // is dict a MultiGraph or MultiDiGraph?
  if (optMultigraphInput) {
    // make a copy  of the list of edge data (but not the edge data)
    if (G.isDirected()) {
      for (var u in d) {
        var nbrs = d[u];
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Inner object seems to be an array");
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var datadict = nbrs[v];
          // treat numeric keys like numbers
          v = isNaN(v) ? v : +v;
          for (var key in datadict) {
            if (G.isMultigraph()) {
              G.addEdge(u, v, key, datadict[key]);
            } else {
              G.addEdge(u, v, datadict[key]);
            }
          }
        }
      }
    } else {
      // undirected
      // don't add both directions of undirected graph
      for (var u in d) {
        var nbrs = d[u];
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Inner object seems to be an array");
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var datadict = nbrs[v];
          // treat numeric keys like numbers
          v = isNaN(v) ? v : +v;
          if (!seen.has([u, v])) {
            for (var key in datadict) {
              if (G.isMultigraph()) {
                G.addEdge(u, v, key, datadict[key]);
              } else {
                G.addEdge(u, v, datadict[key]);
              }
            }
            seen.add([v, u]);
          }
        }
      }
    }
  } else {
    // not a multigraph to multigraph transfer
    if (G.isMultigraph() && !G.isDirected()) {
      // d can have both representations u-v, v-u in dict.  Only add one.
      // We don't need this check for digraphs since we add both directions,
      // or for Graph() since it is done implicitly (parallel edges not allowed)
      for (var u in d) {
        var nbrs = d[u];
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Inner object seems to be an array");
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var data = nbrs[v];
          v = isNaN(v) ? v : +v;
          if (!seen.has([u, v])) {
            G.addEdge(u, v, data);
            seen.add([v, u]);
          }
        }
      }
    } else {
      for (var u in d) {
        var nbrs = d[u];
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Inner object seems to be an array");
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var data = nbrs[v];
          // treat numeric keys like numbers
          v = isNaN(v) ? v : +v;
          G.addEdge(u, v, data);
        }
      }
    }
  }

  return G;
}

/**
 * Return a list of edges in the graph.
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 * @return {!Array}
 */

function toEdgelist(G, optNodelist) {
  if (optNodelist != null) {
    return G.edges(optNodelist, true);
  } else {
    return G.edges(null, true);
  }
}

/**
 * Return a graph from a list of edges.
 *
 * @param {Array.<Array>} edgelist Edge tuples
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *      Otherwise a new graph is created.
 * @return {!Graph}
 */

function fromEdgelist(edgelist, optCreateUsing) {
  var G = (0, _contribPrepCreateUsing2["default"])(optCreateUsing);
  G.addEdgesFrom(edgelist);
  return G;
}

// NOT IMPLEMENTED

// to_numpy_matrix
// from_numpy_matrix
// to_numpy_recarray
// to_scipy_sparse_matrix
// from_scipy_sparse_matrix
// setup_module
// dn = [nbrdict, u]
