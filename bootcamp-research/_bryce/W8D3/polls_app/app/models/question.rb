# == Schema Information
#
# Table name: questions
#
#  id         :bigint(8)        not null, primary key
#  poll_id    :integer          not null
#  text       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ApplicationRecord

  validates :text, presence: true

  has_many :answer_choices,
    primary_key: :id,
    foreign_key: :question_id,
    class_name: 'AnswerChoice'

  belongs_to :poll,
    primary_key: :id,
    foreign_key: :poll_id,
    class_name: 'Poll'

    has_many :responses,
        through: :answer_choices,
        source: :responses

    def results
        answers = self.answer_choices.includes(:responses)
        poll_results = {}
        answers.each do |answer|
            poll_results[answer.text] = answer.responses.count
        end
        poll_results
    end

    
end
