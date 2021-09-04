class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

class BST {
	constructor() {
		this.root = null;
	}

	insert(val, root = this.root) {
		if (!root) {
			this.root = new TreeNode(val);
			return this;
		}

		let current = root;

		if (val < root.val) {
			if (!root.left) {
				root.left = new TreeNode(val);
			} else {
				this.insert(val, root.left);
			}
		} else {
			if (!root.right) {
				root.right = new TreeNode(val);
			} else {
				this.insert(val, root.right);
			}
		}
	}

	searchRecur(val, root = this.root) {
		if (!root) return false;
        if(root.val === val){ 
            return true;
        }else{
            if (val < root.val) {
                return this.searchRecur(val, root.left);
            } else {
                return this.searchRecur(val, root.right);
            }

        }
	}

	searchIter(val) {//7
        if(!this.root) return false;
        let current = this.root
        
		while (current) { 
            if (val === current.val) return true;
            if (val < current.val) {
                current = current.left;
                //console.log(current.val, current.left)
			} else {
                current = current.right;
                //console.log(current.val, current.right)
			}
		}
		return false;
	}
}

module.exports = {
	TreeNode,
	BST,
};

// example
let tree = new BST();
tree.insert(10);
tree.insert(5);
tree.insert(16);
tree.insert(1);
tree.insert(7);
tree.insert(16);

console.log(tree.searchRecur(7)); // should be true
console.log(tree.searchRecur(14)); // should be false

console.log(tree.searchIter(7)); // should be true
console.log(tree.searchIter(14)); // should be false
