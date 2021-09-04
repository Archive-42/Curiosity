# == Schema Information
#
# Table name: memberships
#
#  id            :bigint           not null, primary key
#  joinable_type :string
#  joinable_id   :bigint
#  user_id       :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class MembershipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
