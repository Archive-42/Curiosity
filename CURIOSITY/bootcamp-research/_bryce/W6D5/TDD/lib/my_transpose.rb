class Array

    def my_transpose
        transposed = Array.new(self.length) {Array.new}

        (0...self.length).each do |row|
            (0...self.length).each do |col|
                transposed[col][row] = self[row][col]
            end
        end

        transposed
    end

end