"use strict";

/**
 * A simple event object to any data can be added. It provides four methods:
 *
 * - stopPropagation to indicated that subsequent event handlers should not be
 *   executed.
 * - isPropgationStopped to test the status (internal only)
 * - preventDefault to prevent the default action
 * - isDefaultPrevented to test the status
 */

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")[
  "default"
];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.observe = observe;
exports.unobserve = unobserve;
exports.isObservable = isObservable;

var Event = (function () {
  /**
   * @param {string} type
   * @param {*} target
   */

  function Event(type, target) {
    _classCallCheck(this, Event);

    this.type = type;
    this.target = target;
    this._defaultAction = true;
    this._propagate = true;
  }

  /**
   * Makes a graph observable, i.e. external code can bind event handlers to
   * be notified about changes in the graph (adding or removing nodes or edges).
   *
   * @param {Graph} G The graph to make observable
   * @return {Graph} The same graph passed as argument (not a new graph)
   */

  /**
   * When called, should prevent the execution of subsequent handlers.
   */

  _createClass(Event, [
    {
      key: "stopPropagation",
      value: function stopPropagation() {
        this._propagate = false;
      },

      /**
       * Tests whether the propagation should be stopped.
       * @return {boolean}
       */
    },
    {
      key: "isPropgationStopped",
      value: function isPropgationStopped() {
        return !this._propagate;
      },

      /**
       * When called, should prevent the default action.
       */
    },
    {
      key: "preventDefault",
      value: function preventDefault() {
        this._defaultAction = false;
      },

      /**
       * Tests whether the default action should be stopped.
       *
       * @return {boolean}
       */
    },
    {
      key: "isDefaultPrevented",
      value: function isDefaultPrevented() {
        return !this._defaultAction;
      },
    },
  ]);

  return Event;
})();

function observe(G) {
  if (typeof G.on === "function") {
    // graph is already observable, do nothing
    return G;
  }

  var eventHandlers = {
    addNodes: [],
    removeNodes: [],
    addEdges: [],
    removeEdges: [],
    clear: [],
  };
  var proto = G.constructor.prototype;

  /* eslint-disable no-shadow */
  function triggerHandlers(event, G, funcName, args) {
    /* eslint-enable no-shadow */
    var handlers = eventHandlers[event.type];
    if (!handlers) {
      return;
    }
    // run before handlers
    for (
      var i = 0, l = handlers.length;
      i < l && !event.isPropgationStopped();
      i += 3
    ) {
      if (handlers[i + 2]) {
        handlers[i].call(handlers[i + 1] || G, event);
      }
    }

    if (!event.isDefaultPrevented()) {
      if (args) {
        proto[funcName].apply(G, args);
      } else {
        proto[funcName].call(G);
      }
      if (!event.isPropgationStopped()) {
        // run after handlers
        for (
          i = 0, l = handlers.length;
          i < l && !event.isPropgationStopped();
          i += 3
        ) {
          if (!handlers[i + 2]) {
            handlers[i].call(handlers[i + 1] || G, event);
          }
        }
      }
    }
  }

  G.on = function (event, handler, thisObj, before) {
    if (!eventHandlers[event]) {
      throw new Error('Event "' + event + '" is not supported.');
    }
    eventHandlers[event].push(handler, thisObj, !!before);
  };

  G.off = function (event, handler, thisObj) {
    var handlers;
    var startIndex;
    var i;
    if (arguments.length === 1) {
      // Remove all event handlers
      eventHandlers[event].length = 0;
    } else if (arguments.length === 2) {
      // Remove particular handler or object only
      handlers = eventHandlers[event];
      startIndex = handlers.length - 2;
      if (typeof handler !== "function") {
        startIndex += 1;
      }
      for (i = startIndex; i > 0; i -= 2) {
        if (handlers[i] === handler) {
          handlers.splice(i, 3);
        }
      }
    } else {
      // Remove particular handler-object combination
      handlers = eventHandlers[event];
      startIndex = handlers.length - 2;
      for (i = startIndex; i > 0; i -= 2) {
        if (handlers[i] === handler && handlers[i + 1] === thisObj) {
          handlers.splice(i, 2);
        }
      }
    }
  };

  G.addNode = function (n) {
    var newNodes = G.hasNode(n) ? [] : [n];
    var event = new Event("addNodes", this);
    event.nodes = [n];
    event.newNodes = newNodes;

    triggerHandlers(event, this, "addNode", arguments);
  };

  G.addNodesFrom = function (nbunch) {
    var nodes = [];
    var newNodes = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = _getIterator(nbunch), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        var bunch = _step.value;

        var v = Array.isArray(bunch) ? bunch[0] : bunch;
        nodes.push(Array.isArray(bunch) ? bunch.slice() : bunch);
        if (!G.hasNode(v)) {
          newNodes.push(v);
        }
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

    var event = new Event("addNodes", this);
    event.nodes = nodes.filter(function (v) {
      return Array.isArray(v) ? v[0] : v;
    });
    event.newNodes = newNodes;

    var args = _Array$from(arguments);
    args[0] = nodes;

    triggerHandlers(event, this, "addNodesFrom", args);
  };

  G.addEdge = function (u, v) {
    var edges = [[u, v]];
    var newEdges = this.hasEdge(u, v) ? [] : edges;

    var event = new Event("addEdges", this);
    event.edges = edges;
    event.newEdges = newEdges;

    triggerHandlers(event, this, "addEdge", arguments);
  };

  G.addEdgesFrom = function (ebunch) {
    var edges = [];
    var newEdges = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (
        var _iterator2 = _getIterator(ebunch), _step2;
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        _iteratorNormalCompletion2 = true
      ) {
        var bunch = _step2.value;

        edges.push(bunch.slice());
        if (!this.hasEdge(bunch[0], bunch[1])) {
          newEdges.push(bunch.slice(0, 2));
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

    var event = new Event("addEdges", this);
    event.edges = edges;
    event.newEdges = newEdges;

    var args = _Array$from(arguments);
    args[0] = edges;

    triggerHandlers(event, this, "addEdgesFrom", args);
  };

  G.removeNode = function (n) {
    var event = new Event("removeNodes", this);
    event.nodes = [n];

    triggerHandlers(event, this, "removeNode", arguments);
  };

  G.removeNodesFrom = function (nbunch) {
    var nodes = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (
        var _iterator3 = _getIterator(nbunch), _step3;
        !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
        _iteratorNormalCompletion3 = true
      ) {
        var bunch = _step3.value;

        nodes.push(Array.isArray(bunch) ? bunch.slice() : bunch);
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

    var event = new Event("removeNodes", this);
    event.nodes = nodes;

    var args = _Array$from(arguments);
    args[0] = nodes;

    triggerHandlers(event, this, "removeNodesFrom", args);
  };

  G.removeEdge = function (u, v) {
    var event = new Event("removeEdges", this);
    event.edges = [[u, v]];

    triggerHandlers(event, this, "removeEdge", arguments);
  };

  G.removeEdgesFrom = function (ebunch) {
    var edges = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (
        var _iterator4 = _getIterator(ebunch), _step4;
        !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
        _iteratorNormalCompletion4 = true
      ) {
        var bunch = _step4.value;

        edges.push(bunch.slice());
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

    var event = new Event("removeEdges");
    event.edges = edges;

    var args = _Array$from(arguments);
    args[0] = edges;

    triggerHandlers(event, this, "removeEdgesFrom", args);
  };

  G.clear = function () {
    triggerHandlers(new Event("clear", this), this, "clear");
  };

  return G;
}

/**
 * Removes the properties added to a graph for event handling.
 *
 * @param {Graph} G
 * @return {Graph} The graph passed to the function
 */

function unobserve(G) {
  var proto = G.constructor.prototype;

  if (typeof G.on !== "function") {
    // nothing to do
    return G;
  }

  G.addNode = proto.addNode;
  G.addNodesFrome = proto.addNodesFrom;
  G.addEdge = proto.addEdge;
  G.addEdgesFrome = proto.addEdgesFrom;
  G.removeNode = proto.removeNode;
  G.removeEdge = proto.removeEdge;
  G.removeNodesFrom = proto.removeNodesFrom;
  G.removeEdgesFrom = proto.removeEdgesFrom;
  G.clear = proto.clear;

  delete G.on;
  delete G.off;

  return G;
}

/**
 * Tests whether the graph is observable.
 *
 * @param {Graph} G
 * @return {boolean}
 */

function isObservable(G) {
  return typeof G.on === "function" && typeof G.off === "function";
}
