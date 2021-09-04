require "byebug"
class StaticArray
  attr_reader :store

  def initialize(capacity)
    @store = Array.new(capacity)
  end

  def [](i)
    validate!(i)
    self.store[i]
  end

  def []=(i, val)
    validate!(i)
    self.store[i] = val
  end

  def length
    self.store.length
  end

  private

  def validate!(i)
    raise "Overflow error" unless i.between?(0, self.store.length - 1)
  end
end

class DynamicArray
  include Enumerable

  attr_accessor :count

  def initialize(capacity = 8)
    @store = StaticArray.new(capacity)
    @count = 0
  end

  def [](i)
    if i >= self.count
      return nil
    elsif i < 0
      i += self.count
    end
    return nil unless i >= 0 && i < capacity
    @store[i]
  end

  def []=(i, val)
    #debugger
    if i > self.count
      (count...i).each {|__| self.push(nil)}
    elsif i < 0
      i += self.count
      return nil if i < 0
    end

    @store[i] = val
    self.count += 1 if i == count

  end

  def capacity
    @store.length
  end

  def include?(val)
    self.any? {|el| el == val}
  end

  def push(val)
    resize! if self.count == self.capacity
    self[self.count] = val
  end

  def unshift(val)
    resize! if self.count == self.capacity
    (self.count).downto(1) {|idx| self[idx] = self[idx-1]}
    self[0] = val
    self.count += 1
  end

  def pop
    return nil if self.count == 0
    el = self[count-1]
    self[count-1] = nil
    self.count -= 1
    el
  end

  def shift
    return nil if self.count == 0
    el = self.first
    (0...self.count-1).each do |idx|
      self[idx] = self[idx+1]
    end
    self[self.count-1] = nil
    self.count -= 1
    el
  end

  def first
    self[0]
  end

  def last
    return nil if self.count == 0
    self[count-1]
  end

  def each
    (0...self.count).each { |idx| yield(self[idx])}
  end

  def to_s
    "[" + inject([]) { |acc, el| acc << el }.join(", ") + "]"
  end

  def ==(other)
    return false unless [Array, DynamicArray].include?(other.class)
    self.each_with_index{|el, idx| return false unless el == other[idx]}
    true
  end

  alias_method :<<, :push
  [:length, :size].each { |method| alias_method method, :count }

  private

  def resize!
    new_store = StaticArray.new(2*capacity)
    self.each_with_index {|el, idx| new_store[idx]=el}
    @store = new_store
  end
end
