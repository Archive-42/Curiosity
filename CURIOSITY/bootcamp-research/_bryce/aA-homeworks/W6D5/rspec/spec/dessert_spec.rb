require 'rspec'
require 'dessert'

=begin
Instructions: implement all of the pending specs (the `it` statements without blocks)! Be sure to look over the solutions when you're done.
=end

describe Dessert do
  let(:chef) { double("chef", :titleize => "Chef John") }
  subject(:dessert) {Dessert.new("brownie", 10, chef)}

  describe "#initialize" do
    it "sets a type" do
      expect(dessert.type).to eq("brownie")
    end

    it "sets a quantity" do
      expect(dessert.quantity).to eq(10)
    end

    it "starts ingredients as an empty array" do
      expect(dessert.ingredients).to be_empty
    end

    it "raises an argument error when given a non-integer quantity" do
      expect {Dessert.new("brownie", "10", chef)}.to raise_error(ArgumentError)
    end
  end

  describe "#add_ingredient" do
    it "adds an ingredient to the ingredients array" do
      expect(dessert.ingredients).to_not include("eggs")
      dessert.add_ingredient("eggs")
      expect(dessert.ingredients).to include("eggs")
    end
  end

  describe "#mix!" do
    it "shuffles the ingredient array" do
      ingredients = ["butter", "cocoa powder", "eggs", "flour", "sugar"]
      ingredients.each {|ingredient| dessert.add_ingredient(ingredient)}
      dessert.mix!

      expect(dessert.ingredients).to_not eq(ingredients)
      expect(dessert.ingredients.sort).to eq(ingredients)
    end
  end

  describe "#eat" do
    it "subtracts an amount from the quantity" do
      expect(dessert.eat(3)).to eq(7)
    end

    it "raises an error if the amount is greater than the quantity" do
      expect {dessert.eat(20)}.to raise_error("not enough left!")
    end
  end

  describe "#serve" do
    it "contains the titleized version of the chef's name" do
      expect(dessert.serve).to eq("Chef John has made 10 brownies!")
    end
  end

  describe "#make_more" do
    it "calls bake on the dessert's chef with the dessert passed in" do
      expect(chef).to receive(:bake).with(dessert)
      dessert.make_more
    end
  end
end
