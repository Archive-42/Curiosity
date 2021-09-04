# == Schema Information
#
# Table name: comments
#
#  id                :bigint(8)        not null, primary key
#  post_id           :integer          not null
#  parent_comment_id :integer
#  content           :string           not null
#  author_id         :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
