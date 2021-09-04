# == Schema Information
#
# Table name: responses
#
#  id               :bigint(8)        not null, primary key
#  answer_choice_id :integer          not null
#  user_id          :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Response < ApplicationRecord

    validate :respondent_already_answered?
    validate :not_author_of_poll?

    belongs_to :answer_choice,
        primary_key: :id,
        foreign_key: :answer_choice_id,
        class_name: 'AnswerChoice'

    belongs_to :respondent,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: 'User'

    has_one :question,
        through: :answer_choice,
        source: :question

    def sibling_responses
        self.question.responses.where.not(id: self.id)
    end

    def respondent_already_answered?
        if self.sibling_responses.where("user_id = (?)", self.user_id).exists?
            errors[:respondent] << 'you\'ve already responded to this question'
        end
    end

    def not_author_of_poll?
        if self.question.poll.author_id == self.user_id
            errors[:author] << ', you can\'t respond to your own poll'
        end
    end
end
