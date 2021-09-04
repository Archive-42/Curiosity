list = [ 0, 3, 5, 4, -5, 10, 1, 90 ]

def my_min(arr) #O(n^2)
    arr.each do |ele1|
        lowest = true
        arr.each do |ele2|
            next if ele1 == ele2
            lowest = false if ele1 > ele2
            #min = ele2 if min > ele2
        end
        return ele1 if lowest
    end
end
p list
puts my_min(list)


def better_my_min(arr) #O(n)
    min = arr.first
    arr.each do |ele|
        min = ele if min > ele
    end
    min
end

puts better_my_min(list)
# list[0..1].sum

def largest_contiguous_subsum(list) #O(n^2)
    largest_sum = list.first
    (0...list.length).each do |start_idx|
        (start_idx...list.length).each do |end_idx|
            current_sum = list[start_idx..end_idx].sum
            largest_sum =  current_sum if current_sum > largest_sum
        end
    end
    largest_sum
end

list = [5, 3, -7]
p largest_contiguous_subsum(list)

list = [-5, -1, -3]
p largest_contiguous_subsum(list)

def better_largest_contiguous_subsum(list) #O(2n) => O(n)
    maximum = list.max
    return maximum if maximum < 0
    largest_sum = list.first
    current_sum = list.first
    (1...list.length).each do |idx|
        current_sum += list[idx] 
        if current_sum > 0
            largest_sum = current_sum if current_sum > largest_sum
        else
            current_sum = 0
        end
    end
    largest_sum
end

list2 = [2, 3, -6, 7, -6, 7]
p better_largest_contiguous_subsum(list2)