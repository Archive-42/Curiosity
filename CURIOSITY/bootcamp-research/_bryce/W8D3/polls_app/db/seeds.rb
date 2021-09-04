# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Poll.destroy_all
Question.destroy_all
AnswerChoice.destroy_all
Response.destroy_all


bob = User.create(username: 'bob')
tom = User.create(username: 'tom')
jerry = User.create(username: 'jerry')
obama = User.create(username: 'obama')

poll_1 = Poll.create(author_id: bob.id, title: 'favorite things')
poll_2 = Poll.create(author_id: bob.id, title: 'customer satisfaction')
poll_3 = Poll.create(author_id: tom.id, title: 'political stuff')
poll_4 = Poll.create(author_id: obama.id, title: 'vacation preferences')

question_1 = Question.create(poll_id: poll_1.id, text: 'what''s your favorite color?')
question_2 = Question.create(poll_id: poll_1.id, text: 'what''s your favorite ice cream?')
question_3 = Question.create(poll_id: poll_1.id, text: 'what''s your favorite pet?')
question_4 = Question.create(poll_id: poll_2.id, text: 'rate your experience')
question_5 = Question.create(poll_id: poll_2.id, text: 'would you shop here again?')
question_6 = Question.create(poll_id: poll_2.id, text: 'would you recommend to a friend?')
question_7 = Question.create(poll_id: poll_3.id, text: 'do you approve of your congressman''s performance?')
question_8 = Question.create(poll_id: poll_3.id, text: 'who would you vote for?')
question_9 = Question.create(poll_id: poll_3.id, text: 'what about her emails?')
question_10 = Question.create(poll_id: poll_4.id, text: 'sand or snow?')
question_11 = Question.create(poll_id: poll_4.id, text: 'what is your ideal vacation destination?')
question_12 = Question.create(poll_id: poll_4.id, text: 'how much are you spending on your vacation?')

ac_1 = AnswerChoice.create(question_id: question_1.id, text: 'blue')
ac_2 = AnswerChoice.create(question_id: question_1.id, text: 'green')
ac_3 = AnswerChoice.create(question_id: question_1.id, text: 'pink')
ac_4 = AnswerChoice.create(question_id: question_3.id, text: 'dog')
ac_5 = AnswerChoice.create(question_id: question_3.id, text: 'cat')
ac_6 = AnswerChoice.create(question_id: question_3.id, text: 'guinea pig')
ac_7 = AnswerChoice.create(question_id: question_4.id, text: 'great')
ac_8 = AnswerChoice.create(question_id: question_4.id, text: 'terrible')
ac_9 = AnswerChoice.create(question_id: question_7.id, text: 'yes')
ac_10 = AnswerChoice.create(question_id: question_7.id, text: 'no')
ac_11 = AnswerChoice.create(question_id: question_10.id, text: 'sand')
ac_12 = AnswerChoice.create(question_id: question_10.id, text: 'snow')




response_4 = Response.create!(user_id: bob.id, answer_choice_id: ac_10.id)
response_5 = Response.create!(user_id: bob.id, answer_choice_id: ac_11.id)
response_6 = Response.create!(user_id: tom.id, answer_choice_id: ac_1.id)
response_7 = Response.create!(user_id: tom.id, answer_choice_id: ac_4.id)
response_8 = Response.create!(user_id: tom.id, answer_choice_id: ac_8.id)

response_10 = Response.create!(user_id: tom.id, answer_choice_id: ac_11.id)
response_11 = Response.create!(user_id: obama.id, answer_choice_id: ac_2.id)
response_12 = Response.create!(user_id: obama.id, answer_choice_id: ac_4.id)
response_13 = Response.create!(user_id: obama.id, answer_choice_id: ac_7.id)
response_14 = Response.create!(user_id: obama.id, answer_choice_id: ac_9.id)
