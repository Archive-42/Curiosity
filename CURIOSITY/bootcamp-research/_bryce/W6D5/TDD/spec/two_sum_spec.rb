require "two_sum"

describe Array do
    subject(:arr) {[-1, 0, 2, -2, 1]}

    describe "#two_sum" do

        it "returns an array" do
            expect(arr.two_sum).to be_an(Array)
        end

        it "returns a 2D array" do
            expect(arr.two_sum[0]).to be_an(Array)
        end

        it "should return indices in pairs" do
            expect(arr.two_sum.all? { |pair| pair.length == 2 }).to be_truthy
        end

        it "returns unique indices" do
            expect(arr.two_sum.all? { |pair| pair == pair.uniq }).to be_truthy
        end

        it "should return indices smaller to larger" do
            expect(arr.two_sum.all? { |pair| pair.first < pair.last }).to be_truthy
        end

        it "has pairs that sum to 0" do 
            idxs = arr.two_sum[0]
            idx_1, idx_2 = idxs[0], idxs[1]
            expect(arr[idx_1] + arr[idx_2]).to eq(0)
        end

        it "includes all pairs" do
            expect(arr.two_sum).to contain_exactly([0,4], [2, 3])
        end
    end

end