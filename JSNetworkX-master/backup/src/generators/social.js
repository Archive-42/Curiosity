"use strict";
/**
 * @fileoverview Famous social networkx
 */

import Graph from "../classes/Graph";

import range from "../_internals/range";

/**
 * Return Zachary's Karate club graph.
 *
 * ### References
 *
 * [1] Zachary W.
 *     An information flow model for conflict and fission in small groups.
 *     Journal of Anthropological Research, 33, 452-473, (1977).
 *
 * [2] Data file from:
 *     <http://vlado.fmf.uni-lj.si/pub/networks/data/Ucinet/UciData.htm>
 *
 * @return {Graph}
 */
export function karateClubGraph() {
  var G = new Graph();
  G.addNodesFrom(range(34));
  G.name = "Zachary's Karate Club";

  var zacharyData = [
    "0 1 1 1 1 1 1 1 1 0 1 1 1 1 0 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 1 0 0",
    "1 0 1 1 0 0 0 1 0 0 0 0 0 1 0 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0 1 0 0 0",
    "1 1 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 1 0",
    "1 1 1 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1",
    "0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1",
    "1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1",
    "0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1",
    "1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1",
    "1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 0 1 1",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 1 0 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 1 0 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1",
    "0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1",
    "0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 1 1",
    "0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1",
    "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 1 1",
    "0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 1 0 0 1 0 1 0 1 1 0 0 0 0 0 1 1 1 0 1",
    "0 0 0 0 0 0 0 0 1 1 0 0 0 1 1 1 0 0 1 1 1 0 1 1 0 0 1 1 1 1 1 1 1 0",
  ];

  zacharyData.forEach((line, row) => {
    var thisrow = line.split(" ");
    thisrow.forEach((val, col) => {
      if (val === "1") {
        G.addEdge(row, col); // col goes from 0,33
      }
    });
  });

  G.addNodesFrom([0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 16, 17, 19, 21], {
    club: "Mr. Hi",
  });
  G.addNodesFrom(
    [9, 14, 15, 18, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
    { club: "Officer" }
  );

  return G;
}

/**
 * Return Davis Southern women social network.
 *
 * This is a bipartite graph.
 *
 * ### References
 *
 * [1] A. Davis, Gardner, B. B., Gardner, M. R., 1941. Deep South.
 * University of Chicago Press, Chicago, IL.
 *
 * @return {Graph}
 */
export function davisSouthernWomenGraph() {
  var G = new Graph();
  // top nodes
  G.addNodesFrom(
    [
      "Evelyn Jefferson",
      "Laura Mandeville",
      "Theresa Anderson",
      "Brenda Rogers",
      "Charlotte McDowd",
      "Frances Anderson",
      "Eleanor Nye",
      "Pearl Oglethorpe",
      "Ruth DeSand",
      "Verne Sanderson",
      "Myra Liddel",
      "Katherina Rogers",
      "Sylvia Avondale",
      "Nora Fayette",
      "Helen Lloyd",
      "Dorothy Murchison",
      "Olivia Carleton",
      "Flora Price",
    ],
    { bipartite: 0 }
  );

  // bottom nodes
  G.addNodesFrom(
    [
      "E1",
      "E2",
      "E3",
      "E4",
      "E5",
      "E6",
      "E7",
      "E8",
      "E9",
      "E10",
      "E11",
      "E12",
      "E13",
      "E14",
    ],
    { bipartite: 1 }
  );

  G.add_edges_from([
    ["Evelyn Jefferson", "E1"],
    ["Evelyn Jefferson", "E2"],
    ["Evelyn Jefferson", "E3"],
    ["Evelyn Jefferson", "E4"],
    ["Evelyn Jefferson", "E5"],
    ["Evelyn Jefferson", "E6"],
    ["Evelyn Jefferson", "E8"],
    ["Evelyn Jefferson", "E9"],
    ["Laura Mandeville", "E1"],
    ["Laura Mandeville", "E2"],
    ["Laura Mandeville", "E3"],
    ["Laura Mandeville", "E5"],
    ["Laura Mandeville", "E6"],
    ["Laura Mandeville", "E7"],
    ["Laura Mandeville", "E8"],
    ["Theresa Anderson", "E2"],
    ["Theresa Anderson", "E3"],
    ["Theresa Anderson", "E4"],
    ["Theresa Anderson", "E5"],
    ["Theresa Anderson", "E6"],
    ["Theresa Anderson", "E7"],
    ["Theresa Anderson", "E8"],
    ["Theresa Anderson", "E9"],
    ["Brenda Rogers", "E1"],
    ["Brenda Rogers", "E3"],
    ["Brenda Rogers", "E4"],
    ["Brenda Rogers", "E5"],
    ["Brenda Rogers", "E6"],
    ["Brenda Rogers", "E7"],
    ["Brenda Rogers", "E8"],
    ["Charlotte McDowd", "E3"],
    ["Charlotte McDowd", "E4"],
    ["Charlotte McDowd", "E5"],
    ["Charlotte McDowd", "E7"],
    ["Frances Anderson", "E3"],
    ["Frances Anderson", "E5"],
    ["Frances Anderson", "E6"],
    ["Frances Anderson", "E8"],
    ["Eleanor Nye", "E5"],
    ["Eleanor Nye", "E6"],
    ["Eleanor Nye", "E7"],
    ["Eleanor Nye", "E8"],
    ["Pearl Oglethorpe", "E6"],
    ["Pearl Oglethorpe", "E8"],
    ["Pearl Oglethorpe", "E9"],
    ["Ruth DeSand", "E5"],
    ["Ruth DeSand", "E7"],
    ["Ruth DeSand", "E8"],
    ["Ruth DeSand", "E9"],
    ["Verne Sanderson", "E7"],
    ["Verne Sanderson", "E8"],
    ["Verne Sanderson", "E9"],
    ["Verne Sanderson", "E12"],
    ["Myra Liddel", "E8"],
    ["Myra Liddel", "E9"],
    ["Myra Liddel", "E10"],
    ["Myra Liddel", "E12"],
    ["Katherina Rogers", "E8"],
    ["Katherina Rogers", "E9"],
    ["Katherina Rogers", "E10"],
    ["Katherina Rogers", "E12"],
    ["Katherina Rogers", "E13"],
    ["Katherina Rogers", "E14"],
    ["Sylvia Avondale", "E7"],
    ["Sylvia Avondale", "E8"],
    ["Sylvia Avondale", "E9"],
    ["Sylvia Avondale", "E10"],
    ["Sylvia Avondale", "E12"],
    ["Sylvia Avondale", "E13"],
    ["Sylvia Avondale", "E14"],
    ["Nora Fayette", "E6"],
    ["Nora Fayette", "E7"],
    ["Nora Fayette", "E9"],
    ["Nora Fayette", "E10"],
    ["Nora Fayette", "E11"],
    ["Nora Fayette", "E12"],
    ["Nora Fayette", "E13"],
    ["Nora Fayette", "E14"],
    ["Helen Lloyd", "E7"],
    ["Helen Lloyd", "E8"],
    ["Helen Lloyd", "E10"],
    ["Helen Lloyd", "E11"],
    ["Helen Lloyd", "E12"],
    ["Dorothy Murchison", "E8"],
    ["Dorothy Murchison", "E9"],
    ["Olivia Carleton", "E9"],
    ["Olivia Carleton", "E11"],
    ["Flora Price", "E9"],
    ["Flora Price", "E11"],
  ]);

  return G;
}

/**
 * Return Florentine families graph.
 *
 * ### References
 *
 * [1] Ronald L. Breiger and Philippa E. Pattison
 * Cumulated social roles: The duality of persons and their algebras,1
 * Social Networks, Volume 8, Issue 3, September 1986, Pages 215-256
 *
 * @return {Graph}
 */
export function florentineFamiliesGraph() {
  var G = new Graph();
  G.addEdge("Acciaiuoli", "Medici");
  G.addEdge("Castellani", "Peruzzi");
  G.addEdge("Castellani", "Strozzi");
  G.addEdge("Castellani", "Barbadori");
  G.addEdge("Medici", "Barbadori");
  G.addEdge("Medici", "Ridolfi");
  G.addEdge("Medici", "Tornabuoni");
  G.addEdge("Medici", "Albizzi");
  G.addEdge("Medici", "Salviati");
  G.addEdge("Salviati", "Pazzi");
  G.addEdge("Peruzzi", "Strozzi");
  G.addEdge("Peruzzi", "Bischeri");
  G.addEdge("Strozzi", "Ridolfi");
  G.addEdge("Strozzi", "Bischeri");
  G.addEdge("Ridolfi", "Tornabuoni");
  G.addEdge("Tornabuoni", "Guadagni");
  G.addEdge("Albizzi", "Ginori");
  G.addEdge("Albizzi", "Guadagni");
  G.addEdge("Bischeri", "Guadagni");
  G.addEdge("Guadagni", "Lamberteschi");
  return G;
}
