require_relative 'p04_linked_list'

class HashMap
  include Enumerable

  attr_accessor :count, :store

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { LinkedList.new }
    @count = 0
  end

  def include?(key)
    bucket(key).include?(key)
  end

  def set(key, val)

    if self.include?(key)
      bucket(key).update(key, val)
    else
      resize! if self.count == num_buckets
      bucket(key).append(key, val)
      self.count += 1
    end

  end

  def get(key)
    bucket(key).get(key)
  end

  def delete(key)
    self.count -= 1 if bucket(key).remove(key)
  end

  def each
    self.store.each {|bucket| bucket.each{|node| yield(node.key, node.val)}}
  end

  # uncomment when you have Enumerable included
  def to_s
    pairs = inject([]) do |strs, (k, v)|
      strs << "#{k.to_s} => #{v.to_s}"
    end
    "{\n" + pairs.join(",\n") + "\n}"
  end

  alias_method :[], :get
  alias_method :[]=, :set

  private

  def num_buckets
    self.store.length
  end

  def resize!
    prev_store = self.store
    new_size = num_buckets * 2
    self.store = Array.new(new_size) {LinkedList.new}
    self.count = 0
    prev_store.each do |bucket|
      bucket.each do |node|
        self.set(node.key, node.val)
      end
    end
  end

  def bucket(key)
    # optional but useful; return the bucket corresponding to `key`
    self.store[key.hash % num_buckets]
  end
end
