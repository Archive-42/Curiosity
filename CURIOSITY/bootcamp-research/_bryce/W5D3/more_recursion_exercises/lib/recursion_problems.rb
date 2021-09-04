#Problem 1: 

def sum_recur(array)
  return 0 if array.empty?
  array[0] + sum_recur(array.drop(1))
end

#Problem 2: 

def includes?(array, target)
  return false if array.empty?
  return true if array[0] == target
  includes?(array.drop(1), target)
end

# Problem 3: 

def num_occur(array, target)
  return 0 if array.empty?
  (array[0] == target ? 1 : 0) + num_occur(array.drop(1), target) 
end

# Problem 4: 

def add_to_twelve?(array)
  return false if array.length < 2
  return true if array[0] + array[1] == 12
  add_to_twelve?(array.drop(1))
end

# Problem 5: 

def sorted?(array)
  return true if array.length < 2
  return false if array[0] > array[1]
  sorted?(array.drop(1))
end

# Problem 6: 

def reverse(string)
  return string if string.length < 2
  string[string.length - 1] + reverse(string[0..-2])
end
