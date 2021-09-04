class GraphNode
    attr_accessor :value, :neighbors

    def initialize(value)
        @value = value
        @neighbors = []
    end

    def self.bfs(starting_node, target_value)
        visited_nodes = Set.new
        queue = [starting_node]
        until queue.empty?
            current_node = queue.shift
            visited_nodes << current_node
            return current_node if current_node.value == target_value
            current_node.neighbors.each {|neighbor| queue << neighbor unless visited_nodes.include?(neighbor)}
        end
        nil
    end
end