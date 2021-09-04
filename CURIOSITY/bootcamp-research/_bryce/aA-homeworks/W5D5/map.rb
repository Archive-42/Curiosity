class Map

    def initialize
        @map = []
    end

    def set(key, value)
        @map.each_with_index do |ele, idx|
            if ele[0] == key
                @map[idx][1] = value
                return @map
            end
        end
        @map << [key, value]
    end

    def get(key)
        @map.each_with_index { |ele, idx| return ele[1] if ele[0] == key }
        nil
    end

    def delete(key)
        @map.reject!{|ele| ele[0] == key}
    end

    def show
        @map
    end

end