# == Schema Information
#
# Table name: visits
#
#  id               :bigint(8)        not null, primary key
#  user_id          :integer          not null
#  shortened_url_id :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Visit < ApplicationRecord
  belongs_to :visitors,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: 'User'
    
  belongs_to :visited_urls,
    foreign_key: :shortened_url_id,
    primary_key: :id,
    class_name: 'ShortenedUrl'

  def self.record_visit!(user, shortened_url)
    visit = Visit.new
    visit.user_id = user.id
    visit.shortened_url_id = shortened_url.id

    visit.save!
    visit
  end

end
