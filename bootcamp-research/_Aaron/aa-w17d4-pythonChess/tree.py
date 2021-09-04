class Node:
    def __init__(self, value):
        self._value = value
        self._parent = None
        self._children = []

    @property
    def value(self):
        return self._value

    @property
    def children(self):
        return self._children

    def add_child(self, node, call_parent=False):
        if (node not in self._children):
            self._children.append(node)
            if not call_parent:
                node.parent = self

    def remove_child(self, node, call_parent=False):
        if node != None:
            self._children.remove(node)
            if not call_parent:
                node.parent = None

    @property
    def parent(self):
        return self._parent

    @parent.setter
    def parent(self, parent):
        if not parent:
            self._parent = parent
            return
        if self._parent:
            self._parent.remove_child(self, True)
        self._parent = parent
        parent.add_child(self, True)

    def depth_search(self, value):
        # print(self, self.value, value)
        if self.value == value:
            return self

        if not self._children:
            return
        for child in self._children:
            temp = child.depth_search(value)
            if temp:
                return temp
        return None

    def breadth_search(self, value):
        queue = []
        queue.append(self)
        while queue:
            current_node = queue.pop(0)
            if current_node.value == value:
                return current_node
            queue.extend(current_node.children)
        return None


# node1 = Node("root1")
# node2 = Node("root2")
# node3 = Node("root3")

# node3.parent = node1
# node3.parent = node2

# print(node1.children)
# print(node2.children)
