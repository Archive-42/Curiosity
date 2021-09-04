  class LRUCache

    def initialize(size)
        @cache = []
        @size = size
    end

    def count
      # returns number of elements currently in cache
      @cache.size
    end

    def add(el)
      # adds element to cache according to LRU principle
        if @cache.include?(el)
            move_to_recent(el)
            return
        end

        @cache = @cache[1...@size] if count == @size #dumps oldest item if cache is full
        @cache << el 
    end

    def show
      # shows the items in the cache, with the LRU item first
      p @cache
    end

    private
    # helper methods go here!
    def move_to_recent(recent_el)
        updated = []
        @cache.each {|cache_el| updated << cache_el unless cache_el == recent_el}
        updated << recent_el
        @cache = updated
    end

  end