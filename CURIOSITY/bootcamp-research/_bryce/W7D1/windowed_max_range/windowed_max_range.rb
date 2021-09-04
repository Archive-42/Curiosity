def max_windowed_range(arr,window_size)
    current_max_range = nil
    (0..arr.length - window_size).each do |start_idx| #n
        min = arr[start_idx...start_idx+window_size].min #2n
        max = arr[start_idx...start_idx+window_size].max #2n
        range = max - min
        if current_max_range.nil?
            current_max_range = range
        else
            current_max_range = range if range > current_max_range
        end
    end
    current_max_range
end



class MyQueue

    def initialize
        @queue = []
    end

    def enqueue(el)
        @queue.push(el)
    end

    def dequeue
        @queue.shift
    end

    def peek
        @queue.first
    end

    def size
       @queue.size
    end

    def empty?
       size == 0
    end

end

class MyStack

    def initialize
        @stack = []
    end

    def push(el)
        @stack.push(el)
    end

    def pop
        @stack.pop
    end

    def peek
        @stack.last
    end

    def size
        @stack.size
    end

    def empty?
        size == 0
    end

end

class StackQueue

    def initialize
        @stackqueue1 = MyStack.new
        @stackqueue2 = MyStack.new
    end

    def size
        @stackqueue1.size + @stackqueue2.size
    end

    def empty?
        self.size == 0
    end

    def enqueue(el)
        @stackqueue1.push(el)
    end

    def dequeue
        if @stackqueue2.empty?
            until @stackqueue1.empty?
                @stackqueue2.push(@stackqueue1.pop)
            end
        end
        @stackqueue2.pop
    end
end