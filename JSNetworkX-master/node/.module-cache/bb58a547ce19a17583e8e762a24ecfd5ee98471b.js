"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")[
  "default"
];

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _Graph2 = require("./Graph");

var _Graph3 = _interopRequireDefault(_Graph2);

var _exceptionsJSNetworkXError = require("../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

var _internals = require("../_internals");

/**
 * An undirected graph class that can store multiedges.
 *
 * Multiedges are multiple edges between two nodes.  Each edge
 * can hold optional data or attributes. A MultiGraph holds undirected edges.
 * Self loops are allowed.
 *
 * Edges are represented as links between nodes with optional
 * key/value attributes.
 *
 * ### Examples
 *
 * Create an empty graph structure (a "null graph") with no nodes and no edges.
 *
 * ```
 * var G = jsnx.MultiGraph();
 * ```
 *
 * G can be grown in several ways.
 *
 * #### Nodes
 *
 * Add one node at a time:
 *
 * ```
 * G.addNode(1);
 * ```
 *
 * Add the nodes from any iterable:
 *
 * ```
 * G.addNodesFrom([2, 3]);
 * var H = jsnx.Graph();
 * H.addPath([0,1,2,3,4,5,6,7,8,9]);
 * G.addNodesFrom(h);
 * ```
 *
 * In addition to strings and integers, any object that implements a custom
 * `toString` method can be used as node. For example, arrays:
 *
 * ```
 * G.addNode([1,2]);
 * ```
 *
 * #### Edges
 *
 * A graph can also be grown by adding edges.
 *
 * Add one edge,
 *
 * ```
 * G.addEdge(1, 2);
 * ```
 *
 * a list or collection of edges,
 *
 * ```
 * G.addEdgesFrom([[1,2], [1,3]]);
 * G.addEdgesFrom(H.edges());
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. If an edge already exists, an addition edge is created and
 * stored using a key to identify the edge. By default, the key is the lowest
 * unused integer.
 *
 * ```
 * G.addEdgesFrom([[4,5,{route: 282}], [4,5,{route: 37}]]);
 * G.get(4);
 * // Map { 3: {0: {}}, 5: {0: {}, 1: {route: 282}, 2: {route: 37}}}
 * ```
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute "dictionary" (object). By defauly these are empty, but can be added
 * or changed using `addEdge` or `addNode`.
 *
 * ```
 * var G = jsnx.MultiGraph(null, {day: Friday}):
 * G.graph
 * // {day: 'Friday'}
 *
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([3], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [3, {time: '2pm'}]]
 * ```
 *
 * @see Graph
 * @see DiGraph
 * @see MultiDiGraph
 *
 */

var MultiGraph = (function (_Graph) {
  _inherits(MultiGraph, _Graph);

  /**
   * @param {?} optData Data to initialze graph.
   *      If no data is provided, an empty graph is created. The data can be
   *      an edge list or any graph object.
   * @param {Object=} optAttr Attributes to add to graph as key=value pairs.
   */

  function MultiGraph(optData, optAttr) {
    _classCallCheck(this, MultiGraph);

    _get(Object.getPrototypeOf(MultiGraph.prototype), "constructor", this).call(
      this,
      optData,
      optAttr
    );
  }

  /**
   * Holds the graph type (class) name for information.
   * This is compatible to Pythons __name__ property.
   *
   * @type {string}
   */

  _createClass(
    MultiGraph,
    [
      {
        key: "addEdge",

        /**
         * Add an edge between u and v.
         *
         * The nodes u and v will be automatically added if they are
         * not already in the graph.
         *
         * Edge attributes can be specified with keywords or by providing
         * a dictionary with key/value pairs.
         *
         * ### Notes:
         *
         * To replace/update edge data, use the optional key argument
         * to identify a unique edge.  Otherwise a new edge will be created.
         *
         * NetworkX algorithms designed for weighted graphs cannot use
         * multigraphs directly because it is not clear how to handle
         * multiedge weights.  Convert to Graph using edge attribute
         * 'weight' to enable weighted graph algorithms.
         *
         * ### Example
         *
         * The following all add the edge [1,2] to the graph G:
         *
         * ```
         * var G = jsnx.MultiGraph();
         * var e = [1,2];
         * G.addEdge(1, 2);
         * G.addEdge.apply(G, e);
         * G.addEdgesFrom([e]);
         * ```
         * Associate data to edges by passing a data object:
         *
         * ```
         * G.addEdge(1, 2, {weight: 3});
         * G.addEdge(1, 2, 0, {weight: 4}); // update data for key=0
         * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
         * ```
         * @see #addEdgesFrom
         *
         * @param {Node} u node
         * @param {Node} v node
         * @param {?(number|string)=} optKey identifier
         *      Used to distinguish multiedges between a pair of nodes. Default is
         *      the lowest unused integer.
         * @param {?Object=} optAttrDict  Dictionary of edge attributes.
         *      Key/value pairs will update existing data associated with the edge.
         */
        value: function addEdge(u, v, optKey, optAttrDict) {
          var type = typeof optKey;
          if (optKey != null && type !== "number" && type !== "string") {
            optAttrDict = optKey;
            optKey = null;
          }

          // set up attribute dict
          if (optAttrDict && !(0, _internals.isPlainObject)(optAttrDict)) {
            throw new _exceptionsJSNetworkXError2["default"](
              "The optAttrDict argument must be an object."
            );
          }

          // add nodes
          if (!this.adj.has(u)) {
            this.adj.set(u, new _internals.Map());
            this.node.set(u, {});
          }
          if (!this.adj.has(v)) {
            this.adj.set(v, new _internals.Map());
            this.node.set(v, {});
          }

          var keydict;
          if (this.adj.get(u).has(v)) {
            keydict = this.adj.get(u).get(v);
            if (optKey == null) {
              // find a unique integer key
              // other methods might be better here?
              optKey = _Object$keys(keydict).length;
              while (keydict[optKey]) {
                // ok, because values are objects only
                optKey += 1;
              }
            }
            var datadict = keydict[optKey] || {};
            keydict[optKey] = _Object$assign(datadict, optAttrDict);
          } else {
            // selfloops work this way without special treatment
            if (optKey == null) {
              optKey = 0;
            }
            keydict = _Object$create(null);
            keydict[optKey] = _Object$assign({}, optAttrDict);
            this.adj.get(u).set(v, keydict);
            this.adj.get(v).set(u, keydict);
          }
        },

        /**
         * Add all the edges in `ebunch`.
         *
         * Adding the same edge twice has no effect but any edge data will be updated
         * when each duplicate edge is added.
         *
         * Edge attributes specified in edges as a tuple take precedence over the
         * attributes specified generally.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addEdgesFrom([[0,1], [1,2]]);
         * ```
         *
         * Associate data to edges
         *
         * ```
         * G.addEdgesFrom([[1,2], [2,3]], {weight: 3});
         * G.addEdgesFrom([[1,2], [2,3]], {label: 'WN2898'});
         * ```
         *
         * @see #addEdge
         * @see #addWeightedEdgesFrom
         *
         *
         * @param {Iterable} ebunch container of edges
         *      Each edge given in the container will be added to the
         *      graph. The edges can be:
         *
         *          - 2-tuples (u,v) or
         *          - 3-tuples (u,v,d) for an edge attribute dict d or
         *          - 4-tuples (u,v,k,d) for an edge identified by key k
         *
         * @param {Object=} optAttrDict Dictionary of edge attributes.
         *       Key/value pairs will update existing data associated with each edge.
         */
      },
      {
        key: "addEdgesFrom",
        value: function addEdgesFrom(ebunch, optAttrDict) {
          // istanbul ignore next

          var _this = this;

          if (optAttrDict && !(0, _internals.isPlainObject)(optAttrDict)) {
            throw new _exceptionsJSNetworkXError2["default"](
              "The optAttrDict argument must be an object."
            );
          }

          // process ebunch
          (0, _internals.forEach)(ebunch, function (edge) {
            var u;
            var v;
            var key;
            var data;

            switch (edge.length) {
              case 4:
                u = edge[0];
                v = edge[1];
                key = edge[2];
                data = edge[3];
                break;
              case 3:
                u = edge[0];
                v = edge[1];
                data = edge[2];
                break;
              case 2:
                u = edge[0];
                v = edge[1];
                break;
              default:
                if (!(0, _internals.isArrayLike)(edge)) {
                  throw new TypeError("Elements in edgelists must be tuples.");
                }
                throw new _exceptionsJSNetworkXError2[
                  "default"
                ]((0, _internals.sprintf)("Edge tuple %j must be a 2-tuple, 3-tuple or 4-tuple.", edge));
            }

            var keydict = _this.adj.has(u)
              ? _this.adj.get(u).get(v) || _Object$create(null)
              : _Object$create(null);

            if (key == null) {
              // find a unique integer key
              // other methods might be better here?
              key = _Object$keys(keydict).length;
              while (keydict[key]) {
                key += 1;
              }
            }
            var datadict = keydict[key] || {};
            _Object$assign(datadict, optAttrDict, data);
            _this.addEdge(u, v, key, datadict);
          });
        },

        /**
         * Remove an edge between u and v.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addPath([0,1,2,3]);
         * G.removeEdge(0, 1);
         * ```
         *
         * For multiple edges
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
         * G.removeEdge(1, 2); // remove a single edge
         * ```
         *
         * For edges with keys
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addEdge(1, 2, 'first');
         * G.addEdge(1, 2, 'second');
         * G.removeEdge(1, 2, 'second');
         * ```
         *
         * @see #removeEdgesFrom
         *
         * @param {Node} u
         * @param {Node} v
         * @param {(number|string)=} optKey
         *      Used to distinguish multiple edges between a pair of nodes.
         *      If null or undefined remove a single (arbitrary) edge between u and v.
         */
      },
      {
        key: "removeEdge",
        value: function removeEdge(u, v, optKey) {
          var keydict;
          var neightborsOfU = this.adj.get(u);
          if (neightborsOfU) {
            keydict = neightborsOfU.get(v);
          }
          if (keydict == null) {
            throw new _exceptionsJSNetworkXError2["default"](
              (0, _internals.sprintf)(
                "The edge %j-%j is not in the graph",
                u,
                v
              )
            );
          }

          // remove the edge with specified data
          if (optKey == null) {
            for (var key in keydict) {
              delete keydict[key];
              break;
            }
          } else {
            if (!keydict[optKey]) {
              throw new _exceptionsJSNetworkXError2["default"](
                (0, _internals.sprintf)(
                  "The edge %j-%j with key %j is not in the graph",
                  u,
                  v,
                  optKey
                )
              );
            }
            delete keydict[optKey];
          }
          if (_Object$keys(keydict).length === 0) {
            // remove the key entries if last edge
            neightborsOfU["delete"](v);
            if (!(0, _internals.nodesAreEqual)(u, v)) {
              this.adj.get(v)["delete"](u);
            }
          }
        },

        /**
         * Remove all edges specified in `ebunch`.
         *
         * Will fail silently if an edge in `ebunch` is not in the graph.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addPath([0,1,2,3]);
         * var ebunch = [[1,2], [2,3]];
         * G.removeEdgesFrom(ebunch);
         * ```
         *
         * Removing multiple copies of edges.
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
         * G.removeEdgesFrom([[1,2], [1,2]]);
         * G.edges();
         * // [[1,2]]
         * ```
         *
         * @see #removeEdge
         *
         * @param {?} ebunch list or container of edge tuples
         *      Each edge given in the list or container will be removed
         *      from the graph. The edges can be:
         *
         *        - 2-tuples (u,v) All edges between u and v are removed.
         *        - 3-tuples (u,v,key) The edge identified by key is removed.
         */
      },
      {
        key: "removeEdgesFrom",
        value: function removeEdgesFrom(ebunch) {
          // istanbul ignore next

          var _this2 = this;

          (0, _internals.forEach)(ebunch, function (edge) {
            try {
              _this2.removeEdge(edge[0], edge[1], edge[2]);
            } catch (ex) {
              if (!(ex instanceof _exceptionsJSNetworkXError2["default"])) {
                throw ex;
              }
            }
          });
        },

        /**
         * Return True if the graph has an edge between nodes u and v.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addPath([0,1,2,3]);
         * G.hasEdge(0,1);
         * // true
         * G.addEdge(0, 1, 'a');
         * G.hasEdge(0, 1, 'a');
         * // true
         * ```
         *
         * The following syntax are equivalent:
         *
         * ```
         * G.hasEdge(0, 1);
         * // true
         * G.get(0).has(1);
         * // true
         * ```
         *
         * @param {Node} u node
         * @param {Node} v node
         * @param {(string|number)=} optKey If specified return true only
         *      if the edge with key is found.
         *
         * @return {boolean} true if edge is in the graph, false otherwise.
         */
      },
      {
        key: "hasEdge",
        value: function hasEdge(u, v, optKey) {
          var neighborsOfU = this.adj.get(u);
          if (neighborsOfU) {
            return (
              neighborsOfU.has(v) &&
              (optKey == null || !!neighborsOfU.get(v)[optKey])
            );
          }
          return false;
        },

        /**
         * Return a list of edges.
         *
         * Edges are returned as tuples with optional data and keys in the order
         * (node, neighbor, key, data).
         *
         * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addPath([0,1,2,3]);
         * G.edges();
         * // [[0,1], [1,2], [2,3]]
         * G.edges(true);
         * // [[0,1,{}], [1,2,{}], [2,3,{}]]
         * G.edges(false, true);
         * // [[0,1,0], [1,2,0], [2,3,0]]
         * G.edges(true, true);
         * // [[0,1,0,{}], [1,2,0,{}], [2,3,0,{}]]
         * G.edges([0,3]);
         * // [[0,1], [3, 2]]
         * G.edges(0);
         * // [[0,1]]
         * ```
         *
         * @see #edgesIter
         *
         * @param {?NodeContainer=} optNbunch A container of nodes.
         *      The container will be iterated through once.
         * @param {?boolean=} optData (default=False)
         *      Return two tuples (u,v) (False) or three-tuples (u,v,data) (True).
         * @param {?boolean=} optKeys (default=False)
         *      Return two tuples (u,v) (False) or three-tuples (u,v,key) (True).
         *
         * @return {!Array} list of edge tuples
         *      Edges that are adjacent to any node in nbunch, or a list
         *      of all edges if nbunch is not specified.
         */
      },
      {
        key: "edges",
        value: function edges(optNbunch, optData, optKeys) {
          return _Array$from(this.edgesIter(optNbunch, optData, optKeys));
        },

        /**
         * Return an iterator over edges.
         *
         * Edges are returned as tuples with optional data and keys
         * in the order (node, neighbor, key, data).
         *
         * Nodes in nbunch that are not in the graph will be (quietly) ignored.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addPath([0,1,2,3]);
         * Array.from(G.edgesIter);
         * // [[0,1], [1,2], [2,3]]
         * Array.from(G.edges(true));
         * // [[0,1,{}], [1,2,{}], [2,3,{}]]
         * Array.from(G.edges(false, true));
         * // [[0,1,0], [1,2,0], [2,3,0]]
         * Array.from(G.edges(true, true));
         * // [[0,1,0,{}], [1,2,0,{}], [2,3,0,{}]]
         * Array.from(G.edges([0,3]));
         * // [[0,1], [3, 2]]
         * Array.from(G.edges(0));
         * // [[0,1]]
         * ```
         *
         * @see #edges
         *
         * @param {?(NodeContainer|boolean)=} optNbunch A container of nodes.
         *      The container will be iterated through once.
         * @param {?boolean=} optData (default=False)
         *      If True, return edge attribute dict with each edge.
         * @param {?boolean=} optKeys (default=False)
         *      If True, return edge keys with each edge.
         *
         * @return {!Iterator}
         *      An iterator of (u,v), (u,v,d) or (u,v,key,d) tuples of edges.
         *
         * @override
         * @export
         */
      },
      {
        key: "edgesIter",
        value: _regeneratorRuntime.mark(function edgesIter(optNbunch) {
          var optData =
            arguments.length <= 1 || arguments[1] === undefined
              ? false
              : arguments[1];
          var optKeys =
            arguments.length <= 2 || arguments[2] === undefined
              ? false
              : arguments[2];

          var seen,
            nodesNbrs,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _iterator,
            _step,
            _step$value,
            n,
            nbrs,
            _iteratorNormalCompletion2,
            _didIteratorError2,
            _iteratorError2,
            _iterator2,
            _step2,
            _step2$value,
            nbr,
            keydict,
            key,
            tuple;

          return _regeneratorRuntime.wrap(
            function edgesIter$(context$2$0) {
              // istanbul ignore next

              var _this3 = this;

              while (1)
                switch ((context$2$0.prev = context$2$0.next)) {
                  case 0:
                    if (typeof optNbunch === "boolean") {
                      optKeys = optData;
                      optData = optNbunch;
                      optNbunch = null;
                    }

                    seen = new _internals.Set();
                    nodesNbrs =
                      optNbunch == null
                        ? this.adj
                        : (0, _internals.mapIterator)(
                            this.nbunchIter(optNbunch),
                            function (n) {
                              return (0, _internals.tuple2)(
                                n,
                                _this3.adj.get(n)
                              );
                            }
                          );
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    context$2$0.prev = 6;
                    _iterator = _getIterator(nodesNbrs);

                  case 8:
                    if (
                      (_iteratorNormalCompletion = (_step = _iterator.next())
                        .done)
                    ) {
                      context$2$0.next = 53;
                      break;
                    }

                    _step$value = _slicedToArray(_step.value, 2);
                    n = _step$value[0];
                    nbrs = _step$value[1];
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    context$2$0.prev = 15;
                    _iterator2 = _getIterator(nbrs);

                  case 17:
                    if (
                      (_iteratorNormalCompletion2 = (_step2 = _iterator2.next())
                        .done)
                    ) {
                      context$2$0.next = 36;
                      break;
                    }

                    _step2$value = _slicedToArray(_step2.value, 2);
                    nbr = _step2$value[0];
                    keydict = _step2$value[1];

                    if (seen.has(nbr)) {
                      context$2$0.next = 33;
                      break;
                    }

                    context$2$0.t0 = _regeneratorRuntime.keys(keydict);

                  case 23:
                    if ((context$2$0.t1 = context$2$0.t0()).done) {
                      context$2$0.next = 32;
                      break;
                    }

                    key = context$2$0.t1.value;
                    tuple = [n, nbr];

                    if (optKeys) {
                      tuple[2] = key;
                    }
                    if (optData) {
                      tuple.push(keydict[key]);
                    }
                    context$2$0.next = 30;
                    return tuple;

                  case 30:
                    context$2$0.next = 23;
                    break;

                  case 32:
                    seen.add(n);

                  case 33:
                    _iteratorNormalCompletion2 = true;
                    context$2$0.next = 17;
                    break;

                  case 36:
                    context$2$0.next = 42;
                    break;

                  case 38:
                    context$2$0.prev = 38;
                    context$2$0.t2 = context$2$0["catch"](15);
                    _didIteratorError2 = true;
                    _iteratorError2 = context$2$0.t2;

                  case 42:
                    context$2$0.prev = 42;
                    context$2$0.prev = 43;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                      _iterator2["return"]();
                    }

                  case 45:
                    context$2$0.prev = 45;

                    if (!_didIteratorError2) {
                      context$2$0.next = 48;
                      break;
                    }

                    throw _iteratorError2;

                  case 48:
                    return context$2$0.finish(45);

                  case 49:
                    return context$2$0.finish(42);

                  case 50:
                    _iteratorNormalCompletion = true;
                    context$2$0.next = 8;
                    break;

                  case 53:
                    context$2$0.next = 59;
                    break;

                  case 55:
                    context$2$0.prev = 55;
                    context$2$0.t3 = context$2$0["catch"](6);
                    _didIteratorError = true;
                    _iteratorError = context$2$0.t3;

                  case 59:
                    context$2$0.prev = 59;
                    context$2$0.prev = 60;

                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                      _iterator["return"]();
                    }

                  case 62:
                    context$2$0.prev = 62;

                    if (!_didIteratorError) {
                      context$2$0.next = 65;
                      break;
                    }

                    throw _iteratorError;

                  case 65:
                    return context$2$0.finish(62);

                  case 66:
                    return context$2$0.finish(59);

                  case 67:
                  case "end":
                    return context$2$0.stop();
                }
            },
            edgesIter,
            this,
            [
              [6, 55, 59, 67],
              [15, 38, 42, 50],
              [43, , 45, 49],
              [60, , 62, 66],
            ]
          );
        }),

        /**
         * Return the attribute dictionary associated with edge (u,v).
         *
         * ### Example
         *
         * ```
         * var G = jsnx.MultiGraph();
         * G.addPath([0,1,2,3]);
         * G.getEdgeData(0, 1);
         * // {0: {}}
         * G.getEdgeData('a', 'b', null, 0); // edge not in graph, return 0
         * // 0
         * ```
         *
         * @param {Node} u node
         * @param {Node} v node
         * @param {(string|number)=} optKey Return data only for the edge with
         *      specified key.
         * @param {T=} optDefault Value to return if the edge (u,v) is not found.
         *
         * @return {(Object|T)} The edge attribute dictionary.
         * @template T
         */
      },
      {
        key: "getEdgeData",
        value: function getEdgeData(u, v, optKey, optDefault) {
          var neightborsOfU = this.adj.get(u);
          if (neightborsOfU) {
            if (optKey == null) {
              return neightborsOfU.get(v) || optDefault;
            }
            return (
              (neightborsOfU.has(v) && neightborsOfU.get(v)[optKey]) ||
              optDefault
            );
          }
        },

        /**
         * Return an iterator for (node, degree).
         *
         * The node degree is the number of edges adjacent to the node.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.Graph();
         * G.addPath([0,1,2,3]);
         * Array.from(G.degreeIter(0));
         * // [[0,1]]  // node 0 with degree 1
         * Array.from(G.degreeIter([0,1]));
         * // [[0,1], [1,2]]
         *
         * @see #degree
         *
         * @param {?(Node|NodeContainer)=} optNbunch  A container of nodes
         *      The container will be iterated through once.
         * @param {?string=} optWeight  The edge attribute that holds the numerical
         *      value used as a weight.  If undefined, then each edge has weight 1.
         *      The degree is the sum of the edge weights adjacent to the node.
         *
         * @return {!Iterator} The iterator returns two-tuples of (node, degree).
         */
      },
      {
        key: "degreeIter",
        value: _regeneratorRuntime.mark(function degreeIter(
          optNbunch,
          optWeight
        ) {
          var nodesNbrs,
            _iteratorNormalCompletion3,
            _didIteratorError3,
            _iteratorError3,
            _iterator3,
            _step3,
            _step3$value,
            n,
            nbrs,
            deg,
            keydict,
            key;

          return _regeneratorRuntime.wrap(
            function degreeIter$(context$2$0) {
              // istanbul ignore next

              var _this4 = this;

              while (1)
                switch ((context$2$0.prev = context$2$0.next)) {
                  case 0:
                    if (typeof optNbunch === "string") {
                      optWeight = optNbunch;
                      optNbunch = null;
                    }
                    nodesNbrs =
                      optNbunch == null
                        ? this.adj
                        : (0, _internals.mapIterator)(
                            this.nbunchIter(optNbunch),
                            function (n) {
                              return (0, _internals.tuple2)(
                                n,
                                _this4.adj.get(n)
                              );
                            }
                          );
                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    context$2$0.prev = 5;
                    _iterator3 = _getIterator(nodesNbrs);

                  case 7:
                    if (
                      (_iteratorNormalCompletion3 = (_step3 = _iterator3.next())
                        .done)
                    ) {
                      context$2$0.next = 25;
                      break;
                    }

                    _step3$value = _slicedToArray(_step3.value, 2);
                    n = _step3$value[0];
                    nbrs = _step3$value[1];
                    deg = 0;

                    if (!(optWeight == null)) {
                      context$2$0.next = 18;
                      break;
                    }

                    nbrs.forEach(function (keydict) {
                      return (deg += _Object$keys(keydict).length);
                    });
                    context$2$0.next = 16;
                    return [
                      n,
                      deg + +(nbrs.has(n) && _Object$keys(nbrs.get(n)).length),
                    ];

                  case 16:
                    context$2$0.next = 22;
                    break;

                  case 18:
                    // edge weighted graph - degree is sum of nbr edge weights
                    nbrs.forEach(function (keydict) {
                      for (var key in keydict) {
                        deg += (0, _internals.getDefault)(
                          keydict[key][optWeight],
                          1
                        );
                      }
                    });

                    if (nbrs.has(n)) {
                      keydict = nbrs.get(n);

                      for (key in keydict) {
                        deg += (0, _internals.getDefault)(
                          keydict[key][optWeight],
                          1
                        );
                      }
                    }

                    context$2$0.next = 22;
                    return [n, deg];

                  case 22:
                    _iteratorNormalCompletion3 = true;
                    context$2$0.next = 7;
                    break;

                  case 25:
                    context$2$0.next = 31;
                    break;

                  case 27:
                    context$2$0.prev = 27;
                    context$2$0.t0 = context$2$0["catch"](5);
                    _didIteratorError3 = true;
                    _iteratorError3 = context$2$0.t0;

                  case 31:
                    context$2$0.prev = 31;
                    context$2$0.prev = 32;

                    if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                      _iterator3["return"]();
                    }

                  case 34:
                    context$2$0.prev = 34;

                    if (!_didIteratorError3) {
                      context$2$0.next = 37;
                      break;
                    }

                    throw _iteratorError3;

                  case 37:
                    return context$2$0.finish(34);

                  case 38:
                    return context$2$0.finish(31);

                  case 39:
                  case "end":
                    return context$2$0.stop();
                }
            },
            degreeIter,
            this,
            [
              [5, 27, 31, 39],
              [32, , 34, 38],
            ]
          );
        }),

        /**
         * Return true if graph is a multigraph, false otherwise.
         *
         * @return {boolean} true if graph is a multigraph, false otherwise.
         */
      },
      {
        key: "isMultigraph",
        value: function isMultigraph() {
          return true;
        },

        /**
         * Return true if graph is directed, false otherwise.
         *
         * @return {boolean}  True if graph is directed, False otherwise.
         */
      },
      {
        key: "isDirected",
        value: function isDirected() {
          return false;
        },

        /**
         * Return a directed representation of the graph.
         *
         * ### Notes
         *
         * This returns a "deepcopy" of the edge, node, and graph attributes which
         * attempts to completely copy all of the data and references.
         *
         * This is in contrast to the similar D = DiGraph(G) which returns a shallow
         * copy of the data.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addPath([0,1]);
         * var H = G.toDirected();
         * G.edges();
         * // [[0,1], [1,0]]
         * ```
         *
         * If already directed, return a (deep) copy
         *
         * ```
         * var G = new jsnx.MultiDiGraph();
         * G.addPath([0,1]);
         * var H = G.toDirected();
         * G.edges();
         * // [[0,1]]
         * ```
         *
         * @return {!MultiDiGraph}
         *      A directed graph with the same name, same nodes, and with
         *      each edge (u,v,data) replaced by two directed edges
         *      (u,v,data) and (v,u,data).
         */
      },
      {
        key: "toDirected",
        value: function toDirected() {
          var G = new (require("./MultiDiGraph"))();
          G.addNodesFrom(this);
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (
              var _iterator4 = _getIterator(this.adjacencyIter()), _step4;
              !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
              _iteratorNormalCompletion4 = true
            ) {
              var _step4$value = _slicedToArray(_step4.value, 2);

              var u = _step4$value[0];
              var nbrs = _step4$value[1];
              var _iteratorNormalCompletion5 = true;
              var _didIteratorError5 = false;
              var _iteratorError5 = undefined;

              try {
                for (
                  var _iterator5 = _getIterator(nbrs), _step5;
                  !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next())
                    .done);
                  _iteratorNormalCompletion5 = true
                ) {
                  var _step5$value = _slicedToArray(_step5.value, 2);

                  var v = _step5$value[0];
                  var keydict = _step5$value[1];

                  for (var key in keydict) {
                    G.addEdge(
                      u,
                      v,
                      key,
                      (0, _internals.deepcopy)(keydict[key])
                    );
                  }
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

          G.graph = (0, _internals.deepcopy)(this.graph);
          G.node = (0, _internals.deepcopy)(this.node);
          return G;
        },

        /**
         * Return a list of selfloop edges.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addEdge(1, 1);
         * G.addEdge(1, 2);
         * G.selfloopEdges();
         * // [[1,1]]
         * G.selfloopEdges(true);
         * // [[1,1,{}]]
         * G.selfloopEdges(false, true);
         * // [[1,1,0]]
         * G.selfloopEdges(true, true);
         * // [[1,1,0,{}]]
         * ```
         *
         * @see #nodesWithSelfloops
         * @see #numberOfSelfloops
         *
         *
         * @param {boolean=} optData  (default=False)
         *      Return selfloop edges as two tuples (u,v) (data=False)
         *      or three-tuples (u,v,data) (data=True)
         * @param {boolean=} optKeys  (default=False)
         *       If True, return edge keys with each edge
         *
         * @return {Array} A list of all selfloop edges
         */
      },
      {
        key: "selfloopEdges",
        value: function selfloopEdges() {
          var optData =
            arguments.length <= 0 || arguments[0] === undefined
              ? false
              : arguments[0];
          var optKeys =
            arguments.length <= 1 || arguments[1] === undefined
              ? false
              : arguments[1];

          var edges = [];
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (
              var _iterator6 = _getIterator(this.adj), _step6;
              !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
              _iteratorNormalCompletion6 = true
            ) {
              var _step6$value = _slicedToArray(_step6.value, 2);

              var n = _step6$value[0];
              var nbrs = _step6$value[1];

              if (nbrs.has(n)) {
                var keydict = nbrs.get(n);
                for (var key in keydict) {
                  var edge = [n, n];
                  if (optKeys) {
                    edge[2] = key;
                  }
                  if (optData) {
                    edge.push(keydict[key]);
                  }
                  edges.push(edge);
                }
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

          return edges;
        },

        /**
         * Return the number of edges between two nodes.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiGraph();
         * G.addPath([0,1,2,3]);
         * G.numberOfEdges();
         * // 3
         * G.numberOfEdges(0,1);
         * // 1
         * ```
         *
         * @see #size
         *
         * @param {Node=} optU node
         * @param {Node=} optV node
         *      If u and v are specified, return the number of edges between
         *      u and v. Otherwise return the total number of all edges.
         *
         * @return {number} The number of edges in the graph.
         *      If nodes u and v are specified return the number of edges between
         *      those nodes.
         */
      },
      {
        key: "numberOfEdges",
        value: function numberOfEdges(optU, optV) {
          if (optU == null || optV == null) {
            return this.size();
          }

          var neightborsOfU = this.get(optU);
          if (neightborsOfU) {
            return neightborsOfU.has(optV)
              ? _Object$keys(neightborsOfU.get(optV)).length
              : 0;
          }
          return 0;
        },

        /**
         * Return the subgraph induced on nodes in nbunch.
         *
         * The induced subgraph of the graph contains the nodes in nbunch and the
         * edges between those nodes.
         *
         * ### Notes
         *
         * The graph, edge or node attributes just point to the original graph.
         * So changes to the node or edge structure will not be reflected in
         * the original graph while changes to the attributes will.
         *
         * To create a subgraph with its own copy of the edge/node attributes use:
         * `jsnx.Graph(G.subgraph(nbunch))`
         *
         * If edge attributes are containers, a deep copy can be obtained using:
         * `G.subgraph(nbunch).copy()`.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.Graph();
         * G.addPath([0,1,2,3]);
         * var H = G.subgraph([0,1,2]);
         * H.edges();
         * // [[0,1], [1,2]]
         * ```
         *
         * @param {NodeContainer=} nbunch A container of nodes which will be
         *      iterated through once.
         * @return {MultiGraph} A subgraph of the graph with the same edge attributes.
         */
      },
      {
        key: "subgraph",
        value: function subgraph(nbunch) {
          var bunch = this.nbunchIter(nbunch);
          // create new graph and copy subgraph into it
          var H = new this.constructor();
          // copy node and attribute dictionaries
          this.node.forEach(function (d, n) {
            return H.node.set(n, d);
          });
          // namespace shortcuts for speed
          var HAdj = H.adj,
            thisAdj = this.adj;

          // add nodes and edges (undirected method)
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (
              var _iterator7 = _getIterator(bunch), _step7;
              !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);
              _iteratorNormalCompletion7 = true
            ) {
              var n = _step7.value;

              var Hnbrs = new _internals.Map();
              HAdj.set(n, Hnbrs);

              var _iteratorNormalCompletion8 = true;
              var _didIteratorError8 = false;
              var _iteratorError8 = undefined;

              try {
                for (
                  var _iterator8 = _getIterator(thisAdj.get(n)), _step8;
                  !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next())
                    .done);
                  _iteratorNormalCompletion8 = true
                ) {
                  var _step8$value = _slicedToArray(_step8.value, 2);

                  var nbr = _step8$value[0];
                  var edgedict = _step8$value[1];

                  if (HAdj.has(nbr)) {
                    // add both representations of edge: n-nbr and nbr-n
                    // they share the same edgedict
                    var ed = (0, _internals.clone)(edgedict);
                    Hnbrs.set(nbr, ed);
                    HAdj.get(nbr).set(n, ed);
                  }
                }
              } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
                    _iterator8["return"]();
                  }
                } finally {
                  if (_didIteratorError8) {
                    throw _iteratorError8;
                  }
                }
              }
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

          H.graph = this.graph;
          return H;
        },
      },
    ],
    [
      {
        key: "__name__",
        get: function get() {
          return "MultiGraph";
        },
      },
    ]
  );

  return MultiGraph;
})(_Graph3["default"]);

exports["default"] = MultiGraph;
module.exports = exports["default"];

/*eslint no-loop-func:0*/
