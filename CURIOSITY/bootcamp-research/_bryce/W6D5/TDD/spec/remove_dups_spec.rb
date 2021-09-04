require "remove_dups"

describe Array do
    subject(:arr) {[1, 2, 1, 3, 3]}
    describe "#my_uniq" do
        
        it "returns an array" do
            expect(arr.my_uniq).to be_a(Array)
        end

        it "should not call Array#uniq" do
            expect(arr).to_not receive(:uniq)
            arr.my_uniq
        end

        it "should return unique values" do
            expect(arr.my_uniq).to match_array([2,3,1])
        end

        it "should return values in original order" do
            expect(arr.my_uniq).to contain_exactly(1,2,3)
        end

    end

end