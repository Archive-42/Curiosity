"use strict";
/**
 * @fileoverview
 *
 * D3(http://mbostock.github.com/d3/) is a powerful library to associate data
 * with elements and provides various helpful methods to visualize the data,
 * such as color generators, layouts and DOM manipulation methods.
 *
 * Note: D3 must be included before running these functions
 */

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.draw = draw;

var _internals = require("../_internals");

var nullFunction = function nullFunction() {};

function angleFor(x1, y1, x2, y2) {
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

/**
 * Safely converts an iterator to an array. Because we often use tuples when
 * using generators internally, we have to be careful when converting the
 * generator to an array. Every element has to be converted explicitly.
 */
function toArray(iterator) {
  // shortcut. If the value is actually an array, we can just return it
  if (Array.isArray(iterator)) {
    return iterator;
  }
  var result = [];
  var i = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = _getIterator(iterator), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var value = _step.value;

      result[i++] = Array.isArray(value) ? _Array$from(value) : value;
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

  return result;
}

/**
 * Holds a reference to the last container element for convenience.
 *
 * @type {?(string|Element)}
 * @private
 */
var LAST_ELEMENT = null;

/**
 * Holds a reference to the last configuration for convenience.
 *
 * @type {Object}
 * @private
 */
var LAST_CONFIGURATION = null;

/**
 * A list of graph mutator methods.
 *
 * @type {Array.<string>}
 * @const
 * @private
 */
var MUTATOR_METHODS = [
  "addNode",
  "addNodesFrom",
  "addEdge",
  "addEdgesFrom",
  "removeNode",
  "removeNodesFrom",
  "removeEdge",
  "removeEdgesFrom",
  "clear",
];

/**
 * The name of the attribute the D3 data is assigned to in the node and
 * edge data.
 *
 * @type {string}
 */
var D3_DATA_NAME = "__d3datum__";

/**
 * Keep a reference to d3.
 */
var d3 = global.d3;

/**
 * Draw graph G with D3.
 *
 * This method draws `G` with the provided `options`. If `optBind` is set to
 * `true`, changes to the graph structure will automatically update the
 * visualization.
 *
 * Returns the force layout used to compute the position of the nodes.
 *
 * The following options are available:
 *
 * - element (Element|String): This option is **required**. Specifies the
 *   container of the visualization. A string is interpreted as CSS selector.
 * - d3 (d3): Use to explicitly pass a reference to D3. If not present, the
 *   global variable d3 will be used instead.
 * - width (number): The width of the canvas in pixels. Defaults to the width
 *   of the container.
 * - height (number): The height of the canvas in pixels. Defaults to the
 *   height of the container.
 * - layoutAttr (Object): Layout options. The default layout is "force", so
 *   the options size, linkDistance, linkStrength, friction, charge, theta
 *   and gravity can be set. For example, setting `{linkDistance: 10}` will call
 *   `force.linkDistance(10)`.
 * - nodelist (Iterable): An iterable of nodes. If present, only nodes in that
 *   list will be drawn.
 * - nodeShape (string): The tag name of the SVG element to be used as nodes.
 *   Defaults to "circle".
 * - nodeAttr (Object): The attributes to set on the node SVG element. This
 *   object is passed along to D3's `.attr()` method.
 * - nodeStyle (Object): The style properties to set on the node SVG element.
 *   This object is passed along to D3's `.style()` method.
 * - edgeAttr (Object): The attributes to set on an edge SVG element. Edges are
 *   represented by SVG path elements.
 * - edgeStyle (Object): The style properties to set on the edge SVG element.
 *   Note: Even though the edge element is a SVG path element, you cannot set
 *   `stroke-width` to set the stroke width. Instead, the value of
 *   `stroke-width` is used as maximum value for the edge width.
 * - withLabels (boolean): Whether or not to draw node labels. SVG text elements
 *   are used for labels.
 * - labels (string|Object|function): The node labels to use.
 *   If `withLabels` is `true`, but `labels` is not present, defaults to the
 *   node itself.
 *   If a string is passed, the value of the property of the node data with the
 *   same name will be used.
 *   If an object is passed, the label is looked up in the object using the node
 *   as property name.
 *   If a function is passed, it gets called and passed the corresponding D3
 *   data object.
 * - labelAttr (Object): Like `nodeAttr` but for the label nodes. Labels are
 *   represented by SVG text nodes.
 * - labelStyle (Object): Like `nodeStyle` but for the label nodes. Labels are
 *   represented by SVG text nodes.
 * - withEdgeLabels (boolean): See `withLabels`, but for edges.
 * - edgeLabels (string|Object|function): See `labels`.
 * - edgeLabelAttr (Object): Like `labelAttr`.
 * - edgeLabelStyle (Object): Like `labelStyle`.
 * - weighted (boolean): Whether the edge width depends on the weight of the
 *   edge. The max and min weight are automatically computed. This is a
 *   convenience option so that you don't have to compute the edge weights
 *   yourself.
 * - weights (string|function): Specifies the weight for each edge.
 *   If `weighted` is `true` but `weights` is not present, defaults to
 *   `"weight"`.
 *   If a string is passed, the value of the property of the edge data with the
 *   same name is used as weight.
 *   If a function is passed, it gets called and passed the corresponding D3
 *   data object.
 * - edgeOffset (number|function): The distance in pixels between the edge start
 *   and the node. If not set and `nodeShape` is a `"circle"`, the offset will
 *   be automatically computed based on the radius.
 *   If a different shape for nodes is used it might be necessary to set the
 *   offset manually.
 * - edgeLabelOffset (number|function): By default edge labels are drawing in
 *   in the center of the edge. Can be used to adjust the position.
 * - panZoom (Object):
 *      - enabled (boolean): Enables panning and zooming of the canvas.
 *      - scale (boolean): Whether nodes and labels should keep their size
 *        when zooming or not.
 *
 * @param {jsnx.classes.Graph} G The graph to draw
 * @param {?Object=} config A dictionary of configuration parameters.
 * @param {?boolean=} optBind Set to true to automatically update
 *      the output upon graph manipulation. Only works for adding nodes or edges
 *      for now.
 * @return {d3.layout.force}
 */

function draw(G, config, optBind) {
  if (typeof config === "boolean") {
    optBind = config;
    config = null;
  }

  config = config || LAST_CONFIGURATION || {};
  LAST_CONFIGURATION = config;
  if (config.d3) {
    d3 = config.d3;
  }
  config = (0, _internals.deepmerge)({}, DEFAULT_CONFIG, config);

  if (!d3) {
    throw new Error("D3 requried for draw()");
  }

  if (config.element == null && LAST_ELEMENT == null) {
    throw new Error("Output element required for draw()");
  }

  // initialize
  LAST_ELEMENT = config.element || LAST_ELEMENT;

  // remove any possible previous graph
  d3.select(LAST_ELEMENT).select("svg.jsnx").remove();

  // set up base elements
  var container = d3.select(LAST_ELEMENT);
  var d3nodes = [];
  var d3links = [];
  var canvas = container
    .append("svg")
    .classed("jsnx", true)
    .attr("pointer-events", "all");
  var parentContainer = canvas.append("g");
  var edgeSelection = parentContainer
    .append("g")
    .classed("edges", true)
    .selectAll("g.edge");
  var nodeSelection = parentContainer
    .append("g")
    .classed("nodes", true)
    .selectAll("g.node");
  var force = d3.layout.force();
  var width = config.width || parseInt(container.style("width"), 10);
  var height = config.height || parseInt(container.style("height"), 10);
  var layoutAttr = config.layoutAttr;
  var nodelist = config.nodelist || null;
  var labelFunc;
  var edgeLabelFunc;
  var weightFunc;
  var directed = G.isDirected();
  var weighted = config.weighted;
  var selections = {
    nodeSelection: nodeSelection,
    edgeSelection: edgeSelection,
  };

  // determine node label function
  if (config.withLabels) {
    var labels = config.labels;
    switch (typeof labels) {
      case "object":
        labelFunc = function (d) {
          return (0, _internals.getDefault)(labels[d.node], "");
        };
        break;
      case "function":
        labelFunc = labels;
        break;
      case "string":
        labelFunc = function (d) {
          return d.data[labels];
        };
        break;
      default:
        labelFunc = function (d) {
          return d.node;
        };
    }
  }
  config.labels = labelFunc;

  // if the graph should be weighted, we need a weight function
  // these will be used as edge labels if no others are provided
  if (weighted) {
    var weights = config.weights;
    switch (typeof weigths) {
      case "object":
        weightFunc = function (d) {
          return (0, _internals.getDefault)(weights[d.node], 1);
        };
        break;
      case "function":
        weightFunc = weights;
        break;
      case "string":
        weightFunc = function (d) {
          return (0, _internals.getDefault)(d.data[weights], 1);
        };
        break;
      default:
        weightFunc = function (d) {
          return 1;
        };
    }
  }

  // determine edge labels
  if (config.withEdgeLabels) {
    var elabels = config.edgeLabels;

    if (weighted && elabels == null) {
      edgeLabelFunc = weightFunc;
    } else {
      switch (typeof elabels) {
        case "object":
          edgeLabelFunc = function (d) {
            return (0, _internals.getDefault)(labels[d.node], "");
          };
          break;
        case "function":
          edgeLabelFunc = elabels;
          break;
        case "string":
          edgeLabelFunc = function (d) {
            return d.data[elabels];
          };
          break;
        default:
          edgeLabelFunc = function (d) {
            return d.edge;
          };
      }
    }
    config.edgeLabels = edgeLabelFunc;
  }

  // scale the width of the edge according to the weight
  if (weighted && config.weightedStroke) {
    var maxWeight = 1;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (
        var _iterator2 = _getIterator(G.edgesIter(null, true)), _step2;
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        _iteratorNormalCompletion2 = true
      ) {
        var _step2$value = _step2.value;
        var u = _step2$value.u;
        var v = _step2$value.v;
        var data = _step2$value.data;

        var weight = weightFunc({ data: data });
        if (weight > maxWeight) {
          maxWeight = weight;
        }
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

    var scale = d3.scale
      .linear()
      .range([2, config.edgeStyle["stroke-width"]])
      .domain([0, maxWeight]);

    config.edgeStyle["stroke-width"] = function (d) {
      return scale(weightFunc.call(this, d));
    };
  }

  // remove any possible previous graph
  canvas.select("svg.jsnx").remove();

  // set size and hide the wild movement of nodes at the beginning
  canvas
    .attr("width", width + "px")
    .attr("height", height + "px")
    .style("opacity", 1e-6)
    .transition()
    .duration(1000)
    .style("opacity", 1);

  // initialize layout
  // don't let the user set these:
  var exclude = {
    size: true,
    nodes: true,
    links: true,
    start: true,
  };

  for (var attr in layoutAttr) {
    if (exclude[attr] !== true) {
      force[attr](layoutAttr[attr]);
    }
  }
  force.nodes(d3nodes).links(d3links).size([width, height]);

  // set up zoom and pan behaviour
  var zoom = 1;
  var invScale = 1; // used to scale nodes and text accordingly

  if (config.panZoom.enabled) {
    (function () {
      var scaled = config.panZoom.scale;
      var zooming = false;
      var zoomStartScale = 1;
      var zoomStart = zoom;

      canvas.call(
        d3.behavior.zoom().on("zoom", function () {
          if (!d3.event.sourceEvent) {
            return;
          }
          var shiftKey = d3.event.sourceEvent.shiftKey,
            zoomed = (scaled && shiftKey) || !(scaled || shiftKey);

          // if the graph is zoomed, we have to keep track of the
          // ration it was zoomed by
          if (zoomed && !zooming) {
            zoomStartScale = d3.event.scale;
            zoomStart = zoom;
            zooming = true;
          } else if (!zoomed && zooming) {
            zooming = false;
          }

          zoom = zoomed ? zoomStart * (d3.event.scale / zoomStartScale) : zoom;
          invScale = !zoomed ? zoom / d3.event.scale : invScale;

          var tr = d3.event.translate;
          parentContainer.attr(
            "transform",
            "translate(" +
              tr[0] +
              "," +
              tr[1] +
              ")scale(" +
              d3.event.scale +
              ")"
          );
          redraw();
        })
      );
    })();
  }

  var updateEdgePosition = nullFunction;
  var offset = config.edgeOffset;
  var nodeRadius = config.nodeAttr.r;
  var nodeStrokeWidth = config.nodeStyle["stroke-width"];

  if (config.nodeShape === "circle") {
    if (typeof nodeRadius !== "function") {
      nodeRadius = function () {
        return config.nodeAttr.r;
      };
    }
    if (typeof nodeStrokeWidth !== "function") {
      nodeStrokeWidth = function () {
        return config.nodeStyle["stroke-width"];
      };
    }
    offset = function (d) {
      return [
        nodeRadius(d.source) + nodeStrokeWidth(d.source),
        nodeRadius(d.target) + nodeStrokeWidth(d.target),
      ];
    };
  } else {
    if (Array.isArray(offset)) {
      offset = function () {
        return config.edgeOffset;
      };
    } else if (typeof offset === "number") {
      offset = function () {
        return [config.edgeOffset, config.edgeOffset];
      };
    }
  }
  var strw = config.edgeStyle["stroke-width"];
  if (typeof strw !== "function") {
    strw = function () {
      return config.edgeStyle["stroke-width"];
    };
  }
  var labelOffset = config.edgeLabelOffset;

  if (directed) {
    // don't rotate labels and draw curvy lines
    updateEdgePosition = function () {
      selections.edgeSelection.each(function (d) {
        if (d.source !== d.target) {
          var $this = d3.select(this);
          var x1 = d.source.x;
          var y1 = d.source.y;
          var x2 = d.target.x;
          var y2 = d.target.y;
          var angle = angleFor(x1, y1, x2, y2);
          var dx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          var computedOffset = offset(d);
          computedOffset = [
            computedOffset[0] * invScale,
            computedOffset[1] * invScale,
          ];

          $this.attr(
            "transform",
            ["translate(", x1, ",", y1, ")", "rotate(", angle, ")"].join("")
          );

          var shift = strw(d) * invScale;
          var arrowStartPoint = dx - computedOffset[1] - 2 * shift;
          var halfShift = shift / 2;
          $this
            .select(".line")
            .attr(
              "d",
              [
                "M",
                computedOffset[0],
                0,
                "L",
                computedOffset[0],
                -halfShift,
                "L",
                arrowStartPoint,
                -halfShift,
                "L",
                arrowStartPoint,
                -shift,
                "L",
                dx - computedOffset[1],
                0,
                "z",
              ].join(" ")
            );

          var edgeScale = 1 / invScale;
          $this
            .select("text")
            .attr(
              "x",
              labelOffset.x * edgeScale +
                computedOffset[0] +
                (dx * edgeScale - computedOffset[0] - computedOffset[1]) / 2
            )
            .attr("y", -strw(d) / 2 + -labelOffset.y * edgeScale)
            .attr("transform", "scale(" + invScale + ")");
        }
      });
    };
  } else {
    updateEdgePosition = function () {
      selections.edgeSelection.each(function (d) {
        if (d.source !== d.target) {
          var $this = d3.select(this);
          var x1 = d.source.x;
          var y1 = d.source.y;
          var x2 = d.target.x;
          var y2 = d.target.y;
          var angle = angleFor(x1, y1, x2, y2);
          var dx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          var center = dx / 2;
          var computedOffset = offset(d);
          computedOffset = [
            computedOffset[0] * invScale,
            computedOffset[1] * invScale,
          ];

          var edgeScale = 1 / invScale;
          var shift = strw(d) * invScale;
          var flip = angle > 90 && angle < 279;
          $this.attr(
            "transform",
            ["translate(", x1, ",", y1, ")", "rotate(", angle, ")"].join("")
          );
          $this
            .select(".line")
            .attr(
              "d",
              [
                "M",
                computedOffset[0],
                shift / 4,
                "L",
                computedOffset[0],
                -shift / 4,
                "L",
                dx - computedOffset[1],
                -shift / 4,
                "L",
                dx - computedOffset[1],
                shift / 4,
                "z",
              ].join(" ")
            );
          if (config.withEdgeLabels) {
            $this
              .select("text")
              .attr(
                "x",
                (flip ? 1 : -1) * labelOffset.x * edgeScale +
                  computedOffset[0] +
                  (dx * edgeScale - computedOffset[0] - computedOffset[1]) / 2
              )
              .attr("y", -strw(d) / 4 + -labelOffset.y * edgeScale)
              .attr(
                "transform",
                "scale(" +
                  invScale +
                  ")" +
                  (flip ? "rotate(180," + center * (1 / invScale) + ",0)" : "")
              );
          }
        }
      });
    };
  }

  var redraw = function redraw() {
    // update node position
    selections.nodeSelection.attr("transform", function (d) {
      return ["translate(", d.x, ",", d.y, ")", "scale(", invScale, ")"].join(
        ""
      );
    });

    updateEdgePosition();
  };

  force.on("tick", redraw);

  var nodes = G.nodesIter();
  var edges = G.edgesIter();

  if (nodelist) {
    // limit drawn nodes, disable binding
    optBind = false;
    nodes = G.nbunch_iter(nodelist);
    edges = G.edges_iter(nodelist);
  }

  // update d3 node and link data
  selections.nodeSelection = addNodes(G, nodes, force, nodeSelection, config);

  selections.edgeSelection = addEdges(
    G,
    edges,
    force,
    edgeSelection,
    edgeLabelFunc
  );

  // apply attributes and styles
  updateNodeAttr(selections.nodeSelection, config);

  updateEdgeAttr(selections.edgeSelection, config, null, directed);

  if (optBind) {
    bind(G, force, config, selections);
  } else {
    if (isBound(G)) {
      unbind(G);
    } else {
      clean(G);
    }
  }

  force.start();

  return force;
}

/**
 * Helper function to create new node objects for the force layout and
 * create the necessary SVG elements.
 *
 * @param {Graph} G
 * @param {Iterable} nodes The nodes to include from the Graph
 *      default are all nodes
 * @param {d3.layout.force} force The layout
 * @param {d3.selection} selection D3 DOM node selection of nodes
 * @param {Object} Drawing configuration
 *
 * @return {!d3.selection} The new selection of SVG elements.
 */
function addNodes(G, nodes, force, selection, config) {
  // Get current data
  var layoutNodes = force.nodes();
  // add new data
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (
      var _iterator3 = _getIterator(nodes), _step3;
      !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
      _iteratorNormalCompletion3 = true
    ) {
      var node = _step3.value;

      var data = G.node.get(node);
      var nobj = { node: node, data: data, G: G };
      layoutNodes.push(nobj);
      data[D3_DATA_NAME] = nobj;
    }
    // update data join
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

  selection = selection.data(layoutNodes, nodeKeyFunction);
  // create new elements
  var drag = force.drag().on("dragstart", function (d) {
    // Prevent pan if node is dragged
    d3.event.sourceEvent.stopPropagation();
    if (config.stickyDrag) {
      d.fixed = true;
      d3.select(this).classed("fixed", true);
    }
  });
  var nsel = selection.enter().append("g").classed("node", true).call(drag);

  nsel.append(config.nodeShape).classed("node-shape", true);

  if (config.labels) {
    nsel.append("text").text(config.labels);
  }

  return selection;
}

/**
 * Helper function to create new edge objects for the force layout.
 *
 * @param {Graph} G
 * @param {Iterable} edges The nodes to include from the Graph
 *      default are all nodes
 * @param {d3.layout.force} force
 * @param {d3.selection} selection D3 DOM node selection of nodes
 * @param {Function=} opt_label_func Function to extract text for labels
 *
 * @return {!d3.selection}
 */
function addEdges(G, edges, force, selection, optLabelFunc) {
  // Get current data
  var layoutLinks = force.links();
  // add new data
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (
      var _iterator4 = _getIterator(edges), _step4;
      !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
      _iteratorNormalCompletion4 = true
    ) {
      var _step4$value = _slicedToArray(_step4.value, 3);

      var u = _step4$value[0];
      var v = _step4$value[1];
      var data = _step4$value[2];

      data = data || G.getEdgeData(u, v);
      var eobj = {
        edge: [u, v],
        source: G.node.get(u)[D3_DATA_NAME],
        target: G.node.get(v)[D3_DATA_NAME],
        data: data,
        G: G,
      };
      layoutLinks.push(eobj);
      data[D3_DATA_NAME] = eobj;
    }
    // update data join
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

  selection = selection.data(layoutLinks, edgeKeyFunction);
  // create new elements
  var esel = selection.enter().append("g").classed("edge", true);
  esel.append("path").classed("line", true);

  if (optLabelFunc) {
    esel.append("text").text(optLabelFunc);
  }
  return selection;
}

/**
 * Updates attributes of nodes.
 *
 * @param {d3.selection} selection
 * @param {Object} config
 * @param {Iterable=} opt_nodes a container of nodes. If set,
 *      only update these nodes.
 */
function updateNodeAttr(selection, config, optNodes) {
  if (optNodes != null) {
    var newNodes = new _internals.Set();
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (
        var _iterator5 = _getIterator(optNodes), _step5;
        !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
        _iteratorNormalCompletion5 = true
      ) {
        var node = _step5.value;

        newNodes.add((0, _internals.isArrayLike)(node) ? node[0] : node);
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

    selection = selection.filter(function (d) {
      return newNodes.has(d.node);
    });
  }
  selection
    .selectAll(".node-shape")
    .attr(config.nodeAttr)
    .style(config.nodeStyle);

  if (config.withLabels) {
    selection.selectAll("text").attr(config.labelAttr).style(config.labelStyle);
  }
}

/**
 * Updates attributes of edges.
 *
 * @param {d3.selection} selection
 * @param {Object} config
 * @param {?=} optEdges If set, only updates the styles of the provided
 *      edges
 * @param {boolean=} optDirected
 */
function updateEdgeAttr(selection, config, optEdges, optDirected) {
  if (optEdges != null) {
    var newEdges = new _internals.Map();
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (
        var _iterator6 = _getIterator(optEdges), _step6;
        !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
        _iteratorNormalCompletion6 = true
      ) {
        var _step6$value = _slicedToArray(_step6.value, 2);

        var u = _step6$value[0];
        var v = _step6$value[1];

        newEdges.set(u, v);
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

    selection = selection.filter(function (_ref) {
      var edge = _ref.edge;
      return (
        newEdges.get(edge[0]) === edge[1] ||
        optDirected ||
        newEdges.get(edge[1]) === edge[0]
      );
    });
  }

  selection
    .selectAll(".line")
    .attr(config.edgeAttr)
    .style(config.edgeStyle)
    .style("stroke-width", 0);

  if (config.withEdgeLabels) {
    selection
      .selectAll("text")
      .attr(config.edgeLabelAttr)
      .style(config.edgeLabelStyle);
  }
}

/**
 * Key function to extract the join value for the SVG nodes and the data.
 *
 * @param {Object} d The current datum
 * @return {Node}
 */
function nodeKeyFunction(d) {
  return d.node;
}

/**
 * Key function to extract the join value for the SVG nodes and the data.
 *
 * @param {Object} d The current datum
 * @return {Array}
 */
function edgeKeyFunction(d) {
  return d.edge;
}

/**
 * Helper function to remove node objects for the force layout.
 *
 * @param {Graph} G
 * @param {Iterable} nodes to remove from the graph
 * @param {d3.layout.force} force The force the nodes are bound to
 * @param {d3.selection} selection Selection of node elements
 *
 * @return {d3.selection} Updated selection
 */
function removeNodes(G, nodes, force, selection) {
  // get current data set
  var data = force.nodes();

  // remove items from data
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (
      var _iterator7 = _getIterator(G.nbunchIter(nodes)), _step7;
      !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);
      _iteratorNormalCompletion7 = true
    ) {
      var node = _step7.value;

      var index = data.indexOf(G.node.get(node)[D3_DATA_NAME]);
      if (index > -1) {
        data.splice(index, 1);
      }
    }

    // rebind data
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

  selection = selection.data(data, nodeKeyFunction);
  // remove SVG elements
  selection.exit().remove();
  return selection;
}

/**
 * Helper function to remove edge objects for the force layout.
 *
 * @param {jsnx.classes.Graph} G
 * @param {?} edges Edges to remove
 * @param {d3.layout.force} force The force the edges are bound to
 * @param {d3.selection} selection Selection of edge elements
 *
 * @return {!d3.selection} Updated selection
 */
function removeEdges(G, edges, force, selection) {
  // get current data set
  var data = force.links();
  // remove items from data
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (
      var _iterator8 = _getIterator(edges), _step8;
      !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done);
      _iteratorNormalCompletion8 = true
    ) {
      var _step8$value = _slicedToArray(_step8.value, 2);

      var u = _step8$value[0];
      var v = _step8$value[1];

      var index = data.indexOf(G.getEdgeData(u, v, {})[D3_DATA_NAME]);
      if (index > -1) {
        data.splice(index, 1);
      }
    }
    // rebind data
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

  selection = selection.data(data, edgeKeyFunction);
  // remove SVG elements
  selection.exit().remove();
  return selection;
}

/**
 * Binds the output to the graph. This overrides mutator methods. To "free"
 * the graph, you can call jsnx.unbind (which is public)
 *
 * @param {Graph} G A Graph
 * @param {d3.layout.force} force Force layout
 * @param {Object} config The configuration for the output
 * @param {{nodeSelection:d3.selection, edgeSelection:d3.selection }} selections
 *   Various D3 selections
 */
function bind(G, force, config, selections) {
  unbind(G, false);

  var proto = G.constructor.prototype;
  var edgeLabelFunc = config.edgeLabels;
  var directed = G.isDirected();

  G.addNode = function (n, optAttr) {
    var newNode = !this.hasNode(n);
    proto.addNode.call(this, n, optAttr);

    if (newNode) {
      selections.nodeSelection = addNodes(
        this,
        [n],
        force,
        selections.nodeSelection,
        config
      );
    }

    // update node attributes
    updateNodeAttr(selections.nodeSelection, config, [n]);

    force.start();
  };

  G.addNodesFrom = function (nbunch, optAttr) {
    // istanbul ignore next

    var _this = this;

    nbunch = toArray(nbunch);
    var newNodes = nbunch.filter(function (node) {
      return !_this.hasNode((0, _internals.isArrayLike)(node) ? node[0] : node);
    });

    proto.addNodesFrom.call(this, nbunch, optAttr);

    if (newNodes.length > 0) {
      // add new nodes and update
      selections.nodeSelection = addNodes(
        this,
        newNodes,
        force,
        selections.nodeSelection,
        config
      );
    }

    updateNodeAttr(selections.nodeSelection, config, nbunch);
    force.start();
  };

  G.addEdge = function (u, v, optAttr) {
    // istanbul ignore next

    var _this2 = this;

    var newEdge = !this.hasEdge(u, v);
    var edges = [[u, v]];
    var newNodes = newEdge
      ? (u === v ? [u] : edges[0]).filter(function (node) {
          return !_this2.hasNode(node);
        })
      : [];
    proto.addEdge.call(G, u, v, optAttr);

    if (newNodes.length > 0) {
      selections.nodeSelection = addNodes(
        this,
        newNodes,
        force,
        selections.nodeSelection,
        config
      );

      updateNodeAttr(selections.nodeSelection, config, newNodes);
    }

    if (newEdge) {
      selections.edgeSelection = addEdges(
        this,
        edges,
        force,
        selections.edgeSelection,
        edgeLabelFunc
      );
    }

    updateEdgeAttr(selections.edgeSelection, config, edges, directed);
    force.start();
  };

  G.addEdgesFrom = function (ebunch, optAttr) {
    var newEdges = [];
    var newNodes = [];
    var seenEdges = new _internals.Map();
    var seenNodes = new _internals.Set();

    ebunch = toArray(ebunch);

    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (
        var _iterator9 = _getIterator(ebunch), _step9;
        !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done);
        _iteratorNormalCompletion9 = true
      ) {
        var _step9$value = _slicedToArray(_step9.value, 2);

        var u = _step9$value[0];
        var v = _step9$value[1];

        if (
          !this.hasEdge(u, v) &&
          seenEdges.get(u) !== v &&
          (directed || seenEdges.get(v) === u)
        ) {
          newEdges.push([u, v]);
          seenEdges.set(u, v);
          if (!this.hasNode(u) && !seenNodes.has(u)) {
            newNodes.push(u);
            seenNodes.add(u);
          }
          if (!this.hasNode(v) && !seenNodes.has(v)) {
            newNodes.push(v);
            seenNodes.add(v);
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

    proto.addEdgesFrom.call(G, ebunch, optAttr);

    if (newNodes.length > 0) {
      selections.nodeSelection = addNodes(
        this,
        newNodes,
        force,
        selections.nodeSelection,
        config
      );

      updateNodeAttr(selections.nodeSelection, config, newNodes);
    }

    if (newEdges.length > 0) {
      selections.edgeSelection = addEdges(
        this,
        newEdges,
        force,
        selections.edgeSelection,
        edgeLabelFunc
      );
    }

    updateEdgeAttr(selections.edgeSelection, config, newEdges, directed);
    force.start();
  };

  G.removeNode = function (n) {
    if (this.hasNode(n)) {
      selections.nodeSelection = removeNodes(
        this,
        [n],
        force,
        selections.nodeSelection
      );
      var edges = this.edgesIter([n]);

      if (this.isDirected()) {
        edges = _regeneratorRuntime.mark(function callee$2$0(self, outEdges) {
          return _regeneratorRuntime.wrap(
            function callee$2$0$(context$3$0) {
              while (1)
                switch ((context$3$0.prev = context$3$0.next)) {
                  case 0:
                    return context$3$0.delegateYield(outEdges, "t0", 1);

                  case 1:
                    return context$3$0.delegateYield(
                      self.inEdgesIter([n]),
                      "t1",
                      2
                    );

                  case 2:
                  case "end":
                    return context$3$0.stop();
                }
            },
            callee$2$0,
            this
          );
        })(this, edges);
      }

      selections.edgeSelection = removeEdges(
        this,
        edges,
        force,
        selections.edgeSelection
      );

      force.resume();
    }
    proto.removeNode.call(this, n);
  };

  G.removeNodesFrom = function (nbunch) {
    nbunch = toArray(nbunch);
    selections.nodeSelection = removeNodes(
      this,
      nbunch,
      force,
      selections.nodeSelection
    );

    var edges = this.edgesIter(nbunch);
    if (this.isDirected()) {
      edges = _regeneratorRuntime.mark(function callee$2$0(self, outEdges) {
        return _regeneratorRuntime.wrap(
          function callee$2$0$(context$3$0) {
            while (1)
              switch ((context$3$0.prev = context$3$0.next)) {
                case 0:
                  return context$3$0.delegateYield(outEdges, "t0", 1);

                case 1:
                  return context$3$0.delegateYield(
                    self.inEdgesIter(nbunch),
                    "t1",
                    2
                  );

                case 2:
                case "end":
                  return context$3$0.stop();
              }
          },
          callee$2$0,
          this
        );
      })(this, edges);
    }

    selections.edgeSelection = removeEdges(
      this,
      edges,
      force,
      selections.edgeSelection
    );

    force.resume();
    proto.removeNodesFrom.call(this, nbunch);
  };

  G.removeEdge = function (u, v) {
    selections.edgeSelection = removeEdges(
      this,
      [[u, v]],
      force,
      selections.edgeSelection
    );

    force.resume();
    proto.removeEdge.call(this, u, v);
  };

  G.removeEdgesFrom = function (ebunch) {
    ebunch = toArray(ebunch);
    selections.edgeSelection = removeEdges(
      this,
      ebunch,
      force,
      selections.edgeSelection
    );

    force.resume();
    proto.removeEdgesFrom.call(G, ebunch);
  };

  G.clear = function () {
    selections.nodeSelection = selections.nodeSelection.data(
      [],
      nodeKeyFunction
    );
    selections.nodeSelection.exit().remove();
    selections.edgeSelection = selections.edgeSelection.data(
      [],
      edgeKeyFunction
    );
    selections.edgeSelection.exit().remove();
    force.nodes([]).links([]).resume();
    proto.clear.call(this);
  };

  /**
   * @type boolean
   */
  G.bound = true;
}

/**
 * Returns True if the graph is bound to an output.
 *
 * @param {Graph} G A Graph
 * @return {boolean}
 */
function isBound(G) {
  return G.bound;
}

/**
 * Resets mutator methods to the originals
 *
 * @param {} G graph
 * @param {boolean=} opt_clean (default=True)
 *    If true, all D3 data is removed from the graph
 */
function unbind(G) {
  var optClean =
    arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  if (isBound(G)) {
    var proto = G.constructor.prototype;
    MUTATOR_METHODS.forEach(function (m) {
      return (G[m] = proto[m]);
    });
    delete G.bound;
    if (optClean) {
      clean(G);
    }
  }
}

/**
 * Removes any D3 data from the Graph.
 *
 * @param {Graph} G A Graph
 */
function clean(G) {
  /*eslint no-unused-vars:0*/
  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (
      var _iterator10 = _getIterator(G.nodesIter(true)), _step10;
      !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done);
      _iteratorNormalCompletion10 = true
    ) {
      var _step10$value = _slicedToArray(_step10.value, 2);

      var _ = _step10$value[0];
      var data = _step10$value[1];

      delete data[D3_DATA_NAME];
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

  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (
      var _iterator11 = _getIterator(G.edgesIter(null, true)), _step11;
      !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done);
      _iteratorNormalCompletion11 = true
    ) {
      var _step11$value = _slicedToArray(_step11.value, 3);

      var u = _step11$value[0];
      var v = _step11$value[1];
      var data = _step11$value[2];

      delete data[D3_DATA_NAME];
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
}

/**
 * Default D3 configuration.
 *
 * @type Object
 * @private
 */
var DEFAULT_CONFIG = {
  layoutAttr: {
    charge: -120,
    linkDistance: 60,
  },
  nodeShape: "circle",
  nodeAttr: {
    r: 10, // radius of 10
  },
  nodeStyle: {
    "stroke-width": 2,
    stroke: "#333",
    fill: "#999",
    cursor: "pointer",
  },
  edgeAttr: {},
  edgeStyle: {
    fill: "#000",
    "stroke-width": 3,
  },
  labelAttr: {},
  labelStyle: {
    "text-anchor": "middle",
    "dominant-baseline": "central",
    cursor: "pointer",
    "-webkit-user-select": "none",
    fill: "#000",
  },
  edgeLabelAttr: {},
  edgeLabelStyle: {
    "font-size": "0.8em",
    "text-anchor": "middle",
    "-webkit-user-select": "none",
  },
  edgeLabelOffset: {
    x: 0,
    y: 0.5,
  },
  withLabels: false,
  withEdgeLabels: false,
  edgeOffset: 10,
  weighted: false,
  weights: "weight",
  weightedStroke: true,
  panZoom: {
    enabled: true,
    scale: true,
  },
};
