function breadthFirstSearch(startingNode, targetVal) {
	// uncomment below
	const queue = [startingNode];
	const visited = new Set();

	while (queue.length > 0) {
        let curr = queue.shift();
       
		if (visited.has(curr.val)) continue;
		if (curr.val === targetVal) return curr;
		visited.add(curr.val);
		// console.log(curr.neighbors)
		curr.neighbors.forEach((neighbor) => {
			queue.push(neighbor);
		});
	}
	return null;
}

module.exports = {
	breadthFirstSearch,
};

// example (uncomment below)

const { GraphNode } = require("./graph_node");

let a = new GraphNode("a");
let b = new GraphNode("b");
let c = new GraphNode("c");
a.neighbors = [b, c];
console.log(breadthFirstSearch(a, "c").val); // should equal 'c'

let s = new GraphNode("s");
let t = new GraphNode("t");
s.neighbors = [t];
t.neighbors = [s];
console.log(breadthFirstSearch(s, "q")); // should return null
