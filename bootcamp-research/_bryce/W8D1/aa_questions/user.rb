require_relative 'questions_database'
require_relative 'user'
require_relative 'reply'
require_relative 'question_follow'
require_relative 'question_like'
require_relative 'question'

class User

    def self.find_by_id(id)
        data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                users
            WHERE
                id = ?
        SQL
        return nil unless data.first['id']

        User.new(data.first)
    end

    def self.find_by_name(fname, lname)
        data = QuestionsDatabase.instance.execute(<<-SQL, fname, lname)
            SELECT
                *
            FROM
                users
            WHERE
                fname = ? AND lname = ?
        SQL
        return nil unless data.first['id']

        User.new(data.first)
    end

    attr_accessor :fname, :lname, :id

    def initialize(options)
        @id = options['id']
        @fname = options['fname']
        @lname = options ['lname']
    end

    def authored_questions
        Question.find_by_author_id(id)
    end

    def authored_replies
        Reply.find_by_author_id(id)
    end

    def followed_questions
        QuestionFollow.followed_questions_for_user_id(id)
    end

    def liked_questions
        QuestionLike.liked_questions_for_user_id(id)
    end

    def average_karma
        QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT
                CAST(COUNT(question_likes.id) AS FLOAT) /
                  COUNT(DISTINCT questions.id) AS average_karma
            FROM
                questions
            LEFT OUTER JOIN
                question_likes
            ON
                questions.id = question_likes.question_id
            WHERE
                questions.user_id = ?
        SQL
    end

    def save
        if @id
            QuestionsDatabase.instance.execute(<<-SQL, fname, lname, id)
                UPDATE
                    users
                SET
                    fname = ?,
                    lname = ?
                WHERE
                    id = ?
            SQL
        else
            QuestionsDatabase.instance.execute(<<-SQL, fname, lname)
                INSERT INTO
                    users (fname, lname)
                VALUES
                    (?, ?)
            SQL
            @id = QuestionsDatabase.instance.last_insert_row_id
        end
        self
    end
end