# == Schema Information
#
# Table name: tracks
#
#  id         :bigint(8)        not null, primary key
#  album_id   :integer          not null
#  title      :string           not null
#  ord        :integer          not null
#  lyrics     :text
#  bonus      :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Track < ApplicationRecord
  validates :title, :ord, :bonus, presence: true
  validates :ord, uniqueness: { scope: :album_id, message: "should occur once in album" }

  belongs_to :album
  has_one :band,
    through: :album,
    source: :band_id
end
