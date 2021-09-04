require "byebug"

def range_iter(first, last)
    return [] if last < first
    result = []
    (first...last).each {|num| result << num}
    result
end

def range_rec(first, last)
    return [] if last < first
    return [first] if first == last - 1
    [first] + range_rec(first + 1, last)
end

def exp(b, n)
    return 1 if n == 0
    b * exp(b, n-1)
end

def exp_2(b, n)
    return 1 if n == 0
    return b if n == 1
    if n % 2 == 0
        even_result = exp_2(b, n / 2) 
        return even_result * even_result
    else
        odd_result = (exp_2(b, (n - 1) / 2) )
        return b * odd_result * odd_result
    end
end

class Array
    def deep_dup
        duplicated = []
        
        self.each do |ele|
            if !ele.is_a?(Array)
                duplicated << ele
            else
                duplicated << ele.deep_dup
            end
        end

        duplicated
    end
end 

def fib_iter(n)
    fibs = []
    (n).times do |ele|
        if fibs.length < 2
            fibs << 1
        else
            fibs << (fibs[-1] + fibs[-2])
        end
    end
    fibs
end

def fib_rec(n)
    return [] if n == 0
    return [1] if n == 1
    return [1, 1] if n == 2

    previous_fibs = fib_rec(n-1)

    previous_fibs << previous_fibs[-1] + previous_fibs[-2]
end

def bsearch(array, target)
    return nil if array.empty?
    index = array.length / 2
    return index if array[index] == target

    if target > array[index]
        new_index = bsearch(array[index + 1..-1], target)
        new_index.nil? ? nil : (index + 1 + new_index)
    else
        bsearch(array[0...index], target)
    end
end

def merge_sort(array)
    return array if array.length <= 1

    mid_idx = array.length / 2
    array_l = array[0...mid_idx]
    array_r = array[mid_idx..-1]

    merge(merge_sort(array_l), merge_sort(array_r))
end

def merge(array_l, array_r)
    if array_l[0] <= array_r[0]
        array_l + array_r
    else
        array_r + array_l
    end
end

def subsets(array)
    return [array] if array.empty?
    subsets_arr = subsets( array[0...-1] )
    final_subsets = subsets_arr.deep_dup
    subsets_arr.each do |ele|
        new_ele = (ele << array[-1])
        final_subsets << new_ele
    end
    
    final_subsets
end

def permutations(array)
    return array if array.length == 1
    perms = []
    array.each.with_index do |ele, idx|
        remaining_eles = array[0...idx] + array[idx+1..-1]
        permutations(remaining_eles).each do |perm|
            if perm.is_a?(Array)
                perms << perm.unshift(ele)
            else
                perms << [perm].unshift(ele)
            end
        end
    end
    perms
end

class Coins

    attr_accessor :iterations

    def initialize
        @iterations = 0
    end

    def make_change(amount, coins = [25, 10, 5, 1])
        return [] if amount == 0
        
        coins_used = []
        coins.each do |coin|
            if amount >= coin
                coins_used << coin
                coins_used += make_change(amount - coin, coins)
                self.iterations += 1
                break
            # else
            #     coins_used += make_change(amount, coins[1..-1])
            #     self.iterations += 1
            #     break
            end
        end
        coins_used
        
    end

    def greedy_make_change(amount, coins = [25, 10, 5, 1])
        return [] if amount == 0

        coins_used = []
    
        if amount >= coins[0]
            coins_used += [ coins[0] ] + greedy_make_change(amount - coins[0], coins)
        else
            coins_used += greedy_make_change(amount, coins[1..-1])
        end

        coins_used
    end

end

