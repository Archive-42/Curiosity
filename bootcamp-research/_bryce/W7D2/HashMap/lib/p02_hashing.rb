class Integer
  # Integer#hash already implemented for you
end

class Array
  def hash
    entangled = self.map.with_index {|el, idx| el * (idx + 3)}
    compressed = entangled.sum
    compressed.hash
  end
end

class String
  def hash
    chars = self.chars
    chars_to_ints = chars.map {|char| char.ord}
    chars_to_ints.hash
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    hashed_pairs = self.map {|k, v| (k.to_s.hash + v.hash).hash}
    hashed_pairs.sum.hash
  end
end
