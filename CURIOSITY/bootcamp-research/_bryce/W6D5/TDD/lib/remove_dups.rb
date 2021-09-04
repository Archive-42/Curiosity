class Array

    def my_uniq
        unique = []
        self.each {|ele| unique << ele unless unique.include?(ele)}
        unique
    end

end