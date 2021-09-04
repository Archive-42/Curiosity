require_relative 'p05_hash_map'
require_relative 'p04_linked_list'

class LRUCache
  def initialize(max, prc)
    @map = HashMap.new
    @store = LinkedList.new
    @max = max
    @prc = prc
  end

  def count
    @map.count
  end

  def get(key)
    if @map.include?(key)
      node = @map.get(key)
      update_node!(node)
      node.val
    else
      calc!(key)
    end
  end

  def to_s
    'Map: ' + @map.to_s + '\n' + 'Store: ' + @store.to_s
  end

  private

  def calc!(key)
    # suggested helper method; insert an (un-cached) key
    val = @prc.call(key)
    node = @store.append(key, val)
    @map.set(key, node)
    eject! if self.count > @max
    val
  end

  def update_node!(node)
    # suggested helper method; move a node to the end of the list
    node.remove
    updated = @store.append(node.key, node.val)
    @map.set(updated.key, updated)
  end

  def eject!
    removed = @store.first.remove
    @map.delete(removed.key)
  end
end
