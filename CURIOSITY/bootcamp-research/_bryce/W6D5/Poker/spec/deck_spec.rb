require "deck"

describe Deck do
    subject(:deck) {Deck.new}
    let(:card)  {double("card", :value => :ace, :suit => :spades)}

    describe "#initialize" do

        it "creates a 52 card deck" do
            expect(deck.count).to eq(52)
        end

        it "does not have any repeated cards" do
            expect(deck.cards.uniq.count).to eq(deck.count)
        end

    end

    describe "#count" do
        it "returns the number of cards in the deck" do
            expect(deck.count).to eq(52)
            deck.take(1)
            expect(deck.count).to eq(51)
            deck.take(3)
            expect(deck.count).to eq(48)
        end
    end

    describe "#take" do
        
        it "returns an array of cards" do
            taken = deck.take(2)
            expect(taken).to be_an(Array)
        end

        it "takes from the top of the deck" do
            to_take = deck.cards[-2..-1]
            taken = deck.take(2)
            expect(taken).to match_array(to_take)
        end

        it "removes card from deck" do
            deck.take(2)
            expect(deck.count).to eq(50)
        end

        it "raises an errror if more cards are taken than exist" do
            expect{deck.take(53)}.to raise_error(DeckTooSmall)
        end

    end

    describe "#shuffle" do

        it "should shuffle the cards" do
            original = deck.cards.dup
            shuffled = deck.shuffle
            expect(shuffled).to_not contain_exactly(original)
            expect(shuffled).to match_array(original)
        end

    end

end