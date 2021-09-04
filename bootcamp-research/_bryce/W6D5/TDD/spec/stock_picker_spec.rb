require 'stock_picker'

describe Array do
    subject(:arr) {[2, 1, 0, 6, 9, 6]}
    let(:bear) {[5, 4, 3, 3, 2, 0]}
    
    describe "#pick_stock" do
        
        context "when an uptick exists" do
            
            it "returns an array" do
                expect(arr.pick_stock).to be_an(Array)
            end

            it "returns a money-making sale" do
                sale = arr.pick_stock
                profit = sale[1] - sale[0]
                expect(profit).to be_positive
            end

            it "returns the largest profit dates" do
                expect(arr.pick_stock).to contain_exactly(2, 4)
            end
        end

        context "when stock only falls" do
            it "returns nil" do
                expect(bear.pick_stock).to be_nil
            end
        end
    end

end