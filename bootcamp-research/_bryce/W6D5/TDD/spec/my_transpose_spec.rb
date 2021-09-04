require "my_transpose"

describe Array do
    subject(:arr) {[[0, 1, 2], [3, 4, 5], [6, 7, 8]]}

    describe "#my_transpose" do

        it "returns an array" do
            expect(arr.my_transpose).to be_an(Array)
        end

        it "returns a 2D array" do
            expect(arr.my_transpose[0]).to be_an(Array)
        end

        it "maintains the dimensions of the array" do
            expect(arr.my_transpose.map{|ele| ele.length}).to contain_exactly(3, 3, 3)
        end

        it "maintains all of the array elements" do
            expect(arr.my_transpose.flatten).to match_array(arr.flatten)
        end

        it "does not mutate the orginal array" do
            transposed = arr.my_transpose
            expect(arr).to contain_exactly([0, 1, 2], [3, 4, 5], [6, 7, 8])
            expect(arr).to_not eq(transposed)
        end

        it "correctly transposes the array" do
            expect(arr.my_transpose).to contain_exactly([0,3,6], [1,4,7], [2,5,8])
        end
    end
end