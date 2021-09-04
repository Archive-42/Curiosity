require "byebug"
class InvalidTowerNumber < RuntimeError; end
class InvalidTowerConfiguration < RuntimeError; end

class TowersOfHanoi
    attr_reader :tower_0, :tower_1, :tower_2, :all_towers

    def initialize
        @tower_0 = [5, 4, 3, 2, 1]
        @tower_1 = []
        @tower_2 = []
        @all_towers = [tower_0, tower_1, tower_2]
    end

    def render
        tower_contents = ""
        all_towers.each.with_index do |tower, idx|
            tower_contents << "T#{idx}: "
            tower.each {|disc| tower_contents << "#{disc}  "}
            tower_contents << "\n"
        end
        tower_contents
    end

    def play
        #puts render
        #until won?
            begin
                input = get_input
                move(input.first, input.last)
                puts render
            rescue RuntimeError => e
                puts e.message
                retry
            end
        #end

    end

    def move(take_from, place_on)
        source = all_towers[take_from]
        destination = all_towers[place_on]
        #debugger
        if destination.empty? || (destination.last > source.last)
            destination.push(source.pop)
        elsif destination.last < source.last
            raise InvalidTowerConfiguration.new("Cannot place discs on top of smaller discs")
        end

    end
    
    def get_input
        begin
            print "Take from which tower? "
            take_from = gets.to_i
            raise InvalidTowerNumber.new("Please input 0, 1, or 2") unless [0, 1, 2].include?(take_from)
     
            print "Place on which tower? "
            place_on = gets.to_i
            raise InvalidTowerNumber.new("Please input 0, 1, or 2") unless [0, 1, 2].include?(place_on)

        rescue InvalidTowerNumber => e
            puts e.message
            retry
        end
        
        [take_from, place_on]
    end

    def won?
        tower_1.length == 5 || tower_2.length == 5
    end
end