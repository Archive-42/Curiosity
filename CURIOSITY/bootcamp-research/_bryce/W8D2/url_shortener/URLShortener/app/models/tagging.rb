# == Schema Information
#
# Table name: taggings
#
#  id               :bigint(8)        not null, primary key
#  tag_topic_id     :integer          not null
#  shortened_url_id :integer          not null
#

class Tagging < ApplicationRecord
    belongs_to :tag_topic,
    foreign_key: :tag_topic_id,
    primary_key: :id,
    class_name: :TagTopic
    
    belongs_to :tag_url,
    foreign_key: :shortened_url_id,
    primary_key: :id,
    class_name: :ShortenedUrl
end
