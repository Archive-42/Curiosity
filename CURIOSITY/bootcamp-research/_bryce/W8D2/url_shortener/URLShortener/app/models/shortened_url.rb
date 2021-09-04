# == Schema Information
#
# Table name: shortened_urls
#
#  id         :bigint(8)        not null, primary key
#  short_url  :string           not null
#  long_url   :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ShortenedUrl < ApplicationRecord
    validates :short_url, presence: true, uniqueness: true
    validates :long_url, presence: true
    
    belongs_to :submitter,
      foreign_key: :user_id,
      primary_key: :id,
      class_name: 'User'

      has_many :visits,
      foreign_key: :shortened_url_id,
      primary_key: :id,
      class_name: 'Visit'
  
      has_many :visitors,
      through: :visits,
      source: :visitors

      has_many :distinct_visitors,
      -> {distinct},
      through: :visits,
      source: :visitors

    def self.random_code
        #returns a 22 char long string
       code = SecureRandom.urlsafe_base64(16)
       while ShortenedUrl.exists?(:short_url => code)
            code = SecureRandom.urlsafe_base64(16)    
       end
       code
    end

    def self.create!(user,long_url)
        surl = ShortenedUrl.new
        surl.user_id = user.id
        surl.long_url = long_url
        surl.short_url = ShortenedUrl.random_code
        surl.save!
        surl
    end

    def num_clicks
        Visit.where( {'shortened_url_id' => self.id} ).count
        #visits.count
    end
    
    def num_uniques
        # Visit.select(:user_id).distinct.where( {'shortened_url_id' => self.id} ).count
        distinct_visitors.count
        #visitors.distinct.count
    end

    def num_recent_uniques(time_period)
        Visit.select(:user_id).distinct.where({'shortened_url_id' => self.id, 'created_at' => (Time.now - time_period.minutes)..Time.now }).count
        #visitors.distinct.where('created_at' => (Time.now - time_period.minutes)..Time.now }).count
    end

end
