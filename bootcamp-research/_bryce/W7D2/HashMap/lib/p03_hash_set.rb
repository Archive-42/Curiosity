class HashSet
  attr_reader :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    return if self.include?(key)
    resize! if self.count == num_buckets
    self[key.hash] << key
    @count += 1
  end

  def include?(key)
    self[key.hash].include?(key)
  end

  def remove(key)
    @count -= 1 if self[key.hash].delete(key) 
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
        bigger_store[el.hash % new_size] << el
      end
    end
    @store = bigger_store
  end
end
