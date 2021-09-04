import gql from 'graphql-tag';

export default {
	NEW_QUESTION_SUBSCRIPTION: gql`
		subscription onQuestionSubmitted {
			questionSubmitted {
				_id
				user_id
				title
				body
				date
				author
			}
		}
	`,
	REMOVED_QUESTION_SUBSCRIPTION: gql`
		subscription onQuestionRemoved {
			questionRemoved {
				_id
				user_id
				title
				body
				date
				author
			}
		}
	`
};
