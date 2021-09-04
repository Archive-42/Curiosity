def sluggish(fish) #O(n^2)
    fish.each_with_index do |fish_1, idx_1|
        longest = fish_1.length
        fish.each_with_index do |fish_2, idx_2|
            next if idx_1 == idx_2
            longest = fish_2.length if fish_2.length > longest
        end
        return fish_1 if fish_1.length == longest
    end
end

def dominant(fish) #O(nlogn)
    sorted = merge_sort(fish)
    sorted.first
end

def merge_sort(arr)
    return arr if arr.length <= 1
    midpoint = arr.length / 2
    sorted_left = merge_sort(arr[0...midpoint])
    sorted_right = merge_sort(arr[midpoint..-1])
    merge(sorted_left, sorted_right)
end

def merge(left, right)
    merged = []
    until left.empty? || right.empty?
        if left.first <= right.first
            merged << left.shift
        else
            merged << right.shift
        end
    end
    merged + left + right
end

def clever(fish) #O(n)
    longest = fish.first
    fish.each {|ele| longest = ele if ele.length > longest.length}
    longest
end

# tiles_array = ["up", "right-up", "right", "right-down", "down", "left-down", "left",  "left-up" ]

def slow_dance(direction, tiles_array) #O(n)
    tiles_array.each_with_index do |tile, index|
        return index if tile == direction
    end
end

# tiles_hash = {"up" => 0, "right-up" => 1, "right" => 2, "right-down" => 3, "down" => 4, "left-down" => 5, "left" => 6,  "left-up" => 7}

def fast_dance(direction, tiles_hash) #O(1)
    tiles_hash[direction]
end