require_relative 'questions_database'
require_relative 'user'
require_relative 'reply'
require_relative 'question'

class Reply

    def self.find_by_id(id)
        data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                replies
            WHERE
                id = ?
        SQL
        return nil unless data.first['id']

        Reply.new(data.first)
    end

    def self.find_by_parent_id(parent_id)
        data = QuestionsDatabase.instance.execute(<<-SQL, parent_id)
            SELECT
                *
            FROM
                replies
            WHERE
                parent_id = ?
        SQL

        data.map {|datum| Reply.new(datum)}
    end

    def self.find_by_user_id(user_id)
        data = QuestionsDatabase.instance.execute(<<-SQL, user_id)
            SELECT
                *
            FROM
                replies
            WHERE
                user_id = ?
        SQL

        data.map {|datum| Reply.new(datum)}
    end

    def self.find_by_question_id(question_id)
        data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
            SELECT
                *
            FROM
                replies
            WHERE
                question_id = ?
        SQL

        data.map {|datum| Reply.new(datum)}
    end

    attr_accessor :question_id, :parent_reply_id, :user_id, :body, :id

    def initialize(options)
        @id = options['id']
        @question_id = options['question_id']
        @parent_reply_id = options['parent_reply_id']
        @user_id = options['user_id']
        @body = options['body']
    end

    def author
        User.find_by_id(user_id)
    end

    def question
        Question.find_by_id(question_id)
    end

    def parent_reply
        Reply.find_by_id(parent_reply_id)
    end

    def child_replies
        Reply.find_by_parent_id(id)
    end

    def save
        if @id
            QuestionsDatabase.instance.execute(<<-SQL, question_id, parent_reply_id, user_id, body, id)
                UPDATE
                    questions
                SET
                    question_id = ?,
                    parent_reply_id = ?
                    user_id = ?
                    body = ?
                WHERE
                    id = ?
            SQL
        else
            QuestionsDatabase.instance.execute(<<-SQL, question_id, parent_reply_id, user_id, body)
                INSERT INTO
                    questions (question_id, parent_reply_id, user_id, body)
                VALUES
                    (?, ?, ?, ?)
            SQL
            @id = QuestionsDatabase.instance.last_insert_row_id
        end
        self
    end
end