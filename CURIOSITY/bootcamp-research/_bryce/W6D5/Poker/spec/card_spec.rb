require "card"

describe Card do
    subject(:card) {Card.new(:ace, :spades)}

    describe "#initialize" do
        it "stores the card's value and suit" do
            expect(card.value).to eq(:ace)
            expect(card.suit).to eq(:spades)
        end

        it "raises an error for invalid values" do
            expect {Card.new(:one, :spades)}.to raise_error(InvalidCard)
        end

        it "raises an error for invalid suits" do
            expect {Card.new(:ace, :clovers)}.to raise_error(InvalidCard)
        end
    end

    describe "#<=>" do
        it "returns -1 when the card has a lower value" do
            expect(Card.new(:two, :hearts) <=> Card.new(:three, :hearts)).to eq(-1)
        end

        it "returns 0 when the card has the same value" do
            expect(Card.new(:two, :hearts) <=> Card.new(:two, :spades)).to eq(0)
        end

        it "returns 1 when the card has a higher value" do
            expect(Card.new(:ace, :hearts) <=> Card.new(:two, :hearts)).to eq(1)
        end
    end

end