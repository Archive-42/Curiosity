"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Map = require("babel-runtime/core-js/map")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.nodes = nodes;
exports.nodesIter = nodesIter;
exports.edges = edges;
exports.edgesIter = edgesIter;
exports.degree = degree;
exports.neighbors = neighbors;
exports.numberOfNodes = numberOfNodes;
exports.numberOfEdges = numberOfEdges;
exports.density = density;
exports.degreeHistogram = degreeHistogram;
exports.isDirected = isDirected;
exports.freeze = freeze;
exports.isFrozen = isFrozen;
exports.subgraph = subgraph;
exports.createEmptyCopy = createEmptyCopy;
exports.info = info;
exports.setNodeAttributes = setNodeAttributes;
exports.getNodeAttributes = getNodeAttributes;
exports.setEdgeAttributes = setEdgeAttributes;
exports.getEdgeAttributes = getEdgeAttributes;

var _exceptionsJSNetworkXError = require("../exceptions/JSNetworkXError");

var _exceptionsJSNetworkXError2 = _interopRequireDefault(
  _exceptionsJSNetworkXError
);

var _internals = require("../_internals");

/**
 * Return a copy of the graph nodes in a list.
 *
 * @param {Graph} G Graph
 * @return {Array} List of nodes
 */

function nodes(G) {
  return G.nodes();
}

/**
 * Return an iterator over the graph nodes.
 *
 * @param {Graph} G Graph
 * @return {Iterator} Iterator over graph nodes
 */

function nodesIter(G) {
  return G.nodesIter();
}

/**
 * Return a list of edges adjacent to nodes in nbunch.
 *
 * Return all edges if nbunch is unspecified or nbunch=None.
 * For digraphs, edges=out_edges
 *
 * @param {Graph} G Graph
 * @param {NodeContainer=} opt_nbunch Nodes
 * @return {Array} List of edges
 */

function edges(G, optNbunch) {
  return G.edges(optNbunch);
}

/**
 * Return iterator over  edges adjacent to nodes in nbunch.
 *
 * Return all edges if nbunch is unspecified or nbunch=None.
 * For digraphs, edges=out_edges
 *
 * @param {Graph} G Graph
 * @param {NodeContainer=} opt_nbunch Nodes
 * @return {Iterator} Iterator over edges
 */

function edgesIter(G, optNbunch) {
  return G.edgesIter(optNbunch);
}

/**
 * Return degree of single node or of nbunch of nodes.
 * If nbunch is omitted, then return degrees of *all* nodes.
 *
 * @param {Graph} G Graph
 * @param {NodeContainer=} opt_nbunch Nodes
 * @param {string=} opt_weight Weight attribute name
 * @return {(number|Map)} Degree of node(s)
 */

function degree(G, optNbunch, optWeight) {
  return G.degree(optNbunch, optWeight);
}

/**
 * Return a list of nodes connected to node n.
 *
 * @param {Graph} G Graph
 * @param {Node} n Node
 * @return {Array} List of nodes
 */

function neighbors(G, n) {
  return G.neighbors(n);
}

/**
 * Return the number of nodes in the graph.
 *
 * @param {Graph} G Graph
 * @return {number} Number of nodes
 */

function numberOfNodes(G) {
  return G.numberOfNodes();
}

/**
 * Return the number of edges in the graph.
 *
 * @param {Graph} G Graph
 * @return {number} Number of edges
 */

function numberOfEdges(G) {
  return G.numberOfEdges();
}

/**
 * Return the density of a graph.
 * The density for undirected graphs is
 *
 * ```math
 * d = \frac{2m}{n(n-1)}
 * ```
 *
 * and for directed graphs is
 *
 * ```math
 * \frac{m}{n(n-1)}
 * ```
 *
 * where n is the number of nodes and m is the number of edges in G
 *
 * The density is 0 for an graph without edges and 1.0 for a complete graph.
 * The density of multigraphs can be higher than 1.
 *
 * @param {Graph} G Graph
 * @return {number} Density
 */

function density(G) {
  var n = G.numberOfNodes();
  var m = G.numberOfEdges();
  var d;

  if (m === 0) {
    // includes cases n === 0 and n === 1
    d = 0.0;
  } else {
    if (G.isDirected()) {
      d = m / (n * (n - 1));
    } else {
      d = (m * 2) / (n * (n - 1));
    }
  }

  return d;
}

/**
 * Return a list of the frequency of each degree value.
 *
 * Note: the bins are width one, hence list.length can be large
 * (Order(number_of_edges))
 *
 *
 * @param {Graph} G Graph
 * @return {Array} A list of frequencies of degrees.
 *      The degree values are the index in the list.
 */

function degreeHistogram(G) {
  var degseq = _Array$from(G.degree().values());
  var dmax = Math.max.apply(Math, degseq) + 1;
  var freq = (0, _internals.fillArray)(dmax, 0);

  degseq.forEach(function (d) {
    freq[d] += 1;
  });

  return freq;
}

/**
 * Return True if graph is directed.
 *
 * @param {Graph} G Graph
 * @return {boolean}  True if graph is directed
 */

function isDirected(G) {
  return G.isDirected();
}

/**
 * Modify graph to prevent addition of nodes or edges.
 *
 * This does not prevent modification of edge data.
 * To "unfreeze" a graph you must make a copy.
 *
 * @see #is_frozen
 *
 * @param {Graph} G Graph
 * @return {Graph} A reference to the input graph
 */

function freeze(G) {
  function frozen() {
    throw new _exceptionsJSNetworkXError2["default"](
      "Frozen graph can't be modified"
    );
  }

  // This double assignment is necessary for the closure compiler
  G.addNode = frozen;
  G.addNodesFrom = frozen;
  G.removeNode = frozen;
  G.removeNodesFrom = frozen;
  G.addEdge = frozen;
  G.addEdgesFrom = frozen;
  G.removeEdge = frozen;
  G.removeEdgesFrom = frozen;
  G.clear = frozen;
  G.frozen = true;
  return G;
}

/**
 * Return True if graph is frozen.
 *
 * @see #freeze
 *
 * @param {Graph} G Graph
 * @return {boolean}  True if graph is frozen.
 */

function isFrozen(G) {
  return !!G.frozen;
}

/**
 * Return the subgraph induced on nodes in nbunch.
 *
 * Note:  subgraph(G) calls G.subgraph()
 *
 * @param {Graph} G Graph
 * @param {NodeContainer} nbunch
 *      A container of nodes that will be iterated through once (thus
 *      it should be an iterator or be iterable).  Each element of the
 *      container should be a valid node type: any hashable type except
 *      None.  If nbunch is None, return all edges data in the graph.
 *      Nodes in nbunch that are not in the graph will be (quietly)
 *      ignored.
 * @return {Graph} Subgraph
 */

function subgraph(G, nbunch) {
  return G.subgraph(nbunch);
}

/**
 * Return a copy of the graph G with all of the edges removed.
 *
 * Notes: Graph, node, and edge data is not propagated to the new graph.
 *
 * @param {Graph} G Graph
 * @param {boolean} opt_with_nodes (default=True)
 *      Include nodes.
 *
 * @return {Graph} A copy of the graph
 */

function createEmptyCopy(G) {
  var optWithNodes =
    arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  var H = new G.constructor();
  if (optWithNodes) {
    H.addNodesFrom(G);
  }
  return H;
}

/**
 * Print short summary of information for the graph G or the node n.
 *
 * @param {Graph} G Graph
 * @param {Node=} opt_n A node in the graph G
 * @return {string} Info
 */

function info(G, optN) {
  var result = "";
  if (optN == null) {
    var template =
      "Name: %s\n" +
      "Type: %s\n" +
      "Number of nodes: %s\n" +
      "Number of edges: %s\n";
    var nnodes = G.numberOfNodes();
    result = (0, _internals.sprintf)(
      template,
      G.name,
      G.constructor.__name__,
      nnodes,
      G.numberOfEdges()
    );
    if (nnodes > 0) {
      if (G.isDirected()) {
        var inDegree = 0;
        var outDegree = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (
            var _iterator = _getIterator(G.inDegree().values()), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
          ) {
            var _degree = _step.value;

            inDegree += _degree;
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

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (
            var _iterator2 = _getIterator(G.outDegree().values()), _step2;
            !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
            _iteratorNormalCompletion2 = true
          ) {
            var _degree2 = _step2.value;

            outDegree += _degree2;
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

        result += (0, _internals.sprintf)(
          "Average in degree: %s\nAverage out degree: %s",
          (inDegree / nnodes).toFixed(4),
          (outDegree / nnodes).toFixed(4)
        );
      } else {
        var sum = 0;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (
            var _iterator3 = _getIterator(G.degree().values()), _step3;
            !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
            _iteratorNormalCompletion3 = true
          ) {
            var v = _step3.value;

            sum += v;
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

        result += (0, _internals.sprintf)(
          "Average degree: %s",
          (sum / nnodes).toFixed(4)
        );
      }
    }
  } else {
    if (!G.hasNode(optN)) {
      throw new _exceptionsJSNetworkXError2["default"](
        (0, _internals.sprintf)("Node %j not in graph.", optN)
      );
    }
    result = (0, _internals.sprintf)(
      "Node %j has the following properties:\nDegree: %s\nNeighbors: %s",
      optN,
      G.degree(optN),
      G.neighbors(optN)
        .map(function (n) {
          return JSON.stringify(n);
        })
        .join(" ")
    );
  }
  return result;
}

/**
 * Set node attributes from dictionary of nodes and values
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @param {(Object|Map)} attributes Dictionary of attributes keyed by node
 */

function setNodeAttributes(G, name, attributes) {
  if ((0, _internals.isMap)(attributes)) {
    attributes.forEach(function (value, node) {
      return (G.node.get(node)[name] = value);
    });
  } else if ((0, _internals.isPlainObject)(attributes)) {
    for (var node in attributes) {
      node = isNaN(node) ? node : +node;
      G.node.get(node)[name] = attributes[node];
    }
  } else {
    throw new TypeError("Attributes must be a Map or a plain object");
  }
}

/**
 * Get node attributes from graph
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @return {!Map} Dictionary of attributes keyed by node.
 */

function getNodeAttributes(G, name) {
  var dict = new _Map();
  G.node.forEach(function (node, data) {
    if (data.hasOwnProperty(name)) {
      dict.set(node, data[name]);
    }
  });
  return dict;
}

/**
 * Set edge attributes from dictionary of edge tuples and values
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @param {Map} attributes
 *    Dictionary of attributes keyed by edge (tuple).
 */

function setEdgeAttributes(G, name, attributes) {
  attributes.forEach(function (edge, value) {
    G.get(edge[0]).get(edge[1])[name] = value;
  });
}

/**
 * Get edge attributes from graph
 *
 * Since keys can only be strings in JavaScript, the edge is returned as
 * {@code "node1,node2"} string. You'd have to call {@code .split(',')} on
 * the keys to extract the actual node names.
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @return {!Map} Dictionary of attributes keyed by edge.
 */

function getEdgeAttributes(G, name) {
  var dict = new _Map();
  G.edges(null, true).forEach(function (edged) {
    if (edged[2].hasOwnProperty(name)) {
      var value = edged[2][name];
      edged.length = 2; // cut of data
      dict.set(edged, value);
    }
  });
  return dict;
}
