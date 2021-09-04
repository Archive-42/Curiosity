# == Schema Information
#
# Table name: posts
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  url        :string
#  content    :string
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord
    validates :title, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :comments, dependent: :destroy
    

    has_many :post_subs

    has_many :subs,
    through: :post_subs,
    source: :sub

    def parent_comments
        Comment.where('parent_comment_id IS NULL AND post_id = ?', self.id)
    end

end
