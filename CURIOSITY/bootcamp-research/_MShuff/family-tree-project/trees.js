// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new Node(data);

        if (!this.root) this.root = newNode;
        else this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode) {
        // If data is less than the node, move data to left of tree
        if (newNode.data < node.data) {
            !node.left ? node.left = newNode : this.insertNode(node.left, newNode);
        } else {
            !node.right ? node.right = newNode : this.insertNode(node.right, newNode);
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, key) {
        if (!node) return null;

        if (key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            if (!node.left && !node.right) {
                node = null;
                return node;
            }

            if (!node.left) {
                node = node.right;
                return node;
            }

            if (!node.right) {
                node = node.left;
                return node;
            }

            var aux = this.findMinNode(node.right);
            node.data = aux.data;

            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
    }

    // Helper Functions
    findMinNode(node) {
        if (!node.left) return node;
        else return this.findMinNode(node.left);
    }
    getRootNode() {
        return this.root;
    }
    inorder(node) {
        if (node) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }
    preorder(node) {
        if (node) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }
    postorder(node) {
        if (node) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data)
        }
    }
    search(node, data) {
        if (!node) return null;
        if (data === node.data) return node;
        if (data < node.data) return this.search(node.left, data);
        if (data > node.data) return this.search(node.right, data);

        return node;
    }
}

const tree = new BinarySearchTree();
tree.insert('Michael Shuff');
tree.insert('Christina Wright');
tree.insert('David Shuff');
tree.insert('Sebastian Stan');
console.log(tree);
tree.inorder(tree.root);
console.log(`----------------`);
tree.preorder(tree.root);
console.log(`----------------`);
tree.postorder(tree.root);
console.log(`----------------`);
console.log(tree.getRootNode());
console.log(tree.search(tree.root, 'Sebastian Stan'));
