/*global assert*/
"use strict";

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")[
  "default"
];

var _interopRequireWildcard =
  require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _weighted = require("../weighted");

var weighted = _interopRequireWildcard(_weighted);

var _internals = require("../../../_internals");

var _ = require("../../../");

var _generators = require("../../../generators");

function validatePath(G, source, target, length, path) {
  assert.equal(path[0], source);
  assert.equal(path[path.length - 1], target);
  var sum = 0;
  if (!G.isMultigraph()) {
    for (var i = 0; i < path.length - 1; i += 1) {
      sum += (0, _internals.getDefault)(
        G.get(path[i]).get(path[i + 1]).weight,
        1
      );
    }
  } else {
    for (var i = 0; i < path.length - 1; i += 1) {
      var keydata = G.get(path[i]).get(path[i + 1]);
      var min = Infinity;
      for (var prop in keydata) {
        var weight = (0, _internals.getDefault)(keydata[prop].weight, 1);
        min = weight < min ? weight : min;
      }
      sum += min;
    }
  }
  assert.equal(length, sum);
}

var testWeighted = {
  beforeEach: function beforeEach() {
    this.grid = (0, _.convertNodeLabelsToIntegers)(
      (0, _generators.grid2dGraph)(4, 4),
      1,
      "sorted"
    );
    this.cycle = (0, _generators.cycleGraph)(7);
    this.XG = new _.DiGraph();
    this.XG.addWeightedEdgesFrom([
      ["s", "u", 10],
      ["s", "x", 5],
      ["u", "v", 1],
      ["u", "x", 2],
      ["v", "y", 1],
      ["x", "u", 3],
      ["x", "v", 5],
      ["x", "y", 2],
      ["y", "s", 7],
      ["y", "v", 6],
    ]);

    this.MXG = new _.MultiDiGraph(this.XG);
    this.MXG.addEdge("s", "u", { weight: 15 });
    this.XG2 = new _.DiGraph();
    this.XG2.addWeightedEdgesFrom([
      [1, 4, 1],
      [4, 5, 1],
      [5, 6, 1],
      [6, 3, 1],
      [1, 3, 50],
      [1, 2, 100],
      [2, 3, 100],
    ]);
    this.XG3 = new _.DiGraph();
    this.XG3.addWeightedEdgesFrom([
      [0, 1, 2],
      [1, 2, 12],
      [2, 3, 1],
      [3, 4, 5],
      [4, 5, 1],
      [5, 0, 10],
    ]);
    this.XG4 = new _.DiGraph();
    this.XG4.addWeightedEdgesFrom([
      [0, 1, 2],
      [1, 2, 2],
      [2, 3, 1],
      [3, 4, 1],
      [4, 5, 1],
      [5, 6, 1],
      [6, 7, 1],
      [7, 0, 1],
    ]);
    this.MXG4 = new _.MultiDiGraph(this.XG4);
    this.MXG4.addEdge(0, 1, { weight: 3 });
    this.G = new _.DiGraph(); // no weights
    this.G.addEdgesFrom([
      ["s", "u"],
      ["s", "x"],
      ["u", "v"],
      ["u", "x"],
      ["v", "y"],
      ["x", "u"],
      ["x", "v"],
      ["x", "y"],
      ["y", "s"],
      ["y", "v"],
    ]);
  },

  testDijkstra: function testDijkstra() {
    // istanbul ignore next

    var _this = this;

    var _weighted$singleSourceDijkstra = weighted.singleSourceDijkstra(
      this.XG,
      { source: "s" }
    );

    var _weighted$singleSourceDijkstra2 = _slicedToArray(
      _weighted$singleSourceDijkstra,
      2
    );

    var distances = _weighted$singleSourceDijkstra2[0];
    var paths = _weighted$singleSourceDijkstra2[1];

    validatePath(this.XG, "s", "v", 9, paths.get("v"));
    assert.equal(distances.get("v"), 9);

    validatePath(
      this.XG,
      "s",
      "v",
      9,
      weighted.singleSourceDijkstraPath(this.XG, { source: "s" }).get("v")
    );
    assert.equal(
      weighted
        .singleSourceDijkstraPathLength(this.XG, { source: "s" })
        .get("v"),
      9
    );

    validatePath(
      this.XG,
      "s",
      "v",
      9,
      weighted.singleSourceDijkstra(this.XG, { source: "s" })[1].get("v")
    );
    validatePath(
      this.MXG,
      "s",
      "v",
      9,
      weighted.singleSourceDijkstraPath(this.MXG, { source: "s" }).get("v")
    );

    var GG = this.XG.toUndirected();
    // make sure we get lower weight
    // toUndirected might choose either edge with weight 2 or 3
    GG.get("u").get("x").weight = 2;

    var _weighted$singleSourceDijkstra3 = weighted.singleSourceDijkstra(GG, {
      source: "s",
    });

    var _weighted$singleSourceDijkstra32 = _slicedToArray(
      _weighted$singleSourceDijkstra3,
      2
    );

    distances = _weighted$singleSourceDijkstra32[0];
    paths = _weighted$singleSourceDijkstra32[1];

    validatePath(GG, "s", "v", 8, paths.get("v"));
    assert.equal(distances.get("v"), 8); // uses lower weight of 2 on u<->x edge
    validatePath(
      GG,
      "s",
      "v",
      8,
      weighted.dijkstraPath(GG, { source: "s", target: "v" })
    );
    assert.equal(
      weighted.dijkstraPathLength(GG, { source: "s", target: "v" }),
      8
    );

    validatePath(
      this.XG2,
      1,
      3,
      4,
      weighted.dijkstraPath(this.XG2, { source: 1, target: 3 })
    );
    validatePath(
      this.XG3,
      0,
      3,
      15,
      weighted.dijkstraPath(this.XG3, { source: 0, target: 3 })
    );
    assert.equal(
      weighted.dijkstraPathLength(this.XG3, { source: 0, target: 3 }),
      15
    );
    validatePath(
      this.XG4,
      0,
      2,
      4,
      weighted.dijkstraPath(this.XG4, { source: 0, target: 2 })
    );
    assert.equal(
      weighted.dijkstraPathLength(this.XG4, { source: 0, target: 2 }),
      4
    );
    validatePath(
      this.MXG4,
      0,
      2,
      4,
      weighted.dijkstraPath(this.MXG4, { source: 0, target: 2 })
    );
    validatePath(
      this.G,
      "s",
      "v",
      2,
      weighted
        .singleSourceDijkstra(this.G, { source: "s", target: "v" })[1]
        .get("v")
    );
    validatePath(
      this.G,
      "s",
      "v",
      2,
      weighted.singleSourceDijkstra(this.G, { source: "s" })[1].get("v")
    );
    validatePath(
      this.G,
      "s",
      "v",
      2,
      weighted.dijkstraPath(this.G, { source: "s", target: "v" })
    );
    assert.equal(
      weighted.dijkstraPathLength(this.G, { source: "s", target: "v" }),
      2
    );

    // JSNetworkXError: node s not reachable from moon
    assert.throws(function () {
      return weighted.dijkstraPath(_this.G, { source: "s", target: "moon" });
    }, _.JSNetworkXNoPath);
    assert.throws(function () {
      return weighted.dijkstraPathLength(_this.G, {
        source: "s",
        target: "moon",
      });
    }, _.JSNetworkXNoPath);

    validatePath(
      this.cycle,
      0,
      3,
      3,
      weighted.dijkstraPath(this.cycle, { source: 0, target: 3 })
    );
    validatePath(
      this.cycle,
      0,
      4,
      3,
      weighted.dijkstraPath(this.cycle, { source: 0, target: 4 })
    );

    assert.deepEqual(
      weighted.singleSourceDijkstra(this.cycle, { source: 0, target: 0 }),
      [new _.Map([[0, 0]]), new _.Map([[0, 0]])]
    );
  },

  // TODO testBidirectionalDijkstra
  // TODO testBidirectionalDijkstraNoPath
  // TODO testDijkstraPredecessor

  testSingleSourceDijkstraPathLength:
    function testSingleSourceDijkstraPathLength() {
      var pl = weighted.singleSourceDijkstraPathLength;
      assert.equal(pl(this.MXG4, { source: 0 }).get(2), 4);
      assert.notOk(pl(this.MXG4, { source: 0, cutoff: 2 }).has(4));
    },
};
exports.testWeighted = testWeighted;
// TODO testBidirectionalDijkstraMultigraph
// TODO testDijkstraPredDistanceMultigraph
// TODO testNegativeEdgeCycle
