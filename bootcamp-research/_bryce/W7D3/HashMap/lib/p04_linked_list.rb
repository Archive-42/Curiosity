class Node
  attr_reader :key
  attr_accessor :val, :next, :prev

  def initialize(key = nil, val = nil)
    @key = key
    @val = val
    @next = nil
    @prev = nil
  end

  def to_s
    "#{@key}: #{@val}"
  end

  def remove
    # optional but useful, connects previous link to next link
    # and removes self from list.
    self.prev.next = self.next if self.prev
    self.next.prev = self.prev if self.next
    self.prev = nil
    self.next = nil
    self
  end
end

class LinkedList
  include Enumerable

  attr_reader :head, :tail

  def initialize
    @head = Node.new
    @tail = Node.new
    @head.next = @tail
    @tail.prev = @head
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    return nil if empty?
    self.head.next
  end

  def last
    return nil if empty?
    self.tail.prev
  end

  def empty?
    self.head.next == self.tail
  end

  def get(key)
    each {|node| return node.val if node.key == key}
    nil
  end

  def include?(key)
    any? {|node| node.key == key}
  end

  def append(key, val)
    new_node = Node.new(key, val)
    self.tail.prev.next = new_node
    new_node.prev = self.tail.prev
    new_node.next = self.tail
    self.tail.prev = new_node
    new_node
  end

  def update(key, val)
    return if empty?
    each do |node| 
      if node.key == key
        node.val = val
        return
      end
    end
  end

  def remove(key)
    each do |node| 
      if node.key == key
        return node.remove ### include a return value so that hash_map knows a deletion happened
      end
    end
  end

  def each
    node = first
    until node == @tail || node == nil   ### getting nil from #first
      yield(node) 
      node = node.next
    end
  end

  #uncomment when you have `each` working and `Enumerable` included
  def to_s
    inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  end
end
