from tree import Node

# test = Node((2, 1))
# print(test.value)


class KnightPathFinder:
    def __init__(self, start_position):
        self._root = Node(start_position)
        self._considered_positions = set(start_position)

    def get_valid_moves(self, pos):
        possible_moves = [
            (1, 2),
            (2, 1),
            (-1, 2),
            (-2, 1),
            (2, -1),
            (-1, -2),
            (-2, -1),
            (1, -2)
        ]

        moves = []
        current_x, current_y = pos
        for x_move, y_move in possible_moves:
            new_set_x, new_set_y = (current_x + x_move, current_y + y_move)
            # keep from going off the board, cannot exceed 8
            if new_set_x in range(0, 8) and new_set_y in range(0, 8):
                new_pos = (new_set_x, new_set_y)
                moves.append(new_pos)
        return moves

    def new_move_positions(self, pos):
        # call get valid moves with pos as param
        # filter valid moves with the considered postions
        # add result to considered postions
        possible_moves = set(self.get_valid_moves(pos)).difference(self._considered_positions)
        self._considered_positions = self._considered_positions.union(possible_moves)

        return possible_moves

    def build_move_tree(self):
        root = self._root
        moves_from_position = [root]
        while moves_from_position:
            current_node = moves_from_position.pop(0)
            current_position = current_node.value
            possible_moves = self.new_move_positions(current_position)
            for move in possible_moves:
                possible_position = Node(move)
                current_node.add_child(possible_position)
                moves_from_position.append(possible_position)

    def find_path(self, end_position):
        end_value = self._root.depth_search(end_position)
        view = [node.value for node in self.trace_to_root(end_value)]
        return view

    def trace_to_root(self, end_node):
        nodes = []
        current_node = end_node
        while current_node:
            nodes.insert(0, current_node)
            current_node = current_node.parent
        return nodes


finder = KnightPathFinder((0, 0))
finder.build_move_tree()
print(finder.find_path((2, 1))) # => [(0, 0), (2, 1)]
print(finder.find_path((6, 2))) # => [(0, 0), (1, 2), (2, 4), (4, 3), (6, 2)]
print(finder.find_path((7, 6))) # => [(0, 0), (1, 2), (2, 4), (4, 3), (5, 5), (7, 6)]
