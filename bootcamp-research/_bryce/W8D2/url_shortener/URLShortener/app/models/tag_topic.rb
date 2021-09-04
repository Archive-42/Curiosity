# == Schema Information
#
# Table name: tag_topics
#
#  id  :bigint(8)        not null, primary key
#  tag :string           not null
#

class TagTopic < ApplicationRecord
    validates :tag, presence: true, uniqueness: true

    has_many :taggings
    foreign_key: :tag_topic_id,
    primary_key: :id
    class_name: :Tagging
end
