require "towers_of_hanoi"

describe TowersOfHanoi do
  subject(:game) {TowersOfHanoi.new}

  describe "#initialize" do
    it "creates three tower arrays" do
        expect(game.tower_0).to be_an(Array)
        expect(game.tower_1).to be_an(Array)
        expect(game.tower_2).to be_an(Array)
    end

    it "starts tower_0 to be an array holding discs 5..1" do
        expect(game.tower_0).to contain_exactly(5, 4, 3, 2, 1)
    end

    it "starts tower_1 and tower_2 to be empty arrays" do
        expect(game.tower_1).to be_empty
        expect(game.tower_2).to be_empty
    end
  end

  describe "#render" do
    it "shows the contents of the stacks" do
        expect(game.render).to eq("T0: 5  4  3  2  1  \nT1: \nT2: \n")
    end
  end

  describe "#play" do
    it "calls #move(from, to)" do
        expect(game).to receive("move").at_least(:once)
        game.play
    end

    it "calls #render" do
        expect(game).to receive("render").at_least(:once)
        game.play
    end
  end

  describe "#move(from, to)" do
    it "allows for movement onto empty towers" do
        expect{game.move(0, 1)}.to_not raise_error
        expect(game.tower_0.length).to eq(4)
        expect(game.tower_1.length).to eq(1)
    end

    it "allows for movement onto larger discs" do
        game.move(0,1)
        game.move(0,2)
        expect{game.move(1,2)}.to_not raise_error
        expect(game.tower_0).to contain_exactly(5, 4, 3)
        expect(game.tower_1).to be_empty
        expect(game.tower_2).to contain_exactly(2, 1)
    end

    it "does not allow for movement onto smaller" do
        game.move(0,1)
        expect{game.move(0, 1)}.to raise_error(InvalidTowerConfiguration)
    end
  end

  describe "won?" do
    it "is won if all discs are in tower 1" do
        game.move(0, 1)
        game.move(0, 2)
        game.move(1, 2)
        game.move(0, 1)
        game.move(2, 0)
        game.move(2, 1)
        game.move(0, 1)
        game.move(0, 2)
        game.move(1, 2)
        game.move(1, 0)
        game.move(2, 0)
        game.move(1, 2)
        game.move(0, 1)
        game.move(0, 2)
        game.move(1, 2)
        game.move(0, 1)
        game.move(2, 0)
        game.move(2, 1)
        game.move(0, 1)
        game.move(2, 0)
        game.move(1, 2)
        game.move(1, 0)
        game.move(2, 0)
        game.move(2, 1)
        game.move(0, 1)
        game.move(0, 2)
        game.move(1, 2)
        game.move(0, 1)
        game.move(2, 0)
        game.move(2, 1)
        game.move(0, 1)

        expect(game).to be_won
    end
        

    it "is won if all discs are in tower 2" do
        game.move(0, 2)
        game.move(0, 1)
        game.move(2, 1)
        game.move(0, 2)
        game.move(1, 0)
        game.move(1, 2)
        game.move(0, 2)
        game.move(0, 1)
        game.move(2, 1)
        game.move(2, 0)
        game.move(1, 0)
        game.move(2, 1)
        game.move(0, 2)
        game.move(0, 1)
        game.move(2, 1)
        game.move(0, 2)
        game.move(1, 0)
        game.move(1, 2)
        game.move(0, 2)
        game.move(1, 0)
        game.move(2, 1)
        game.move(2, 0)
        game.move(1, 0)
        game.move(1, 2)
        game.move(0, 2)
        game.move(0, 1)
        game.move(2, 1)
        game.move(0, 2)
        game.move(1, 0)
        game.move(1, 2)
        game.move(0, 2)

        expect(game).to be_won
    end
  end
end