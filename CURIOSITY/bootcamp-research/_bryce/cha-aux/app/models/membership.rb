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

class Membership < ApplicationRecord
  validates :joinable_type, presence: true

  belongs_to :joinable,
    polymorphic: true
  
  belongs_to :user
end
