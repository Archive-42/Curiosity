class InvalidCard < RuntimeError; end

class Card
    attr_reader :value, :suit

    VALID_VALUES = [:two, :three, :four, :five, :six, :seven, :eight, :nine, :ten, :jack, :queen, :king, :ace].freeze
    VALID_SUITS = [:hearts, :diamonds, :spades, :clubs].freeze

    def initialize(value, suit)
        raise InvalidCard.new("Card value must be between 2 and Ace") unless VALID_VALUES.include?(value)
        raise InvalidCard.new("Card suit must be hearts, diamonds, spades, or clubs") unless VALID_SUITS.include?(suit)
        @value = value
        @suit = suit
    end

    def <=>(other_card)
        comparison = VALID_VALUES.index(value) - VALID_VALUES.index(other_card.value)
        if comparison < 0
            -1
        elsif comparison == 0
            0
        else
            1
        end 
    end

    def self.valid_values
        VALID_VALUES
    end

    def self.valid_suits
        VALID_SUITS
    end

end