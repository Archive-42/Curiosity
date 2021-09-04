class MaxIntSet
  def initialize(max)
    @max = max
    @store = Array.new(max, false)
  end

  def insert(num)
    validate!(num)
    @store[num] = true
  end

  def remove(num)
    validate!(num)
    @store[num] = false
  end

  def include?(num)
    validate!(num)
    @store[num]
  end

  private

  def is_valid?(num)
    num < @max && num >= 0
  end

  def validate!(num)
    raise "Out of bounds" unless is_valid?(num)
  end
end


class IntSet
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    self[num] << num
  end
  
  def remove(num)
    self[num].delete(num)
  end
  
  def include?(num)
    self[num].include?(num)
  end
  
  private
  
  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    @store[num % num_buckets]
  end
  
  def num_buckets
    @store.length
  end
end

class ResizingIntSet
  attr_reader :count
  
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end
  
  def insert(num)
    return if self.include?(num)
    resize! if self.count == num_buckets
    self[num] << num
    @count += 1
  end
  
  def remove(num)
    @count -= 1 if self[num].delete(num) 
  end
  
  def include?(num)
    self[num].include?(num)
  end
  
  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    @store[num % num_buckets]
  end

  def num_buckets
    @store.length
  end

  def resize!
    new_size = num_buckets * 2
    bigger_store = Array.new(new_size) {Array.new}
    @store.each do |bucket|
      bucket.each do |el|
        bigger_store[el % new_size] << el
      end
    end
    @store = bigger_store
  end
end
