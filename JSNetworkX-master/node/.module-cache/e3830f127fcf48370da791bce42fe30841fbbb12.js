"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")[
  "default"
];

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Symbol$iterator = require("babel-runtime/core-js/symbol/iterator")[
  "default"
];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard =
  require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _exceptionsKeyError = require("../exceptions/KeyError");

var _exceptionsKeyError2 = _interopRequireDefault(_exceptionsKeyError);

var _internalsMap = require("../_internals/Map");

var _internalsMap2 = _interopRequireDefault(_internalsMap);

var _internalsSet = require("../_internals/Set");

var _internalsSet2 = _interopRequireDefault(_internalsSet);

var _exceptionsJSNetworkXError = require("../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

var _lodashLangIsBoolean = require("lodash/lang/isBoolean");

var _lodashLangIsBoolean2 = _interopRequireDefault(_lodashLangIsBoolean);

var _lodashLangIsString = require("lodash/lang/isString");

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

var _convert = require("../convert");

var convert = _interopRequireWildcard(_convert);

var _internals = require("../_internals");

/*jshint expr:false*/

/*
 * Base class for undirected graphs.
 *
 * A Graph stores nodes and edges with optional data, or attributes.
 *
 * Graphs hold undirected edges.  Self loops are allowed but multiple
 * (parallel) edges are not.
 *
 * Nodes can be strings, numbers or any object with a custom `toString` method.
 *
 * Edges are represented as links between nodes with optional
 * key/value attributes.
 *
 * ### Examples
 *
 * Create an empty graph (a "null graph") with no nodes and no edges.
 *
 * ```
 * var G = new jsnx.Graph();
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
 * G.addNodesFrom(new Set('foo', 'bar'));
 * var H = jsnx.completeGraph(10);
 * G.addNodesFrom(H);
 * ```
 *
 * In addition to strings, numbers and arrays, any object that implements a
 * custom `toString` method can be used as node.
 *
 * #### Edges
 *
 * `G` can also be grown by adding edges.
 *
 * Add one edge,
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
 * or a collection of edges,
 *
 * ```
 * G.addEdgesFrom(H.edges);
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. There are no errors when adding nodes or edges that already
 * exist.
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute object (keys must be strings or numbers).
 * By default these are empty, but can added or changed using `addEdge`,
 * `addNode`.
 *
 * ```
 * var G = new jsnx.Graph(null, {day: 'Friday'});
 * G.graph
 * // {day: 'Friday'}
 * ```
 *
 * Add node attributes using `addNode()` or `addNodesFrom()`:
 *
 * ```
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([2, [3, {time: '3pm'}]], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [2, {time: '2pm'}], [3, {time: '3pm'}]]
 * ```
 *
 * Add edge attributes using `addEdge()`, or `addEdgesFrom()`:
 *
 * ```
 * G.addEdge(1, w, {weight: 4.7});
 * G.addEdgesFrom([[3,4], [4,5]], {color: 'red'});
 * ```
 *
 * @see DiGraph
 * @see MultiGraph
 * @see MultiDiGraph
 */

var Graph = (function () {
  /*
   * @param {Iterable} optData Data to initialize graph.  If `data` is not
   *    provided, an empty graph is created. The data can be an edge list, or
   *    any JSNetworkX graph object.
   * @param {Object=} optAttr (default=no attributes)
   *    Attributes to add to graph as key=value pairs.
   */

  function Graph(optData, optAttr) {
    _classCallCheck(this, Graph);

    // makes it possible to call Graph without new
    if (!(this instanceof Graph)) {
      return new Graph(optData, optAttr);
    }

    this.graph = {}; // dictionary for graph attributes
    this.node = new _internalsMap2["default"](); // empty node dict (created before convert)
    this.adj = new _internalsMap2["default"](); // empty adjacency dict

    // attempt to load graph with data
    if (optData != null) {
      convert.toNetworkxGraph(optData, this);
    }

    // load graph attributes (must be after convert)
    if (optAttr) {
      _Object$assign(this.graph, optAttr);
    }
    this.edge = this.adj;
  }

  /**
   * Holds the graph type (class) name for information.
   *
   * @type {string}
   */

  _createClass(
    Graph,
    [
      {
        key: "toString",

        /**
         * Return the graph name
         *
         * @return {string} Graph name.
         */
        value: function toString() {
          return this.name;
        },

        /**
         * Return a Map of neighbors of node n.
         *
         * @param {Node} n  A node in the graph.
         *
         * @return {!Map} The adjacency dictionary for nodes connected to n.
         */
      },
      {
        key: "get",
        value: function get(n) {
          var value = this.adj.get(n);
          if (typeof value === "undefined") {
            throw new _exceptionsKeyError2["default"](
              "Graph does not contain node " + n + "."
            );
          }
          return value;
        },

        /**
         * Add a single node n and update node attributes.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addNode(1);
         * G.addNode('Hello');
         * G.numberOfNodes();
         * 2
         * ```
         *
         * @see #addNodesFrom
         *
         * @param {Node} n Node
         * @param {Object=} opt_attr_dict Dictionary of node attributes.
         *      Key/value pairs will update existing data associated with the node.
         */
      },
      {
        key: "addNode",
        value: function addNode(n) {
          var optAttrDict =
            arguments.length <= 1 || arguments[1] === undefined
              ? {}
              : arguments[1];

          if (!(0, _internals.isPlainObject)(optAttrDict)) {
            throw new _exceptionsJSNetworkXError2["default"](
              "The attr_dict argument must be an object."
            );
          }

          if (!this.node.has(n)) {
            this.adj.set(n, new _internalsMap2["default"]());
            this.node.set(n, optAttrDict);
          } else {
            // update attr even if node already exists
            _Object$assign(this.node.get(n), optAttrDict);
          }
        },

        /**
         * Add multiple nodes.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph(); // or DiGraph, MultiGraph, MultiDiGraph
         * G.addNodesFrom([1,2,3]);
         * G.nodes();
         * // [1,2,3]
         * ```
         *
         * Use the second argument to update specific node attributes for every node.
         *
         * ```
         * G.addNodesFrom([1,2], {size: 10});
         * G.addNodesFrom([2,3], {weight: 0.4});
         * ```
         *
         * Use `(node, object)` tuples to update attributes for specific nodes.
         *
         * ```
         * G.addNodesFrom([[1, {size: 11}], [2, {color: 'blue'}]]);
         * G.node.get(1).size
         * // 11
         * var H = new jsnx.Graph();
         * H.addNodesFrom(G.nodes(true));
         * H.node.get(1).size
         * // 11
         * ```
         *
         * @see #addNode
         *
         * @param {Iterable} nodes
         *      An iterable of nodes
         *      OR
         *      An iterable of (node, object) tuples.
         *
         * @param {Object=} optAttr  Update attributes for all nodes in nodes.
         *       Node attributes specified in nodes as a tuple
         *       take precedence over attributes specified generally.
         */
      },
      {
        key: "addNodesFrom",
        value: function addNodesFrom(nodes) {
          var optAttr =
            arguments.length <= 1 || arguments[1] === undefined
              ? {}
              : arguments[1];

          (0, _internals.forEach)(
            nodes,
            function (node) {
              if (
                Array.isArray(node) &&
                node.length === 2 &&
                (0, _internals.isPlainObject)(node[1])
              ) {
                var _node = _slicedToArray(node, 2);

                var nn = _node[0];
                var ndict = _node[1];

                if (!this.adj.has(nn)) {
                  this.adj.set(nn, new _internalsMap2["default"]());
                  var newdict = (0, _internals.clone)(optAttr);
                  this.node.set(nn, _Object$assign(newdict, ndict));
                } else {
                  var olddict = this.node.get(nn);
                  _Object$assign(olddict, optAttr, ndict);
                }
                return; // continue next iteration
              }
              var newnode = !this.node.has(node);
              if (newnode) {
                this.adj.set(node, new _internalsMap2["default"]());
                this.node.set(node, (0, _internals.clone)(optAttr));
              } else {
                _Object$assign(this.node.get(node), optAttr);
              }
            },
            this
          );
        },

        /**
         * Remove node n.
         *
         * Removes the node n and all adjacent edges.
         * Attempting to remove a non-existent node will raise an exception.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2]);
         * G.edges();
         * // [[0,1], [1,2]]
         * G.removeNode(1);
         * G.edges();
         * // []
         * ```
         *
         * @see #removeNodesFrom
         *
         * @param {Node} n  A node in the graph
         */
      },
      {
        key: "removeNode",
        value: function removeNode(n) {
          var adj = this.adj;

          if (this.node["delete"](n)) {
            adj.get(n).forEach(
              function (_, u) {
                return adj.get(u)["delete"](n);
              } // remove all edges n-u in graph
            );
            adj["delete"](n); // now remove node
          } else {
            throw new _exceptionsJSNetworkXError2["default"](
              "The node %s is not in the graph",
              n
            );
          }
        },

        /**
         * Remove multiple nodes.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2]);
         * var e = G.nodes(); // [0,1,2]
         * G.removeNodesFrom(e);
         * G.nodes();
         * // []
         * ```
         *
         * @see #removeNode
         *
         * @param {Iterable} nodes  A container of nodes.
         *      If a node in the container is not in the graph it is silently ignored.
         */
      },
      {
        key: "removeNodesFrom",
        value: function removeNodesFrom(nodes) {
          var adj = this.adj;
          var node = this.node;

          (0, _internals.forEach)(nodes, function (n) {
            if (node["delete"](n)) {
              adj.get(n).forEach(function (_, u) {
                return adj.get(u)["delete"](n);
              });
              adj["delete"](n);
            }
          });
        },

        /**
         * Return an iterator over the nodes.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2]);
         * var data = [];
         * Array.from(G.nodesIter(true)).map(([node, data]) => data);
         * // [{}, {}, {}]
         * ```
         *
         * ### Notes
         *
         * If the node is not required, it is simpler and equivalent to use `G`, e.g.
         * `Array.from(G)` or `for (var node of G)`.
         *
         * @param {boolean=} optData If false the iterator returns
         *   nodes. If true return a two-tuple of node and node data dictionary.
         *
         * @return {Iterator} of nodes If data=true the iterator gives
         *           two-tuples containing (node, node data, dictionary).
         */
      },
      {
        key: "nodesIter",
        value: function nodesIter() {
          var optData =
            arguments.length <= 0 || arguments[0] === undefined
              ? false
              : arguments[0];

          if (optData) {
            return (0, _internals.toIterator)(this.node);
          }
          return this.node.keys();
        },

        /**
         * Return a list of the nodes in the graph.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2]);
         * G.nodes();
         * // [0,1,2]
         * G.addNode(1, {time: '5pm'});
         * G.nodes(true);
         * // [[0,{}], [1,{time: '5pm'}], [2,{}]]
         * ```
         *
         * @param {boolean=} optData If false the iterator returns
         *   nodes. If true return a two-tuple of node and node data dictionary.
         *
         * @return {!Array} of nodes If data=true a list of two-tuples containing
         *           (node, node data object).
         */
      },
      {
        key: "nodes",
        value: function nodes() {
          var optData =
            arguments.length <= 0 || arguments[0] === undefined
              ? false
              : arguments[0];

          return _Array$from(optData ? this.node.entries() : this.node.keys());
        },

        /**
         * Return the number of nodes in the graph.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2]);
         * G.numberOfNodes();
         * // 3
         * ```
         *
         * @see #order
         *
         * @return {number} The number of nodes in the graph.
         */
      },
      {
        key: "numberOfNodes",
        value: function numberOfNodes() {
          return this.node.size;
        },

        /**
         * Return the number of nodes in the graph.
         *
         * @see #numberOfNodes
         *
         * @return {number} The number of nodes in the graph.
         */
      },
      {
        key: "order",
        value: function order() {
          return this.node.size;
        },

        /**
         * Return true if the graph contains the node n.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2]);
         * G.hasNode(0);
         * // true
         * ```
         *
         * @param {Node} n node.
         * @return {boolean}
         */
      },
      {
        key: "hasNode",
        value: function hasNode(n) {
          return this.node.has(n);
        },

        /**
         * Add an edge between u and v.
         *
         * The nodes u and v will be automatically added if they are
         * not already in the graph.
         *
         * Edge attributes can be specified with keywords or by providing
         * a object with key/value pairs as third argument.
         *
         *
         * ### Examples
         *
         * The following all add the edge `(1,2)` to graph `G`:
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addEdge(1,2);
         * G.addEdgesFrom([[1,2]]);
         * ```
         *
         * Associate data to edges using an object:
         *
         * ```
         * G.addEdge(1, 2, {weight: 3});
         * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
         * ```
         *
         * ### Notes
         *
         * Adding an edge that already exists updates the edge data.
         *
         * Many algorithms designed for weighted graphs use as the edge weight a
         * numerical value assigned to an attribute which by default is 'weight'.
         *
         * @see #addEdgesFrom
         *
         * @param {Node} u Node
         * @param {Node} v Node
         * @param {Object=} optAttrDict Object of edge attributes.
         *      Key/value pairs will update existing data associated with the edge.
         */
      },
      {
        key: "addEdge",
        value: function addEdge(u, v, optAttrDict) {
          if (optAttrDict && !(0, _internals.isPlainObject)(optAttrDict)) {
            throw new _exceptionsJSNetworkXError2["default"](
              "The attr_dict argument must be an object."
            );
          }

          // add nodes
          if (!this.node.has(u)) {
            this.adj.set(u, new _internalsMap2["default"]());
            this.node.set(u, {});
          }
          if (!this.node.has(v)) {
            this.adj.set(v, new _internalsMap2["default"]());
            this.node.set(v, {});
          }

          // add the edge
          var datadict = this.adj.get(u).get(v) || {};
          _Object$assign(datadict, optAttrDict);
          this.adj.get(u).set(v, datadict);
          this.adj.get(v).set(u, datadict);
        },

        /**
         * Add all the edges in `ebunch`.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addEdgesFrom([[0,1], [1,2]]); // using a list of edges
         * ```
         *
         * Associate data to edges
         *
         * ```
         * G.addEdgesFrom([[1,2], [2,3]], {weight: 3});
         * G.addEdgesFrom([[3,4], [1,4]], {label: 'WN2898'});
         * ```
         *
         * ### Notes
         *
         * Adding the same edge twice has no effect but any edge data
         * will be updated when each duplicate edge is added.
         *
         * @see #add_edge
         * @see #addWeightedEdgesFrom
         *
         * @param {Iterable} ebunch container of edges
         *      Each edge given in the container will be added to the
         *      graph. The edges must be given as as 2-tuples (u,v) or
         *      3-tuples (u,v,d) where d is a dictionary containing edge data.
         *
         * @param {Object=} optAttrDict Object of edge attributes.
         *      Dictionary of edge attributes.  Key/value pairs will
         *      update existing data associated with each edge.
         */
      },
      {
        key: "addEdgesFrom",
        value: function addEdgesFrom(ebunch, optAttrDict) {
          if (optAttrDict && !(0, _internals.isPlainObject)(optAttrDict)) {
            throw new _exceptionsJSNetworkXError2["default"](
              "The attr_dict argument must be an object."
            );
          }

          // process ebunch
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (
              var _iterator = _getIterator(ebunch), _step;
              !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
              _iteratorNormalCompletion = true
            ) {
              var tuple = _step.value;

              if (tuple.length == null) {
                throw new _exceptionsJSNetworkXError2["default"](
                  (0, _internals.sprintf)(
                    "Edge tuple %j must be a 2-tuple or 3-tuple.",
                    tuple
                  )
                );
              }

              var _tuple = _slicedToArray(tuple, 3);

              var u = _tuple[0];
              var v = _tuple[1];
              var data = _tuple[2];

              if (!(0, _internals.isPlainObject)(data)) {
                data = {};
              }
              if (u == null || v == null || tuple[3] != null) {
                throw new _exceptionsJSNetworkXError2["default"](
                  (0, _internals.sprintf)(
                    "Edge tuple %j must be a 2-tuple or 3-tuple.",
                    tuple
                  )
                );
              }

              if (!this.node.has(u)) {
                this.adj.set(u, new _internalsMap2["default"]());
                this.node.set(u, {});
              }
              if (!this.node.has(v)) {
                this.adj.set(v, new _internalsMap2["default"]());
                this.node.set(v, {});
              }

              // add the edge
              var datadict = this.adj.get(u).get(v) || {};
              _Object$assign(datadict, optAttrDict, data);
              this.adj.get(u).set(v, datadict);
              this.adj.get(v).set(u, datadict);
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
        },

        /**
         * Add all the edges in `ebunch` as weighted edges with specified weights.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addWeightedEdgesFrom([[0,1,3.0], [1,2,7.5]]);
         * ```
         *
         * ### Note
         *
         * Adding the same edge twice for Graph/DiGraph simply updates
         * the edge data.  For MultiGraph/MultiDiGraph, duplicate edges
         * are stored.
         *
         * @see #addEdge
         * @see #addEdgesFrom
         *
         * @param {Iterable} ebunch  container of edges
         *      Each edge given in the list or container will be added
         *      to the graph. The edges must be given as 3-tuples (u,v,w)
         *      where w is a number.
         * @param {string=} optWeight (default 'weight')
         *      The attribute name for the edge weights to be added.
         * @param {Object=} optAttr Edge attributes to add/update for all edges.
         */
      },
      {
        key: "addWeightedEdgesFrom",
        value: function addWeightedEdgesFrom(ebunch, optWeight, optAttr) {
          optAttr = optAttr || {};
          if (!(0, _lodashLangIsString2["default"])(optWeight)) {
            optAttr = optWeight;
            optWeight = "weight";
          }

          this.addEdgesFrom(
            (0, _internals.mapSequence)(ebunch, function (e) {
              var attr = {};
              attr[optWeight] = e[2];
              if (attr[optWeight] == null) {
                // simulate too few value to unpack error
                throw new TypeError(
                  "Values must consist of three elements: %s.",
                  e
                );
              }
              return [e[0], e[1], attr];
            }),
            optAttr
          );
        },

        /**
         * Remove the edge between u and v.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * G.removeEdge(0,1);
         * ```
         *
         * @see #removeEdgesFrom
         *
         * @param {Node} u Node
         * @param {Node} v Node
         */
      },
      {
        key: "removeEdge",
        value: function removeEdge(u, v) {
          var node = this.adj.get(u);
          if (node != null) {
            node["delete"](v);
            // self-loop needs only one entry removed
            var vnode = this.adj.get(v);
            if (vnode !== node) {
              vnode["delete"](u);
            }
          } else {
            throw new _exceptionsJSNetworkXError2["default"](
              "The edge %s-%s is not in the graph",
              u,
              v
            );
          }
        },

        /**
         * Remove all edges specified in `ebunch`.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * var ebunch = [[1,2], [2,3]];
         * G.removeEdgesFrom(ebunch);
         * ```
         *
         * ### Notes
         *
         * Will fail silently if an edge in `ebunch` is not in the graph.
         *
         * @param {Iterable} ebunch Iterable of edge tuples
         *      Each edge given in the list or container will be removed
         *      from the graph. The edges can be:
         *        - 2-tuples (u,v) edge between u and v.
         *        - 3-tuples (u,v,k) where k is ignored.
         */
      },
      {
        key: "removeEdgesFrom",
        value: function removeEdgesFrom(ebunch) {
          var adj = this.adj;
          (0, _internals.forEach)(ebunch, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var u = _ref2[0];
            var v = _ref2[1];

            var unode = adj.get(u);
            if (unode != null && unode.has(v)) {
              unode["delete"](v);
              var vnode = adj.get(v);
              if (vnode !== unode) {
                vnode["delete"](u);
              }
            }
          });
        },

        /**
         * Return True if the edge (u,v) is in the graph.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * G.hasEdge(0, 1);
         * // true
         * var edge = [0, 1];
         * G.hasEdge.apply(G, edge);
         * // true
         * ```
         *
         * @param {Node} u Node.
         * @param {Node} v Node.
         *
         * @return {boolean} True if edge is in the graph, False otherwise.
         */
      },
      {
        key: "hasEdge",
        value: function hasEdge(u, v) {
          var unode = this.adj.get(u);
          return unode && unode.has(v);
        },

        /**
         * Return a list of the nodes connected to the node n.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * G.neighbors(0);
         * // [1]
         * ```
         *
         * ### Notes
         *
         * It can be more convenient to access the adjacency map as `G.get(n)`:
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addEdge('a', 'b', {weight: 7});
         * G.get('a');
         * // Map {'b': {weight: 7}}
         * ```
         *
         * @param {!Node} n A node in the graph.
         * @return {!Array} A list of nodes that are adjacent to n.
         */
      },
      {
        key: "neighbors",
        value: function neighbors(n) {
          return _Array$from(this.neighborsIter(n));
        },

        /**
         * Return an iterator over all neighbors of node n.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * Array.from(G.neighborsIter(0));
         * // [1]
         * ```
         *
         * You could also iterate over the adjacency map instead:
         *
         * ```
         * Array.from(G.get(0).keys());
         * ```
         *
         * @param {!Node} n A node in the graph.
         * @return {!Iterator} A list of nodes that are adjacent to n.
         */
      },
      {
        key: "neighborsIter",
        value: function neighborsIter(n) {
          var node = this.adj.get(n);
          if (node != null) {
            return node.keys();
          } else {
            throw new _exceptionsJSNetworkXError2["default"](
              "The node %s is not in the graph.",
              n
            );
          }
        },

        /**
         * Return a list of edges.
         *
         * Edges are returned as tuples with optional data
         * in the order (node, neighbor, data).
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2]);
         * G.addEdge(2, 3, {weight: 5});
         * G.edges();
         * // [[0,1], [1,2], [2,3]]
         * G.edges(true);
         * // [[0,1,{}], [1,2,{}], [2,3, {weight: 5}]
         * G.edges([0,3]);
         * // [[0,1], [3,2]]
         * G.edges(0);
         * // [[0,1]]
         * ```
         *
         * ### Note
         *
         * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
         * For directed graphs this returns the out-edges.
         *
         * @param {?(Node|Iterable)=} optNbunch A container of nodes.
         *      The container will be iterated through once.
         * @param {?boolean=} optData Return two tuples (u,v) (False)
         *      or three-tuples (u,v,data) (True).
         * @return {!Array} list of edge tuples
         *      Edges that are adjacent to any node in nbunch, or a list
         *      of all edges if nbunch is not specified.
         */
      },
      {
        key: "edges",
        value: function edges(optNbunch) {
          var optData =
            arguments.length <= 1 || arguments[1] === undefined
              ? false
              : arguments[1];

          return _Array$from(this.edgesIter(optNbunch, optData));
        },

        /**
         * Return an iterator over the edges.
         *
         * Edges are returned as tuples with optional data
         * in the order (node, neighbor, data).
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2]);
         * G.addEdge(2, 3, {weight: 5});
         * Array.from(G.edgesIter());
         * // [[0,1], [1,2], [2,3]]
         * Array.from(G.edgesIter(true));
         * // [[0,1,{}], [1,2,{}], [2,3, {weight: 5}]
         * Array.from(G.edgesIter([0,3]));
         * // [[0,1], [3,2]]
         * Array.from(G.edgesIter(0));
         * // [[0,1]]
         * ```
         *
         * ### Note
         *
         * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
         * For directed graphs this returns the out-edges.
         *
         * @param {?(Node|Iterable)=} optNbunch A container of nodes.
         *      The container will be iterated through once.
         * @param {?boolean=} optData Return two tuples (u,v) (False)
         *      or three-tuples (u,v,data) (True).
         * @return {!Iterator} iterater if `(u,v)` or `(u,v,d)` edge tuples
         */
      },
      {
        key: "edgesIter",
        value: _regeneratorRuntime.mark(function edgesIter(optNbunch) {
          var optData =
            arguments.length <= 1 || arguments[1] === undefined
              ? false
              : arguments[1];

          var seen,
            nodesNbrs,
            adj,
            _iteratorNormalCompletion2,
            _didIteratorError2,
            _iteratorError2,
            _iterator2,
            _step2,
            nodeData,
            node,
            _iteratorNormalCompletion3,
            _didIteratorError3,
            _iteratorError3,
            _iterator3,
            _step3,
            neighborsData;

          return _regeneratorRuntime.wrap(
            function edgesIter$(context$2$0) {
              while (1)
                switch ((context$2$0.prev = context$2$0.next)) {
                  case 0:
                    // handle calls with data being the only argument
                    if ((0, _lodashLangIsBoolean2["default"])(optNbunch)) {
                      optData = optNbunch;
                      optNbunch = null;
                    }

                    // helper dict to keep track of multiply stored edges
                    seen = new _internalsSet2["default"]();

                    if (optNbunch == null) {
                      nodesNbrs = this.adj.entries();
                    } else {
                      adj = this.adj;

                      nodesNbrs = (0, _internals.mapIterator)(
                        this.nbunchIter(optNbunch),
                        function (n) {
                          return (0, _internals.tuple2)(n, adj.get(n));
                        }
                      );
                    }

                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    context$2$0.prev = 6;
                    _iterator2 = _getIterator(nodesNbrs);

                  case 8:
                    if (
                      (_iteratorNormalCompletion2 = (_step2 = _iterator2.next())
                        .done)
                    ) {
                      context$2$0.next = 49;
                      break;
                    }

                    nodeData = _step2.value;
                    node = nodeData[0];
                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    context$2$0.prev = 14;
                    _iterator3 = _getIterator(nodeData[1].entries());

                  case 16:
                    if (
                      (_iteratorNormalCompletion3 = (_step3 = _iterator3.next())
                        .done)
                    ) {
                      context$2$0.next = 30;
                      break;
                    }

                    neighborsData = _step3.value;

                    if (seen.has(neighborsData[0])) {
                      context$2$0.next = 27;
                      break;
                    }

                    if (!optData) {
                      context$2$0.next = 25;
                      break;
                    }

                    neighborsData.unshift(node);
                    context$2$0.next = 23;
                    return neighborsData;

                  case 23:
                    context$2$0.next = 27;
                    break;

                  case 25:
                    context$2$0.next = 27;
                    return [node, neighborsData[0]];

                  case 27:
                    _iteratorNormalCompletion3 = true;
                    context$2$0.next = 16;
                    break;

                  case 30:
                    context$2$0.next = 36;
                    break;

                  case 32:
                    context$2$0.prev = 32;
                    context$2$0.t0 = context$2$0["catch"](14);
                    _didIteratorError3 = true;
                    _iteratorError3 = context$2$0.t0;

                  case 36:
                    context$2$0.prev = 36;
                    context$2$0.prev = 37;

                    if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                      _iterator3["return"]();
                    }

                  case 39:
                    context$2$0.prev = 39;

                    if (!_didIteratorError3) {
                      context$2$0.next = 42;
                      break;
                    }

                    throw _iteratorError3;

                  case 42:
                    return context$2$0.finish(39);

                  case 43:
                    return context$2$0.finish(36);

                  case 44:
                    seen.add(node);
                    nodeData.length = 0;

                  case 46:
                    _iteratorNormalCompletion2 = true;
                    context$2$0.next = 8;
                    break;

                  case 49:
                    context$2$0.next = 55;
                    break;

                  case 51:
                    context$2$0.prev = 51;
                    context$2$0.t1 = context$2$0["catch"](6);
                    _didIteratorError2 = true;
                    _iteratorError2 = context$2$0.t1;

                  case 55:
                    context$2$0.prev = 55;
                    context$2$0.prev = 56;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                      _iterator2["return"]();
                    }

                  case 58:
                    context$2$0.prev = 58;

                    if (!_didIteratorError2) {
                      context$2$0.next = 61;
                      break;
                    }

                    throw _iteratorError2;

                  case 61:
                    return context$2$0.finish(58);

                  case 62:
                    return context$2$0.finish(55);

                  case 63:
                  case "end":
                    return context$2$0.stop();
                }
            },
            edgesIter,
            this,
            [
              [6, 51, 55, 63],
              [14, 32, 36, 44],
              [37, , 39, 43],
              [56, , 58, 62],
            ]
          );
        }),

        /**
         * Return the attribute object associated with edge (u,v).
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * G.getEdgeData(0,1);
         * // {}
         * ```
         *
         * If the edge exists, it may be simpler to access `G.get(0).get(1)`.
         *
         * @param {Node} u Node.
         * @param {Node} v Node.
         * @param {*} optDefault
         *   Value to return if the edge (u,v) is not found.
         * @return {*} The edge attribute object.
         */
      },
      {
        key: "getEdgeData",
        value: function getEdgeData(u, v) {
          var optDefault =
            arguments.length <= 2 || arguments[2] === undefined
              ? null
              : arguments[2];

          var nbrs = this.adj.get(u);
          if (nbrs != null) {
            var data = nbrs.get(v);
            if (data != null) {
              return data;
            }
          }
          return optDefault;
        },

        /**
         * Return an adjacency list representation of the graph.
         *
         * The output adjacency list is in the order of G.nodes().
         * For directed graphs, only outgoing adjacencies are included.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * G.adjacencyList();
         * // [[1], [0,2], [1,3], [2]]
         * ```
         *
         * @return {!Array.<Array>} The adjacency structure of the graph as a
         *      list of lists.
         */
      },
      {
        key: "adjacencyList",
        value: function adjacencyList() {
          /*eslint no-unused-vars:0*/
          return _Array$from(
            (0, _internals.mapIterator)(this.adjacencyIter(), function (_ref3) {
              var _ref32 = _slicedToArray(_ref3, 2);

              var _ = _ref32[0];
              var adj = _ref32[1];
              return _Array$from(adj.keys());
            })
          );
        },

        /**
         * Return an iterator of (node, adjacency map) tuples for all nodes.
         *
         * For directed graphs, only outgoing adjacencies are included.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * Array.from(G.adjacencyIter());
         * // [
         * //   [0, Map {1: {}}],
         * //   [1, Map {0: {}, 2: {}}],
         * //   [2, Map {1: {}, 3: {}}],
         * //   [3, Map {2: {}]]
         * // ]
         * ```
         *
         * @return {!Iterator} An array of (node, adjacency map) tuples
         *      for all nodes in the graph.
         */
      },
      {
        key: "adjacencyIter",
        value: function adjacencyIter() {
          return this.adj.entries();
        },

        /**
         * Return the degree of a node or nodes.
         *
         * The node degree is the number of edges adjacent to that node.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph();  // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3])
         * G.degree(0)
         * // 1
         * G.degree([0,1])
         * // Map {0: 1, 1: 2}
         * Array.from(G.degree([0,1]).values())
         * // [1, 2]
         * ```
         *
         * @param {(Node|Iterable)=} optNbunch (default=all nodes)
         *      An iterable of nodes.  The iterable will be iterated
         *      through once.
         * @param {string=} optWeight
         *      The edge attribute that holds the numerical value used
         *      as a weight.  If null or not defined, then each edge has weight 1.
         *      The degree is the sum of the edge weights adjacent to the node.
         * @return {!(number|Map)} A dictionary with nodes as keys and
         *      degree as values or a number if a single node is specified.
         */
      },
      {
        key: "degree",
        value: function degree(optNbunch, optWeight) {
          if (optNbunch != null && this.hasNode(optNbunch)) {
            // return a single node
            return this.degreeIter(optNbunch, optWeight).next().value[1];
          } else {
            return new _internalsMap2["default"](
              this.degreeIter(optNbunch, optWeight)
            );
          }
        },

        /**
         * Return an array for (node, degree).
         *
         * The node degree is the number of edges adjacent to that node.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph();  // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3])
         * Array.from(G.degreeIter(0));
         * // [[0, 1]]
         * Array.from(G.degreeIter([0,1]));
         * // [[0, 1], [1, 2]]
         * ```
         *
         * @param {(Node|Iterable)=} optNbunch (default=all nodes)
         *       A container of nodes.  The container will be iterated
         *       through once.
         * @param {string=} optWeight
         *      The edge attribute that holds the numerical value used
         *      as a weight.  If null or not defined, then each edge has weight 1.
         *      The degree is the sum of the edge weights adjacent to the node.
         * @return {!Iterator} of two-tuples of (node, degree).
         *
         * @export
         */
      },
      {
        key: "degreeIter",
        value: function degreeIter(optNbunch, optWeight) {
          // istanbul ignore next

          var _this = this;

          var nodesNbrs;
          var iterator;

          if (optNbunch == null) {
            nodesNbrs = this.adj.entries();
          } else {
            (function () {
              var adj = _this.adj;
              nodesNbrs = (0, _internals.mapIterator)(
                _this.nbunchIter(optNbunch),
                function (n) {
                  return (0, _internals.tuple2)(n, adj.get(n));
                }
              );
            })();
          }

          if (!optWeight) {
            iterator = (0, _internals.mapIterator)(nodesNbrs, function (_ref4) {
              var _ref42 = _slicedToArray(_ref4, 2);

              var node = _ref42[0];
              var nbrs = _ref42[1];

              return [node, nbrs.size + +nbrs.has(node)];
            });
          } else {
            iterator = (0, _internals.mapIterator)(nodesNbrs, function (_ref5) {
              var _ref52 = _slicedToArray(_ref5, 2);

              var n = _ref52[0];
              var nbrs = _ref52[1];

              var sum = 0;

              nbrs.forEach(function (data) {
                var weight = data[optWeight];
                sum += +(weight != null ? weight : 1);
              });

              if (nbrs.has(n)) {
                var weight = nbrs.get(n)[optWeight];
                sum += +(weight != null ? weight : 1);
              }

              return [n, sum];
            });
          }

          return iterator;
        },

        /**
         * Remove all nodes and edges from the graph.
         *
         * This also removes the name, and all graph, node, and edge attributes.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph(); // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * G.clear();
         * G.nodes();
         * // []
         * G.edges();
         * // []
         * ```
         */
      },
      {
        key: "clear",
        value: function clear() {
          this.name = "";
          this.adj.clear();
          this.node.clear();
          (0, _internals.clear)(this.graph);
        },

        /**
         * Return a copy of the graph.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph(); // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * var H = G.copy();
         * ```
         *
         * ### Notes
         *
         * This makes a complete copy of the graph including all of the
         * node or edge attributes.
         *
         * @return {!Graph}
         */
      },
      {
        key: "copy",
        value: function copy() {
          return (0, _internals.deepcopy)(this);
        },

        /**
         * Return True if graph is a multigraph, False otherwise.
         *
         * @return {boolean} True if graph is a multigraph, False otherwise.
         */
      },
      {
        key: "isMultigraph",
        value: function isMultigraph() {
          return false;
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
          return false;
        },

        /**
         * Return a directed representation of the graph.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph(); // or MultiGraph, etc
         * G.addPath([0,1]);
         * var H = G.toDirected();
         * H.edges();
         * // [[0,1], [1,0]]
         * ```
         *
         * If already directed, return a (deep) copy
         *
         * ```
         * var G = new jsnx.DiGraph(); // or MultiDiGraph, etc
         * G.addPath([0,1]);
         * var H = G.toDirected();
         * H.edges();
         * // [[0,1]]
         * ```
         *
         * ### Notes
         *
         * This returns a "deepcopy" of the edge, node, and
         * graph attributes which attempts to completely copy
         * all of the data and references.
         *
         * This is in contrast to the similar `var H = new jsnx.DiGraph(G)` which
         * returns a shallow copy of the data.
         *
         * @return {!DiGraph}
         *   A directed graph with the same name, same nodes, and with
         *   each edge (u,v,data) replaced by two directed edges
         *   (u,v,data) and (v,u,data).
         */
      },
      {
        key: "toDirected",
        value: function toDirected() {
          var G = new (require("./DiGraph"))();
          G.name = this.name;
          G.addNodesFrom(this);
          G.addEdgesFrom(
            _regeneratorRuntime
              .mark(function callee$2$0() {
                var _iteratorNormalCompletion4,
                  _didIteratorError4,
                  _iteratorError4,
                  _iterator4,
                  _step4,
                  nd,
                  u,
                  _iteratorNormalCompletion5,
                  _didIteratorError5,
                  _iteratorError5,
                  _iterator5,
                  _step5,
                  nbr;

                return _regeneratorRuntime.wrap(
                  function callee$2$0$(context$3$0) {
                    while (1)
                      switch ((context$3$0.prev = context$3$0.next)) {
                        case 0:
                          _iteratorNormalCompletion4 = true;
                          _didIteratorError4 = false;
                          _iteratorError4 = undefined;
                          context$3$0.prev = 3;
                          _iterator4 = _getIterator(this.adjacencyIter());

                        case 5:
                          if (
                            (_iteratorNormalCompletion4 = (_step4 =
                              _iterator4.next()).done)
                          ) {
                            context$3$0.next = 37;
                            break;
                          }

                          nd = _step4.value;
                          u = nd[0];
                          _iteratorNormalCompletion5 = true;
                          _didIteratorError5 = false;
                          _iteratorError5 = undefined;
                          context$3$0.prev = 11;
                          _iterator5 = _getIterator(nd[1]);

                        case 13:
                          if (
                            (_iteratorNormalCompletion5 = (_step5 =
                              _iterator5.next()).done)
                          ) {
                            context$3$0.next = 20;
                            break;
                          }

                          nbr = _step5.value;
                          context$3$0.next = 17;
                          return (0, _internals.tuple3)(
                            u,
                            nbr[0],
                            (0, _internals.deepcopy)(nbr[1])
                          );

                        case 17:
                          _iteratorNormalCompletion5 = true;
                          context$3$0.next = 13;
                          break;

                        case 20:
                          context$3$0.next = 26;
                          break;

                        case 22:
                          context$3$0.prev = 22;
                          context$3$0.t0 = context$3$0["catch"](11);
                          _didIteratorError5 = true;
                          _iteratorError5 = context$3$0.t0;

                        case 26:
                          context$3$0.prev = 26;
                          context$3$0.prev = 27;

                          if (
                            !_iteratorNormalCompletion5 &&
                            _iterator5["return"]
                          ) {
                            _iterator5["return"]();
                          }

                        case 29:
                          context$3$0.prev = 29;

                          if (!_didIteratorError5) {
                            context$3$0.next = 32;
                            break;
                          }

                          throw _iteratorError5;

                        case 32:
                          return context$3$0.finish(29);

                        case 33:
                          return context$3$0.finish(26);

                        case 34:
                          _iteratorNormalCompletion4 = true;
                          context$3$0.next = 5;
                          break;

                        case 37:
                          context$3$0.next = 43;
                          break;

                        case 39:
                          context$3$0.prev = 39;
                          context$3$0.t1 = context$3$0["catch"](3);
                          _didIteratorError4 = true;
                          _iteratorError4 = context$3$0.t1;

                        case 43:
                          context$3$0.prev = 43;
                          context$3$0.prev = 44;

                          if (
                            !_iteratorNormalCompletion4 &&
                            _iterator4["return"]
                          ) {
                            _iterator4["return"]();
                          }

                        case 46:
                          context$3$0.prev = 46;

                          if (!_didIteratorError4) {
                            context$3$0.next = 49;
                            break;
                          }

                          throw _iteratorError4;

                        case 49:
                          return context$3$0.finish(46);

                        case 50:
                          return context$3$0.finish(43);

                        case 51:
                        case "end":
                          return context$3$0.stop();
                      }
                  },
                  callee$2$0,
                  this,
                  [
                    [3, 39, 43, 51],
                    [11, 22, 26, 34],
                    [27, , 29, 33],
                    [44, , 46, 50],
                  ]
                );
              })
              .call(this)
          );
          G.graph = (0, _internals.deepcopy)(this.graph);
          G.node = (0, _internals.deepcopy)(this.node);

          return G;
        },

        /**
         * Return an undirected copy of the graph.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph(); // or MultiGraph, etc
         * G.addPath([0,1]);
         * var H = G.toDirected();
         * G.edges();
         * // [[0,1], [1,0]]
         * var G2 = H.toUndirected();
         * G2.edges();
         * // [[0,1]]
         * ```
         *
         * ### Notes
         *
         * This returns a "deepcopy" of the edge, node, and
         * graph attributes which attempts to completely copy
         * all of the data and references.
         *
         * This is in contrast to the similar `var H = new jsnx.Graph(G);` which
         * returns a shallow copy of the data.
         *
         * @return {!Graph} A deepcopy of the graph.
         * @export
         */
      },
      {
        key: "toUndirected",
        value: function toUndirected() {
          return (0, _internals.deepcopy)(this);
        },

        /**
         * Return the subgraph induced on nodes in nbunch.
         *
         * The induced subgraph of the graph contains the nodes in nbunch
         * and the edges between those nodes.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * var H = G.subgraph([0,1,2]);
         * H.edges();
         * // [[0,1], [1,2]]
         * ```
         *
         * ### Notes
         *
         * The graph, edge or node attributes just point to the original graph.
         * So changes to the node or edge structure will not be reflected in
         * the original graph while changes to the attributes will.
         *
         * To create a subgraph with its own copy of the edge/node attributes use:
         * `new jsnx.Graph(G.subgraph(nbunch))`.
         *
         * For an inplace reduction of a graph to a subgraph you can remove nodes:
         *
         * ```
         * G.removeNodesFrom(G.nodes().filter(function(n) {
         *      return nbunch.indexOf(n) > -1;
         * }))
         * ```
         *
         * @param {Iterable} nbunch
         *      An iterable of nodes which will be iterated through once.
         * @return {Graph}
         */
      },
      {
        key: "subgraph",
        value: function subgraph(nbunch) {
          var bunch = this.nbunchIter(nbunch);
          var n;

          // create new graph and copy subgraph into it
          var H = new this.constructor();
          // copy node and attribute dictionaries
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (
              var _iterator6 = _getIterator(bunch), _step6;
              !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
              _iteratorNormalCompletion6 = true
            ) {
              n = _step6.value;

              H.node.set(n, this.node.get(n));
            }
            // namespace shortcuts for speed
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

          var HAdj = H.adj;
          var thisAdj = this.adj;

          // add nodes and edges (undirected method)
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (
              var _iterator7 = _getIterator(H), _step7;
              !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);
              _iteratorNormalCompletion7 = true
            ) {
              n = _step7.value;

              var Hnbrs = new _internalsMap2["default"]();
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
                  var nbrdata = _step8.value;

                  var nbr = nbrdata[0];
                  var data = nbrdata[1];
                  if (HAdj.has(nbr)) {
                    // add both representations of edge: n-nbr and nbr-n
                    Hnbrs.set(nbr, data);
                    HAdj.get(nbr).set(n, data);
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

        /**
         * Return a list of nodes with self loops.
         *
         * A node with a self loop has an edge with both ends adjacent
         * to that node.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addEdge(1, 1)
         * G.addEdge(1, 2)
         * G.nodesWithSelfloops()
         * // [1]
         * ```
         *
         * @return {Array} A list of nodes with self loops.
         */
      },
      {
        key: "nodesWithSelfloops",
        value: function nodesWithSelfloops() {
          var nodes = [];
          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (
              var _iterator9 = _getIterator(this.adj.entries()), _step9;
              !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done);
              _iteratorNormalCompletion9 = true
            ) {
              var nd = _step9.value;

              if (nd[1].has(nd[0])) {
                nodes.push(nd[0]);
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

          return nodes;
        },

        /**
         * Return a list of selfloop edges.
         *
         * A selfloop edge has the same node at both ends.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addEdge(1,1)
         * G.addEdge(1,2)
         * G.selfloopEdges()
         * // [(1, 1)]
         * G.selfloop_edges(true)
         * // [(1, 1, {})]
         * ```
         *
         * @param {boolean=} optData
         *      Return selfloop edges as two tuples (u,v) (data=False)
         *      or three-tuples (u,v,data) (data=True).
         *
         * @return {Array}  A list of all selfloop edges.
         */
      },
      {
        key: "selfloopEdges",
        value: function selfloopEdges() {
          var optData =
            arguments.length <= 0 || arguments[0] === undefined
              ? false
              : arguments[0];

          var edges = [];

          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (
              var _iterator10 = _getIterator(this.adj.entries()), _step10;
              !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next())
                .done);
              _iteratorNormalCompletion10 = true
            ) {
              var nd = _step10.value;

              var _nd = _slicedToArray(nd, 2);

              var node = _nd[0];
              var nbrs = _nd[1];

              if (nbrs.has(node)) {
                if (optData) {
                  edges.push(
                    (0, _internals.tuple3c)(node, node, nbrs.get(node), nd)
                  );
                } else {
                  edges.push((0, _internals.tuple2c)(node, node, nd));
                }
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

          return edges;
        },

        /**
         * Return the number of selfloop edges.
         *
         * A selfloop edge has the same node at both ends.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.add_edge(1,1)
         * G.add_edge(1,2)
         * G.number_of_selfloops()
         * // 1
         * ```
         *
         * @return {number} The number of selfloops.
         */
      },
      {
        key: "numberOfSelfloops",
        value: function numberOfSelfloops() {
          return this.selfloopEdges().length;
        },

        /**
         * Return the number of edges.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3])
         * G.size()
         * // 3
         *
         * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addEdge('a',' b', {weight: 2});
         * G.addEdge('b', 'c', {weight: 4});
         * G.size()
         * // 2
         * G.size('weight');
         * // 6.0
         * ```
         *
         * @param {string=} optWeight The edge attribute that holds the numerical
         *      value used as a weight.  If not defined, then each edge has weight 1.
         * @return {number} The number of edges or sum of edge weights in the graph.
         */
      },
      {
        key: "size",
        value: function size(optWeight) {
          var s = 0;
          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (
              var _iterator11 = _getIterator(
                  this.degree(null, optWeight).values()
                ),
                _step11;
              !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next())
                .done);
              _iteratorNormalCompletion11 = true
            ) {
              var v = _step11.value;

              s += v;
            }
          } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
                _iterator11["return"]();
              }
            } finally {
              if (_didIteratorError11) {
                throw _iteratorError11;
              }
            }
          }

          s = s / 2;

          if (optWeight == null) {
            return Math.floor(s); // int(s)
          } else {
            return s; // no need to cast to float
          }
        },

        /**
         * Return the number of edges between two nodes.
         *
         * ### Examples
         *
         * ```
         * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * G.numberOfEdges();
         * // 3
         * G.number_of_edges(0,1);
         * // 1
         * ```
         *
         * @param {!Node=} u node.
         * @param {!Node=} v node
         *       If u and v are both specified, return the number of edges between
         *       u and v. Otherwise return the total number of all edges.
         * @return {number} The number of edges in the graph.
         *      If nodes u and v are specified return the number of edges between
         *      those nodes.
         */
      },
      {
        key: "numberOfEdges",
        value: function numberOfEdges(u, v) {
          if (u == null) {
            return Math.floor(this.size());
          }
          if (this.adj.get(u).has(v)) {
            return 1;
          } else {
            return 0;
          }
        },

        /**
         * Add a star.
         *
         * ### Examples
         * ```
         * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addStar([0,1,2,3]);
         * G.addStar([10,11,12], {weight: 2});
         * ```
         *
         * The first node in nodes is the middle of the star.  It is connected
         * to all other nodes.
         *
         * @param {Iterable} nodes A container of nodes.
         * @param {Object=} optAttr  Attributes to add to every edge in the star.
         */
      },
      {
        key: "addStar",
        value: function addStar(nodes, optAttr) {
          var niter = (0, _internals.toIterator)(nodes);
          var v = niter.next().value;
          var edges = (0, _internals.mapIterator)(niter, function (n) {
            return (0, _internals.tuple2)(v, n);
          });
          this.addEdgesFrom(edges, optAttr);
        },

        /**
         * Add a path.
         *
         * ### Examples
         *
         * ```
         * var G= new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addPath([0,1,2,3]);
         * G.addPath([10,11,12], {weight: 7});
         * ```
         *
         * @param {Iterable} nodes A container of nodes.
         *      A path will be constructed from the nodes (in order)
         *      and added to the graph.
         * @param {Object=} optAttr Attributes to add to every edge in path.
         */
      },
      {
        key: "addPath",
        value: function addPath(nodes, optAttr) {
          var nlist = _Array$from(nodes);
          var edges = (0, _internals.zipSequence)(
            nlist.slice(0, nlist.length - 1),
            nlist.slice(1)
          );
          this.addEdgesFrom(edges, optAttr);
        },

        /**
         * Add a cycle.
         *
         * ### Examples
         *
         * ```
         * var G= new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addCycle([0,1,2,3]);
         * G.addCycle([10,11,12], {weight: 7});
         * ```
         *
         * @param {Iterable} nodes A container of nodes.
         *      A cycle will be constructed from the nodes (in order)
         *      and added to the graph.
         * @param {Object=} optAttr  Attributes to add to every edge in cycle.
         */
      },
      {
        key: "addCycle",
        value: function addCycle(nodes, optAttr) {
          var nlist = _Array$from(nodes);
          var edges = (0, _internals.zipSequence)(
            nlist,
            nlist.slice(1).concat([nlist[0]])
          );
          this.addEdgesFrom(edges, optAttr);
        },

        /**
         * Return an iterator of nodes contained in `nbunch` that are
         * also in the graph.
         *
         * The nodes in `nbunch` are checked for membership in the graph
         * and if not are silently ignored.
         *
         * ### Notes
         *
         * When `nbunch` is an iterator, the returned iterator yields values
         * directly from `nbunch`, becoming exhausted when `nbunch` is exhausted.
         *
         * To test whether `nbunch` is a single node, one can use
         * `if (this.hasNode(nbunch))`, even after processing with this routine.
         *
         * If `nbunch` is not a node or a (possibly empty) sequence/iterator
         * or not defined, an Error is raised.
         *
         * @param {(Node|Iterable)=} optNbunch (default=all nodes)
         *      A container of nodes.  The container will be iterated
         *      through once.
         * @return {!Iterator} An iterator over nodes in nbunch
         *      that are also in the graph.
         *      If nbunch is null or not defined, iterate over all nodes in the graph.
         */
      },
      {
        key: "nbunchIter",
        value: _regeneratorRuntime.mark(function nbunchIter(optNbunch) {
          var adj,
            _iteratorNormalCompletion12,
            _didIteratorError12,
            _iteratorError12,
            _iterator12,
            _step12,
            n;

          return _regeneratorRuntime.wrap(
            function nbunchIter$(context$2$0) {
              while (1)
                switch ((context$2$0.prev = context$2$0.next)) {
                  case 0:
                    if (!(optNbunch == null)) {
                      context$2$0.next = 4;
                      break;
                    }

                    return context$2$0.delegateYield(this.adj.keys(), "t0", 2);

                  case 2:
                    context$2$0.next = 44;
                    break;

                  case 4:
                    if (!this.hasNode(optNbunch)) {
                      context$2$0.next = 9;
                      break;
                    }

                    context$2$0.next = 7;
                    return optNbunch;

                  case 7:
                    context$2$0.next = 44;
                    break;

                  case 9:
                    adj = this.adj;
                    context$2$0.prev = 10;
                    _iteratorNormalCompletion12 = true;
                    _didIteratorError12 = false;
                    _iteratorError12 = undefined;
                    context$2$0.prev = 14;
                    _iterator12 = _getIterator(
                      (0, _internals.toIterator)(optNbunch)
                    );

                  case 16:
                    if (
                      (_iteratorNormalCompletion12 = (_step12 =
                        _iterator12.next()).done)
                    ) {
                      context$2$0.next = 24;
                      break;
                    }

                    n = _step12.value;

                    if (!adj.has(n)) {
                      context$2$0.next = 21;
                      break;
                    }

                    context$2$0.next = 21;
                    return n;

                  case 21:
                    _iteratorNormalCompletion12 = true;
                    context$2$0.next = 16;
                    break;

                  case 24:
                    context$2$0.next = 30;
                    break;

                  case 26:
                    context$2$0.prev = 26;
                    context$2$0.t1 = context$2$0["catch"](14);
                    _didIteratorError12 = true;
                    _iteratorError12 = context$2$0.t1;

                  case 30:
                    context$2$0.prev = 30;
                    context$2$0.prev = 31;

                    if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
                      _iterator12["return"]();
                    }

                  case 33:
                    context$2$0.prev = 33;

                    if (!_didIteratorError12) {
                      context$2$0.next = 36;
                      break;
                    }

                    throw _iteratorError12;

                  case 36:
                    return context$2$0.finish(33);

                  case 37:
                    return context$2$0.finish(30);

                  case 38:
                    context$2$0.next = 44;
                    break;

                  case 40:
                    context$2$0.prev = 40;
                    context$2$0.t2 = context$2$0["catch"](10);

                    if (!(context$2$0.t2 instanceof TypeError)) {
                      context$2$0.next = 44;
                      break;
                    }

                    throw new _exceptionsJSNetworkXError2["default"](
                      "nbunch is not a node or a sequence of nodes"
                    );

                  case 44:
                  case "end":
                    return context$2$0.stop();
                }
            },
            nbunchIter,
            this,
            [
              [10, 40],
              [14, 26, 30, 38],
              [31, , 33, 37],
            ]
          );
        }),

        /**
         * A graph is an iterable over its nodes.
         *
         * ### Example
         *
         * ```
         * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
         * G.addNodesFrom([0,1,2,3]);
         * for (var node of G) {
         *   console.log(node);
         * }
         * ```
         *
         * @return {Iterator}
         */
      },
      {
        key: _Symbol$iterator,
        value: function value() {
          return this.node.keys();
        },
      },
      {
        key: "name",

        /**
         * Gets or sets the name of the graph.
         *
         * @param {string=} opt_name Graph name.
         * @return {(string|undefined)} Graph name if no parameter was passed.
         */
        get: function get() {
          return this.graph.name || "";
        },
        set: function set(name) {
          this.graph.name = name;
        },
      },
    ],
    [
      {
        key: "__name__",
        get: function get() {
          return "Graph";
        },
      },
    ]
  );

  return Graph;
})();

exports["default"] = Graph;
module.exports = exports["default"];
// include all nodes
/*jshint expr:true*/
// if nbunch is a single node
// if nbunch is a sequence of nodes
