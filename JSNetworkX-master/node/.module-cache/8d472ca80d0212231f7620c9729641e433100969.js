"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")[
  "default"
];

var _defineProperty = require("babel-runtime/helpers/define-property")[
  "default"
];

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Object$getOwnPropertyNames =
  require("babel-runtime/core-js/object/get-own-property-names")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
var marked0$0 = [yieldEdges, yieldDegree].map(_regeneratorRuntime.mark);

var _DiGraph2 = require("./DiGraph");

var _DiGraph3 = _interopRequireDefault(_DiGraph2);

var _MultiGraph = require("./MultiGraph");

var _MultiGraph2 = _interopRequireDefault(_MultiGraph);

var _exceptionsJSNetworkXError = require("../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

var _internals = require("../_internals");

/**
 * A directed graph class that can store multiedges.
 *
 * Multiedges are multiple edges between two nodes. Each edge can hold optional
 * data or attributes.
 *
 * A MultiDiGraph holds directed edges. Self loops are allowed. Edges are
 * respresented as links between nodes with optional key/value attributes.
 *
 * ### Example
 *
 * Create an empty graph structure (a "null graph") with no nodes and no edges:
 *
 * ```
 * var G = new jsnx.MultiDiGraph();
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
 * G.addNodesFrom([2,3]);
 * var H = new jsnx.Graph();
 * H.addPath([0,1,2,3,4,5]);
 * G.addNodesFrom(H);
 * ```
 *
 * In addition to strings and integers, any object that implements a custom
 * `toString` method can represent a node.
 *
 * #### Edges
 *
 * `G` can also be grown by adding edges. Add one edge,
 *
 * ```
 * G.addEdge(1, 2);
 * ```
 *
 * a list of edges,
 *
 * ```
 * G.addEdgesFrom([[1,2], [1,3]]);
 * ```
 *
 * or a collection of edges
 *
 * ```
 * G.addEdgesFrom(H.edges());
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. If an edge already exists, an additional edge is created and
 * stored using a key to identify the edge. By default the key is the lowest
 * unused integer.
 *
 * ```
 * G.addEdgesFrom([[4,5,{route:282}], [4,5,{route:37}]]);
 * G.get(4);
 * // Map {5: {0: {}, 1: {route: 282}, 2: {route: 37}}}
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute object. By default these are empty, but can be added or changed
 * using `addEdge` or `addNode`.
 *
 * ```
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([3], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [3, {time: '2pm'}]]
 * ```
 *
 * Add edge attributes using `addEdge` and `addEdgesFrom`:
 *
 * ```
 * G.addEdge(1, 2, {weight: 4.7});
 * G.addEdgesFrom([[3,4], [4,5]], {color: 'red'});
 * G.addEdgesFrom([[1,2,{color: 'blue'}], [2,3,{weight: 8}]]);
 * ```
 */

var MultiDiGraph = (function (_DiGraph) {
  _inherits(MultiDiGraph, _DiGraph);

  /**
   * @param {(Object|Array|Graph)} optData Data to initialize graph.
   *   If no data is passed, an empty graph is created. The data can be an edge
   *   list, or any JSNetworkX graph object.
   * @param {Object=} opt_attr (default= no attributes)
   *       Attributes to add to graph as key=value pairs.
   */

  function MultiDiGraph(optData, optAttr) {
    _classCallCheck(this, MultiDiGraph);

    _get(
      Object.getPrototypeOf(MultiDiGraph.prototype),
      "constructor",
      this
    ).call(this, optData, optAttr);
  }

  // Simulate multiple inheritance by merging prototypes

  /**
   * Holds the graph type (class) name for information.
   *
   * @type {string}
   */

  _createClass(
    MultiDiGraph,
    [
      {
        key: "addEdge",

        /**
         * Add an edge between u and v.
         *
         * The nodes u and v will be automatically added if they are not already in
         * the graph.
         *
         * Edge attributes can be specified by providing an object with key/value
         * pairs.
         *
         * ### Note
         *
         * To replace/update edge data, use the optional key argument to identify a
         * unique edge. Otherwise a new edge will be created.
         *
         * ### Example
         *
         * The following add the edge e=(1,2) to graph G:
         *
         * ```
         * var G = new jsnx.MultiDiGraph();
         * G.addEdge(1, 2);
         * G.addEdgesFrom([[1,2]]);
         * ```
         *
         * Associate data to edges using keywords:
         *
         * ```
         * G.addEdge(1, 2, {weight: 3});
         * G.addEdge(1, 2, 0, {weight: 4}); // update data for key=0
         * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
         * ```
         * @param {Node} u
         * @param {Node} v
         * @param {(string|number)} optKey (default=lowest unused integer) Used to
         *   distinguish multiedges between a pair of nodes.
         * @param {Object} opAttrDict Object of edge attributes. Key/value pairs will
         *   update existing data associated with the edge.
         */
        value: function addEdge(u, v, optKey, optAttrDict) {
          if (optKey && typeof optKey === "object") {
            optAttrDict = optKey;
            optKey = null;
          }

          if (optAttrDict && !(0, _internals.isPlainObject)(optAttrDict)) {
            throw new _exceptionsJSNetworkXError2["default"](
              "The optAttrDict argument must be a plain object."
            );
          }

          // add nodes
          var keydict;
          if (!this.succ.has(u)) {
            this.succ.set(u, new _internals.Map());
            this.pred.set(u, new _internals.Map());
            this.node.set(u, {});
          }
          if (!this.succ.has(v)) {
            this.succ.set(v, new _internals.Map());
            this.pred.set(v, new _internals.Map());
            this.node.set(v, {});
          }
          if (this.succ.get(u).has(v)) {
            keydict = this.get(u).get(v);
            if (optKey == null) {
              // find unique integer key
              optKey = _Object$keys(keydict).length;
              while (keydict[optKey]) {
                optKey += 1;
              }
            }
            keydict[optKey] = _Object$assign(
              (0, _internals.getDefault)(keydict[optKey], {}),
              optAttrDict
            );
          } else {
            // selfloops work this way without special treatment
            if (optKey == null) {
              optKey = 0;
            }
            keydict = _defineProperty(
              {},
              optKey,
              _Object$assign({}, optAttrDict)
            );
            this.succ.get(u).set(v, keydict);
            this.pred.get(v).set(u, keydict);
          }
        },

        /**
         * Remove an edge between u and v.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiDiGraph();
         * G.addPath([0,1,2,3]);
         * G.removeEdge(0, 1);
         * ```
         *
         * For multiple edges:
         *
         * ```
         * var G = new jsnx.MultiDiGraph();
         * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
         * G.removeEdge(1, 2); // remove a single (arbitrary) edge
         * ```
         *
         * For edges with keys:
         *
         * ```
         * var G = new jsnx.MultiDiGraph();
         * G.addEdge(1, 2, 'first');
         * G.addEdge(1, 2, 'second');
         * G.removeEdge(1, 2, 'second');
         * ```
         * @param {Node} u
         * @param {Node} v
         * @param {(string|number)} optKey Used to distinguish multiple edges between
         *   a pair of nodes. If undefined, remove a single (arbitrary) edge between
         *   u and v.
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
            this.succ.get(u)["delete"](v);
            this.pred.get(v)["delete"](u);
          }
        },

        /**
         * Return an iterator over the edges.
         *
         * Edges are returned as tuples with optional data and keys in the order
         * `(node, neighbor, key, data)`.
         *
         * ### Note
         *
         * Nodes in `optNbunch` that are not in the graph will be (quietly) ignored.
         * For directed graphs this returns the out-edges.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiDiGraph();
         * G.addPath([0,1,2,3]);
         * Array.from(G.edgesIter());
         * // [[0,1], [1,2], [2,3]]
         * Array.from(G.edgesIter(true));
         * // [[0,1,{}], [1,2,{}], [2,3,{}]]
         * Array.from(G.edgesIter([0,2]));
         * // [[0,1], [2,3]]
         * ```
         *
         * @alias outEdgesIter
         *
         * @param {Iterable} optNbunch (default=all nodes) A container of nodes.
         *   The container will be iterated over only once.
         * @param {boolean} optData (default=false) If true, return edge attribute
         *   dictionaries with each edge.
         * @param {boolean} optKeys (default=flase) If true, return edge keys with
         *   each edge.
         * @return {Iterator} An iterator of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` edges
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
          var nodesNbrs;
          return _regeneratorRuntime.wrap(
            function edgesIter$(context$2$0) {
              // istanbul ignore next

              var _this = this;

              while (1)
                switch ((context$2$0.prev = context$2$0.next)) {
                  case 0:
                    if (typeof optNbunch === "boolean") {
                      optKeys = optData;
                      optData = optNbunch;
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
                                _this.adj.get(n)
                              );
                            }
                          );
                    return context$2$0.delegateYield(
                      yieldEdges(nodesNbrs, optData, optKeys, "out"),
                      "t0",
                      3
                    );

                  case 3:
                  case "end":
                    return context$2$0.stop();
                }
            },
            edgesIter,
            this
          );
        }),

        /**
         * @alias edgesIter
         */
      },
      {
        key: "outEdgesIter",
        value: function outEdgesIter(optNbunch, optData, optKeys) {
          return this.edgesIter(optNbunch, optData, optKeys);
        },

        /**
         * Return a list of the outgoing edges.
         *
         * Edges are returned as tuples with optional data and keys in the order
         * `(node, neighbor, key, data)`.
         *
         * ### Note
         *
         * Nodes in `optNbunch` that are not in the graph will be (quietly) ignored.
         * For directed graphs `edges()` is the same as `outEdges()`.
         *
         * @see inEdges
         *
         * @param {Iterable} optNbunch (default=all nodes) A container of nodes.
         *   The container will be iterated over only once.
         * @param {boolean} optData (default=false) If true, return edge attribute
         *   dictionaries with each edge.
         * @param {boolean} optKeys (default=flase) If true, return edge keys with
         *   each edge.
         * @return {Array} A list of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` tuples of
         *   edges
         */
      },
      {
        key: "outEdges",
        value: function outEdges(optNbunch, optData, optKeys) {
          return _Array$from(this.outEdgesIter(optNbunch, optData, optKeys));
        },

        /**
         * Return an iterator over the incoming edges.
         *
         * Edges are returned as tuples with optional data and keys in the order
         * `(node, neighbor, key, data)`.
         *
         * @see edgesIter
         *
         * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
         *   The container will be iterated over only once.
         * @param {boolean=} optData (default=false) If true, return edge attribute
         *   dictionaries with each edge.
         * @param {boolean=} optKeys (default=flase) If true, return edge keys with
         *   each edge.
         * @return {Iterator} An iterator of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` edges
         */
      },
      {
        key: "inEdgesIter",
        value: _regeneratorRuntime.mark(function inEdgesIter(optNbunch) {
          var optData =
            arguments.length <= 1 || arguments[1] === undefined
              ? false
              : arguments[1];
          var optKeys =
            arguments.length <= 2 || arguments[2] === undefined
              ? false
              : arguments[2];
          var nodesNbrs;
          return _regeneratorRuntime.wrap(
            function inEdgesIter$(context$2$0) {
              // istanbul ignore next

              var _this2 = this;

              while (1)
                switch ((context$2$0.prev = context$2$0.next)) {
                  case 0:
                    if (typeof optNbunch === "boolean") {
                      optKeys = optData;
                      optData = optNbunch;
                      optNbunch = null;
                    }

                    nodesNbrs =
                      optNbunch == null
                        ? this.pred
                        : (0, _internals.mapIterator)(
                            this.nbunchIter(optNbunch),
                            function (n) {
                              return (0, _internals.tuple2)(
                                n,
                                _this2.pred.get(n)
                              );
                            }
                          );
                    return context$2$0.delegateYield(
                      yieldEdges(nodesNbrs, optData, optKeys, "in"),
                      "t0",
                      3
                    );

                  case 3:
                  case "end":
                    return context$2$0.stop();
                }
            },
            inEdgesIter,
            this
          );
        }),

        /**
         * Return a list of the incoming edges.
         *
         * @see outEdges
         *
         * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
         *   The container will be iterated over only once.
         * @param {boolean=} optData (default=false) If true, return edge attribute
         *   dictionaries with each edge.
         * @param {boolean=} optKeys (default=flase) If true, return edge keys with
         *   each edge.
         * @return {Array} A list of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` tuples of
         *   edges
         */
      },
      {
        key: "inEdges",
        value: function inEdges(optNbunch, optData, optKeys) {
          return _Array$from(this.inEdgesIter(optNbunch, optData, optKeys));
        },

        /**
         * Return an iterator for `(node, degree)`.
         *
         * The node degree is the number of edges adjacent to the node.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiDiGraph();
         * G.addPath([0,1,2,3]);
         * Array.from(G.degreeIter([0,1]));
         * // [[0,1], [1,2]]
         * ```
         *
         * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
         *   The container will be iterated through once.
         * @param {string=} optString (default=null)
         *   The edge attribute that holds the numerical value used as a weight. If
         *   None, then each edge has weight 1.
         *   The degree is the sum of the edge weights.
         * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
         */
      },
      {
        key: "degreeIter",
        value: _regeneratorRuntime.mark(function degreeIter(
          optNbunch,
          optWeight
        ) {
          var tuple2Succ,
            tuple2Pred,
            nodesNbrs,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _iterator,
            _step,
            _step$value,
            _step$value$0,
            n,
            succ,
            _step$value$1,
            _,
            pred,
            keydict,
            inDegree,
            _iteratorNormalCompletion2,
            _didIteratorError2,
            _iteratorError2,
            _iterator2,
            _step2,
            outDegree,
            _iteratorNormalCompletion3,
            _didIteratorError3,
            _iteratorError3,
            _iterator3,
            _step3,
            _iteratorNormalCompletion4,
            _didIteratorError4,
            _iteratorError4,
            _iterator4,
            _step4,
            _step4$value,
            _step4$value$0,
            _step4$value$1;

          return _regeneratorRuntime.wrap(
            function degreeIter$(context$2$0) {
              // istanbul ignore next

              var _this3 = this;

              while (1)
                switch ((context$2$0.prev = context$2$0.next)) {
                  case 0:
                    tuple2Succ = (0, _internals.createTupleFactory)(2);
                    tuple2Pred = (0, _internals.createTupleFactory)(2);
                    nodesNbrs =
                      optNbunch == null
                        ? (0, _internals.zipIterator)(
                            this.succ.entries(),
                            this.pred.entries()
                          )
                        : (0, _internals.zipIterator)(
                            (0, _internals.mapIterator)(
                              this.nbunchIter(optNbunch),
                              function (n) {
                                return tuple2Succ(n, _this3.succ.get(n));
                              }
                            ),
                            (0, _internals.mapIterator)(
                              this.nbunchIter(optNbunch),
                              function (n) {
                                return tuple2Pred(n, _this3.pred.get(n));
                              }
                            )
                          );

                    if (!(optWeight == null)) {
                      context$2$0.next = 78;
                      break;
                    }

                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    context$2$0.prev = 7;
                    _iterator = _getIterator(nodesNbrs);

                  case 9:
                    if (
                      (_iteratorNormalCompletion = (_step = _iterator.next())
                        .done)
                    ) {
                      context$2$0.next = 62;
                      break;
                    }

                    _step$value = _slicedToArray(_step.value, 2);
                    _step$value$0 = _slicedToArray(_step$value[0], 2);
                    n = _step$value$0[0];
                    succ = _step$value$0[1];
                    _step$value$1 = _slicedToArray(_step$value[1], 2);
                    _ = _step$value$1[0];
                    pred = _step$value$1[1];
                    inDegree = 0;
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    context$2$0.prev = 21;

                    for (
                      _iterator2 = _getIterator(pred.values());
                      !(_iteratorNormalCompletion2 = (_step2 =
                        _iterator2.next()).done);
                      _iteratorNormalCompletion2 = true
                    ) {
                      keydict = _step2.value;

                      inDegree += _Object$keys(keydict).length;
                    }
                    context$2$0.next = 29;
                    break;

                  case 25:
                    context$2$0.prev = 25;
                    context$2$0.t0 = context$2$0["catch"](21);
                    _didIteratorError2 = true;
                    _iteratorError2 = context$2$0.t0;

                  case 29:
                    context$2$0.prev = 29;
                    context$2$0.prev = 30;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                      _iterator2["return"]();
                    }

                  case 32:
                    context$2$0.prev = 32;

                    if (!_didIteratorError2) {
                      context$2$0.next = 35;
                      break;
                    }

                    throw _iteratorError2;

                  case 35:
                    return context$2$0.finish(32);

                  case 36:
                    return context$2$0.finish(29);

                  case 37:
                    outDegree = 0;
                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    context$2$0.prev = 41;

                    for (
                      _iterator3 = _getIterator(succ.values());
                      !(_iteratorNormalCompletion3 = (_step3 =
                        _iterator3.next()).done);
                      _iteratorNormalCompletion3 = true
                    ) {
                      keydict = _step3.value;

                      inDegree += _Object$keys(keydict).length;
                    }
                    context$2$0.next = 49;
                    break;

                  case 45:
                    context$2$0.prev = 45;
                    context$2$0.t1 = context$2$0["catch"](41);
                    _didIteratorError3 = true;
                    _iteratorError3 = context$2$0.t1;

                  case 49:
                    context$2$0.prev = 49;
                    context$2$0.prev = 50;

                    if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                      _iterator3["return"]();
                    }

                  case 52:
                    context$2$0.prev = 52;

                    if (!_didIteratorError3) {
                      context$2$0.next = 55;
                      break;
                    }

                    throw _iteratorError3;

                  case 55:
                    return context$2$0.finish(52);

                  case 56:
                    return context$2$0.finish(49);

                  case 57:
                    context$2$0.next = 59;
                    return [n, inDegree + outDegree];

                  case 59:
                    _iteratorNormalCompletion = true;
                    context$2$0.next = 9;
                    break;

                  case 62:
                    context$2$0.next = 68;
                    break;

                  case 64:
                    context$2$0.prev = 64;
                    context$2$0.t2 = context$2$0["catch"](7);
                    _didIteratorError = true;
                    _iteratorError = context$2$0.t2;

                  case 68:
                    context$2$0.prev = 68;
                    context$2$0.prev = 69;

                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                      _iterator["return"]();
                    }

                  case 71:
                    context$2$0.prev = 71;

                    if (!_didIteratorError) {
                      context$2$0.next = 74;
                      break;
                    }

                    throw _iteratorError;

                  case 74:
                    return context$2$0.finish(71);

                  case 75:
                    return context$2$0.finish(68);

                  case 76:
                    context$2$0.next = 110;
                    break;

                  case 78:
                    _iteratorNormalCompletion4 = true;
                    _didIteratorError4 = false;
                    _iteratorError4 = undefined;
                    context$2$0.prev = 81;
                    _iterator4 = _getIterator(nodesNbrs);

                  case 83:
                    if (
                      (_iteratorNormalCompletion4 = (_step4 = _iterator4.next())
                        .done)
                    ) {
                      context$2$0.next = 96;
                      break;
                    }

                    _step4$value = _slicedToArray(_step4.value, 2);
                    _step4$value$0 = _slicedToArray(_step4$value[0], 2);
                    n = _step4$value$0[0];
                    succ = _step4$value$0[1];
                    _step4$value$1 = _slicedToArray(_step4$value[1], 2);
                    _ = _step4$value$1[0];
                    pred = _step4$value$1[1];
                    context$2$0.next = 93;
                    return [
                      n,
                      sumEdgeAttribute(pred, optWeight, 1) +
                        sumEdgeAttribute(succ, optWeight, 1),
                    ];

                  case 93:
                    _iteratorNormalCompletion4 = true;
                    context$2$0.next = 83;
                    break;

                  case 96:
                    context$2$0.next = 102;
                    break;

                  case 98:
                    context$2$0.prev = 98;
                    context$2$0.t3 = context$2$0["catch"](81);
                    _didIteratorError4 = true;
                    _iteratorError4 = context$2$0.t3;

                  case 102:
                    context$2$0.prev = 102;
                    context$2$0.prev = 103;

                    if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                      _iterator4["return"]();
                    }

                  case 105:
                    context$2$0.prev = 105;

                    if (!_didIteratorError4) {
                      context$2$0.next = 108;
                      break;
                    }

                    throw _iteratorError4;

                  case 108:
                    return context$2$0.finish(105);

                  case 109:
                    return context$2$0.finish(102);

                  case 110:
                  case "end":
                    return context$2$0.stop();
                }
            },
            degreeIter,
            this,
            [
              [7, 64, 68, 76],
              [21, 25, 29, 37],
              [30, , 32, 36],
              [41, 45, 49, 57],
              [50, , 52, 56],
              [69, , 71, 75],
              [81, 98, 102, 110],
              [103, , 105, 109],
            ]
          );
        }),

        /**
         * Return an iterator for `(node, in-degree)`.
         *
         * The node in-degree is the number of edges pointing to the node.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiDiGraph();
         * G.addPath([0,1,2,3]);
         * Array.from(G.degreeIter([0,1]));
         * // [[0,0], [1,1]]
         * ```
         *
         * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
         *   The container will be iterated through once.
         * @param {string=} optString (default=null)
         *   The edge attribute that holds the numerical value used as a weight. If
         *   None, then each edge has weight 1.
         *   The degree is the sum of the edge weights.
         * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
         */
      },
      {
        key: "inDegreeIter",
        value: _regeneratorRuntime.mark(function inDegreeIter(
          optNbunch,
          optWeight
        ) {
          return _regeneratorRuntime.wrap(
            function inDegreeIter$(context$2$0) {
              while (1)
                switch ((context$2$0.prev = context$2$0.next)) {
                  case 0:
                    return context$2$0.delegateYield(
                      yieldDegree(this, this.pred, optNbunch, optWeight),
                      "t0",
                      1
                    );

                  case 1:
                  case "end":
                    return context$2$0.stop();
                }
            },
            inDegreeIter,
            this
          );
        }),

        /**
         * Return an iterator for `(node, out-degree)`.
         *
         * The node out-degree is the number of edges pointing out of the node.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiDiGraph();
         * G.addPath([0,1,2,3]);
         * Array.from(G.degreeIter([0,1]));
         * // [[0,1], [1,1]]
         * ```
         *
         * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
         *   The container will be iterated through once.
         * @param {string=} optString (default=null)
         *   The edge attribute that holds the numerical value used as a weight. If
         *   None, then each edge has weight 1.
         *   The degree is the sum of the edge weights.
         * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
         */
      },
      {
        key: "outDegreeIter",
        value: _regeneratorRuntime.mark(function outDegreeIter(
          optNbunch,
          optWeight
        ) {
          return _regeneratorRuntime.wrap(
            function outDegreeIter$(context$2$0) {
              while (1)
                switch ((context$2$0.prev = context$2$0.next)) {
                  case 0:
                    return context$2$0.delegateYield(
                      yieldDegree(this, this.succ, optNbunch, optWeight),
                      "t0",
                      1
                    );

                  case 1:
                  case "end":
                    return context$2$0.stop();
                }
            },
            outDegreeIter,
            this
          );
        }),

        /**
         * Return True if graph is a multigraph, False otherwise.
         *
         * @return {boolean} True if graph is a multigraph, False otherwise.
         */
      },
      {
        key: "isMultigraph",
        value: function isMultigraph() {
          return true;
        },

        /**
         * Return True if graph is directed, False otherwise.
         *
         * @return {boolean}  True if graph is directed, False otherwise.
         */
      },
      {
        key: "isDirected",
        value: function isDirected() {
          return true;
        },

        /**
         * Return a directed copy of the graph.
         *
         * ### Notes
         *
         * This returns a deep copy of the edge, node, and
         * graph attributes which attempts to completely copy
         * all of the data and references.
         *
         * This is in contrast to the similar `var G = new MultiDiGraph(D);`, which
         * returns a shallow copy of the data.
         *
         * @return {MultiDiGraph} A deep copy of the graph.
         */
      },
      {
        key: "toDirected",
        value: function toDirected() {
          return (0, _internals.deepcopy)(this);
        },

        /**
         * Return an undirected representation of the digraph.
         *
         * ### Notes
         *
         * The result is an undirected graph with the same name, nodes and
         * with edge `(u,v,data)` if either `(u,v,data)` or `(v,u,data)`
         * is in the digraph.  If both edges exist in digraph and
         * their edge data is different, only one edge is created
         * with an arbitrary choice of which edge data to use.
         * You must check and correct for this manually if desired.
         *
         * This returns a deep copy of the edge, node, and
         * graph attributes which attempts to completely copy
         * all of the data and references.
         *
         * This is in contrast to the similar `var G = new MultiGraph(D);`, which
         * returns a shallow copy of the data.
         *
         * @param {boolean=} optReciprocal If true, only keep edges that appear in
         *   both directions in the original digraph.
         * @return {MultiGraph}
         */
      },
      {
        key: "toUndirected",
        value: function toUndirected(optReciprocal) {
          var H = new _MultiGraph2["default"]();
          H.name = this.name;
          H.addNodesFrom(this);
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (
              var _iterator5 = _getIterator(this.adjacencyIter()), _step5;
              !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
              _iteratorNormalCompletion5 = true
            ) {
              var _step5$value = _slicedToArray(_step5.value, 2);

              var u = _step5$value[0];
              var nbrs = _step5$value[1];
              var _iteratorNormalCompletion6 = true;
              var _didIteratorError6 = false;
              var _iteratorError6 = undefined;

              try {
                for (
                  var _iterator6 = _getIterator(nbrs), _step6;
                  !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next())
                    .done);
                  _iteratorNormalCompletion6 = true
                ) {
                  var _step6$value = _slicedToArray(_step6.value, 2);

                  var v = _step6$value[0];
                  var keydict = _step6$value[1];

                  for (var key in keydict) {
                    if (!optReciprocal || this.hasEdge(v, u, key)) {
                      H.addEdge(
                        u,
                        v,
                        key,
                        (0, _internals.deepcopy)(keydict[key])
                      );
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

          H.graph = (0, _internals.deepcopy)(this.graph);
          H.node = (0, _internals.deepcopy)(this.node);
          return H;
        },

        /**
         * Return the subgraph induced on nodes in `nbunch`.
         *
         * The induced subgraph of the graph contains the nodes in `optNbunch` and the
         * edges between those nodes.
         *
         * ### Notes
         *
         * The graph, edge or node attributes just point to the original graph.
         * So changes to the node or edge structure will not be reflected in
         * the original graph while changes to the attributes will.
         *
         * To create a subgraph with its own copy of the edge/node attributes use:
         * `jsnx.MultiDiGraph(G.subgraph(nbunch))`.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.MultiDiGraph();
         * G.addPath([0,1,2,3]);
         * var H = G.subgraph([0,1,2]);
         * H.edges();
         * // [[0,1], [1,2]]
         * ```
         *
         * @param {Iterable} nBunch A container of nodes which will be iterated
         *   through once.
         * @return {MultiDiGraph}
         */
      },
      {
        key: "subgraph",
        value: function subgraph(nBunch) {
          var bunch = this.nbunchIter(nBunch);
          // create new graph and copy subgraph into it
          var H = new this.constructor();
          // copy node and attribute dictionaries
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

              H.node.set(n, this.node.get(n));
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

          var HSucc = H.succ;
          var HPred = H.pred;
          var thisSucc = this.succ;

          // add nodes
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (
              var _iterator8 = _getIterator(H), _step8;
              !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done);
              _iteratorNormalCompletion8 = true
            ) {
              var n = _step8.value;

              HSucc.set(n, new _internals.Map());
              HPred.set(n, new _internals.Map());
            }
            // add edges
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

          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (
              var _iterator9 = _getIterator(HSucc), _step9;
              !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done);
              _iteratorNormalCompletion9 = true
            ) {
              var _step9$value = _slicedToArray(_step9.value, 2);

              var u = _step9$value[0];
              var HNbrs = _step9$value[1];
              var _iteratorNormalCompletion10 = true;
              var _didIteratorError10 = false;
              var _iteratorError10 = undefined;

              try {
                for (
                  var _iterator10 = _getIterator(thisSucc.get(u)), _step10;
                  !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next())
                    .done);
                  _iteratorNormalCompletion10 = true
                ) {
                  var _step10$value = _slicedToArray(_step10.value, 2);

                  var v = _step10$value[0];
                  var keydict = _step10$value[1];

                  if (HSucc.has(v)) {
                    // add both representations of edge: u-v and v-u
                    // they share the same keydict
                    var keydictCopy = (0, _internals.clone)(keydict);
                    HNbrs.set(v, keydictCopy);
                    HPred.get(v).set(u, keydictCopy);
                  }
                }
              } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
                    _iterator10["return"]();
                  }
                } finally {
                  if (_didIteratorError10) {
                    throw _iteratorError10;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
                _iterator9["return"]();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }

          H.graph = this.graph;
          return H;
        },

        /**
         * Return the reverse of the graph.
         *
         * The reverse is a graph with the same nodes and edges but with the
         * directions of the edges reversed.
         *
         * @param {boolean=} optCopy If true, return a new MultiDiGraph holding the
         *   reversed edges. If false, the reverse graph is created using the original
         *   graph (this changes the original graph).
         * @return {?MultiDiGraph}
         */
      },
      {
        key: "reverse",
        value: function reverse() {
          var optCopy =
            arguments.length <= 0 || arguments[0] === undefined
              ? true
              : arguments[0];

          var H;
          if (optCopy) {
            H = new this.constructor(null, {
              name: (0, _internals.sprintf)("Reverse of (%s)", this.name),
            });

            H.addNodesFrom(this);
            H.addEdgesFrom(
              (0, _internals.mapIterator)(
                this.edges(true, true),
                function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 4);

                  var u = _ref2[0];
                  var v = _ref2[1];
                  var key = _ref2[2];
                  var data = _ref2[3];
                  return (0, _internals.tuple4)(
                    v,
                    u,
                    key,
                    (0, _internals.deepcopy)(data)
                  );
                }
              )
            );
            H.graph = (0, _internals.deepcopy)(this.graph);
            H.node = (0, _internals.deepcopy)(this.node);
          } else {
            var _ref3 = [this.succ, this.pred];
            this.pred = _ref3[0];
            this.succ = _ref3[1];

            this.adj = this.succ;
            H = this;
          }
          return H;
        },
      },
    ],
    [
      {
        key: "__name__",
        get: function get() {
          return "MultiDiGraph";
        },
      },
    ]
  );

  return MultiDiGraph;
})(_DiGraph3["default"]);

exports["default"] = MultiDiGraph;
_Object$getOwnPropertyNames(_MultiGraph2["default"].prototype).forEach(
  function (prop) {
    if (!MultiDiGraph.prototype.hasOwnProperty(prop)) {
      MultiDiGraph.prototype[prop] = _MultiGraph2["default"].prototype[prop];
    }
  }
);

function yieldEdges(nodesNbrs, data, keys, type) {
  var _iteratorNormalCompletion11,
    _didIteratorError11,
    _iteratorError11,
    _iterator11,
    _step11,
    _step11$value,
    n,
    nbrs,
    _iteratorNormalCompletion12,
    _didIteratorError12,
    _iteratorError12,
    _iterator12,
    _step12,
    _step12$value,
    nbr,
    keydict,
    key,
    result;

  return _regeneratorRuntime.wrap(
    function yieldEdges$(context$1$0) {
      while (1)
        switch ((context$1$0.prev = context$1$0.next)) {
          case 0:
            _iteratorNormalCompletion11 = true;
            _didIteratorError11 = false;
            _iteratorError11 = undefined;
            context$1$0.prev = 3;
            _iterator11 = _getIterator(nodesNbrs);

          case 5:
            if (
              (_iteratorNormalCompletion11 = (_step11 = _iterator11.next())
                .done)
            ) {
              context$1$0.next = 48;
              break;
            }

            _step11$value = _slicedToArray(_step11.value, 2);
            n = _step11$value[0];
            nbrs = _step11$value[1];
            _iteratorNormalCompletion12 = true;
            _didIteratorError12 = false;
            _iteratorError12 = undefined;
            context$1$0.prev = 12;
            _iterator12 = _getIterator(nbrs);

          case 14:
            if (
              (_iteratorNormalCompletion12 = (_step12 = _iterator12.next())
                .done)
            ) {
              context$1$0.next = 31;
              break;
            }

            _step12$value = _slicedToArray(_step12.value, 2);
            nbr = _step12$value[0];
            keydict = _step12$value[1];
            context$1$0.t0 = _regeneratorRuntime.keys(keydict);

          case 19:
            if ((context$1$0.t1 = context$1$0.t0()).done) {
              context$1$0.next = 28;
              break;
            }

            key = context$1$0.t1.value;
            result = type === "out" ? [n, nbr] : [nbr, n];

            if (keys) {
              result[2] = isNaN(key) ? key : +key;
            }
            if (data) {
              result.push(keydict[key]);
            }
            context$1$0.next = 26;
            return result;

          case 26:
            context$1$0.next = 19;
            break;

          case 28:
            _iteratorNormalCompletion12 = true;
            context$1$0.next = 14;
            break;

          case 31:
            context$1$0.next = 37;
            break;

          case 33:
            context$1$0.prev = 33;
            context$1$0.t2 = context$1$0["catch"](12);
            _didIteratorError12 = true;
            _iteratorError12 = context$1$0.t2;

          case 37:
            context$1$0.prev = 37;
            context$1$0.prev = 38;

            if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
              _iterator12["return"]();
            }

          case 40:
            context$1$0.prev = 40;

            if (!_didIteratorError12) {
              context$1$0.next = 43;
              break;
            }

            throw _iteratorError12;

          case 43:
            return context$1$0.finish(40);

          case 44:
            return context$1$0.finish(37);

          case 45:
            _iteratorNormalCompletion11 = true;
            context$1$0.next = 5;
            break;

          case 48:
            context$1$0.next = 54;
            break;

          case 50:
            context$1$0.prev = 50;
            context$1$0.t3 = context$1$0["catch"](3);
            _didIteratorError11 = true;
            _iteratorError11 = context$1$0.t3;

          case 54:
            context$1$0.prev = 54;
            context$1$0.prev = 55;

            if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
              _iterator11["return"]();
            }

          case 57:
            context$1$0.prev = 57;

            if (!_didIteratorError11) {
              context$1$0.next = 60;
              break;
            }

            throw _iteratorError11;

          case 60:
            return context$1$0.finish(57);

          case 61:
            return context$1$0.finish(54);

          case 62:
          case "end":
            return context$1$0.stop();
        }
    },
    marked0$0[0],
    this,
    [
      [3, 50, 54, 62],
      [12, 33, 37, 45],
      [38, , 40, 44],
      [55, , 57, 61],
    ]
  );
}

function sumEdgeAttribute(nbrs, attribute, def) {
  var sum = 0;
  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (
      var _iterator13 = _getIterator(nbrs.values()), _step13;
      !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done);
      _iteratorNormalCompletion13 = true
    ) {
      var keydict = _step13.value;

      for (var key in keydict) {
        sum += (0, _internals.getDefault)(keydict[key][attribute], def);
      }
    }
  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
        _iterator13["return"]();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }

  return sum;
}

function yieldDegree(graph, edges, nBunch, weight) {
  var nodesNbrs,
    _iteratorNormalCompletion14,
    _didIteratorError14,
    _iteratorError14,
    _iterator14,
    _step14,
    _step14$value,
    n,
    nbrs,
    sum,
    _iteratorNormalCompletion15,
    _didIteratorError15,
    _iteratorError15,
    _iterator15,
    _step15,
    keydict,
    _iteratorNormalCompletion16,
    _didIteratorError16,
    _iteratorError16,
    _iterator16,
    _step16,
    _step16$value;

  return _regeneratorRuntime.wrap(
    function yieldDegree$(context$1$0) {
      while (1)
        switch ((context$1$0.prev = context$1$0.next)) {
          case 0:
            nodesNbrs =
              nBunch == null
                ? edges
                : (0, _internals.mapIterator)(
                    graph.nbunchIter(nBunch),
                    function (n) {
                      return (0, _internals.tuple2)(n, edges.get(n));
                    }
                  );

            if (!(weight == null)) {
              context$1$0.next = 52;
              break;
            }

            _iteratorNormalCompletion14 = true;
            _didIteratorError14 = false;
            _iteratorError14 = undefined;
            context$1$0.prev = 5;
            _iterator14 = _getIterator(nodesNbrs);

          case 7:
            if (
              (_iteratorNormalCompletion14 = (_step14 = _iterator14.next())
                .done)
            ) {
              context$1$0.next = 36;
              break;
            }

            _step14$value = _slicedToArray(_step14.value, 2);
            n = _step14$value[0];
            nbrs = _step14$value[1];
            sum = 0;
            _iteratorNormalCompletion15 = true;
            _didIteratorError15 = false;
            _iteratorError15 = undefined;
            context$1$0.prev = 15;

            for (
              _iterator15 = _getIterator(nbrs.values());
              !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next())
                .done);
              _iteratorNormalCompletion15 = true
            ) {
              keydict = _step15.value;

              sum += _Object$keys(keydict).length;
            }
            context$1$0.next = 23;
            break;

          case 19:
            context$1$0.prev = 19;
            context$1$0.t0 = context$1$0["catch"](15);
            _didIteratorError15 = true;
            _iteratorError15 = context$1$0.t0;

          case 23:
            context$1$0.prev = 23;
            context$1$0.prev = 24;

            if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
              _iterator15["return"]();
            }

          case 26:
            context$1$0.prev = 26;

            if (!_didIteratorError15) {
              context$1$0.next = 29;
              break;
            }

            throw _iteratorError15;

          case 29:
            return context$1$0.finish(26);

          case 30:
            return context$1$0.finish(23);

          case 31:
            context$1$0.next = 33;
            return [n, sum];

          case 33:
            _iteratorNormalCompletion14 = true;
            context$1$0.next = 7;
            break;

          case 36:
            context$1$0.next = 42;
            break;

          case 38:
            context$1$0.prev = 38;
            context$1$0.t1 = context$1$0["catch"](5);
            _didIteratorError14 = true;
            _iteratorError14 = context$1$0.t1;

          case 42:
            context$1$0.prev = 42;
            context$1$0.prev = 43;

            if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
              _iterator14["return"]();
            }

          case 45:
            context$1$0.prev = 45;

            if (!_didIteratorError14) {
              context$1$0.next = 48;
              break;
            }

            throw _iteratorError14;

          case 48:
            return context$1$0.finish(45);

          case 49:
            return context$1$0.finish(42);

          case 50:
            context$1$0.next = 80;
            break;

          case 52:
            _iteratorNormalCompletion16 = true;
            _didIteratorError16 = false;
            _iteratorError16 = undefined;
            context$1$0.prev = 55;
            _iterator16 = _getIterator(nodesNbrs);

          case 57:
            if (
              (_iteratorNormalCompletion16 = (_step16 = _iterator16.next())
                .done)
            ) {
              context$1$0.next = 66;
              break;
            }

            _step16$value = _slicedToArray(_step16.value, 2);
            n = _step16$value[0];
            nbrs = _step16$value[1];
            context$1$0.next = 63;
            return [n, sumEdgeAttribute(nbrs, weight, 1)];

          case 63:
            _iteratorNormalCompletion16 = true;
            context$1$0.next = 57;
            break;

          case 66:
            context$1$0.next = 72;
            break;

          case 68:
            context$1$0.prev = 68;
            context$1$0.t2 = context$1$0["catch"](55);
            _didIteratorError16 = true;
            _iteratorError16 = context$1$0.t2;

          case 72:
            context$1$0.prev = 72;
            context$1$0.prev = 73;

            if (!_iteratorNormalCompletion16 && _iterator16["return"]) {
              _iterator16["return"]();
            }

          case 75:
            context$1$0.prev = 75;

            if (!_didIteratorError16) {
              context$1$0.next = 78;
              break;
            }

            throw _iteratorError16;

          case 78:
            return context$1$0.finish(75);

          case 79:
            return context$1$0.finish(72);

          case 80:
          case "end":
            return context$1$0.stop();
        }
    },
    marked0$0[1],
    this,
    [
      [5, 38, 42, 50],
      [15, 19, 23, 31],
      [24, , 26, 30],
      [43, , 45, 49],
      [55, 68, 72, 80],
      [73, , 75, 79],
    ]
  );
}
module.exports = exports["default"];

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
