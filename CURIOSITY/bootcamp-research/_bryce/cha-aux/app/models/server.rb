# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :integer          not null
#  private    :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Server < ApplicationRecord
  validates :name, presence: true

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :memberships,
    as: :joinable

  has_many :members,
    through: :memberships,
    source: :user

  has_many :channels,
    dependent: :destroy

  has_one_attached :icon_image
end
