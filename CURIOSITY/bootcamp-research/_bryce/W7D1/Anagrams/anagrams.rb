def first_anagram?(base, anagram)
    char_base = base.split("")
    char_perm = char_base.permutation.to_a
    base_perm = char_perm.map {|perm| perm.join("")}
    base_perm.include?(anagram)
end

def second_anagram?(base,anagram) #O(n^2)
    
    char_base = base.split("") #n
    char_anagram = anagram.split("") #n

    char_base.each do |ch| #n
        found_idx = char_anagram.index(ch) #n
        return false if found_idx.nil?
        char_anagram.delete_at(found_idx) #n
    end
    char_anagram.empty? #c
    
end

def third_anagram?(base,anagram) #O n(logn)
    base.chars.sort == anagram.chars.sort
end

def fourth_anagram?(base, anagram) #O(2n) => O(n)
    base_hash = Hash.new(0)
    #anagram_hash = Hash.new(0)
    
    base.chars.each {|ch| base_hash[ch] += 1}
    anagram.chars.each {|ch| base_hash[ch] -= 1}

    base_hash.values.all?{|val| val == 0}
end