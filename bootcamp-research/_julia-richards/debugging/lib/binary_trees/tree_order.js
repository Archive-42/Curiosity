function inOrderArray(root) {
	if (!root) return [];

	let left = inOrderArray(root.left); //b,d

	let right = inOrderArray(root.right);
	//return left.push(right).push(root.val);
	return [...left, root.val, ...right];
}

function postOrderArray(root) {
	if (!root) return [];

	let left = postOrderArray(root.left);
	let right = postOrderArray(root.right);

	return [...left, ...right, root.val];
}

// examples

const { TreeNode } = require("./tree_node.js");

let root = new TreeNode("a");
let b = new TreeNode("b");
let c = new TreeNode("c");
let d = new TreeNode("d");
let e = new TreeNode("e");
let f = new TreeNode("f");

root.left = b;
root.right = c;
b.left = d;
b.right = e;
c.right = f;

console.log(inOrderArray(root)); // should equal ['d', 'b', 'e', 'a', 'c', 'f']
//console.log(postOrderArray(root)); // should equal ['d', 'e', 'b', 'f', 'c', 'a']

module.exports = {
	inOrderArray,
	postOrderArray,
};
