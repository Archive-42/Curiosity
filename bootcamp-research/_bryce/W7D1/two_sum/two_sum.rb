def bad_two_sum?(arr,target_sum) #O(n^2)
    (0...arr.length).each do |idx1|
        (idx1+1...arr.length).each do |idx2|
            return true if arr[idx1] + arr[idx2] == target_sum
        end
    end
    false
end


def okay_two_sum?(arr,target_sum) #O(nlog(n))

    sorted = arr.sort

    start_idx = 0
    end_idx =  sorted.length - 1

    until start_idx >= end_idx
        sum = sorted[start_idx] + sorted[end_idx]
        return true if sum == target_sum
        if sum > target_sum
            end_idx -= 1
        else
            start_idx += 1
        end 
    end
    false
end

def two_sum?(arr,target_sum) #O(n)

    hash_arr = Hash.new(0)
    arr.each {|ele| hash_arr[ele] += 1}

    hash_arr.keys.each do |key|
        next if key == target_sum - key # no duplicate keys
        return true if hash_arr.has_key?(target_sum - key)
    end

    false
end