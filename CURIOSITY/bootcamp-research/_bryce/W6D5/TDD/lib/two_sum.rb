class Array

    def two_sum
        pairs = []
        (0...self.length-1).each do |idx_1|
            (idx_1+1...self.length).each do |idx_2|
                pairs << [idx_1, idx_2] if (self[idx_1] + self[idx_2] == 0)
            end
        end
        pairs
    end

end