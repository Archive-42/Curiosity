class DeckTooSmall < RuntimeError; end

require_relative "card"

class Deck
    attr_reader :cards

    def initialize
        @cards = []

        Card.valid_values.each do |value|
            Card.valid_suits.each do |suit|
                @cards << Card.new(value, suit)
            end
        end

    end

    def count
        @cards.count
    end

    def take(num)
        raise DeckTooSmall unless num < count
        taken = []
        num.times {taken << cards.pop}
        taken
    end

    def shuffle
        @cards.shuffle!
    end

end