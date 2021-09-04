import gql from 'graphql-tag';

export default {
	IS_LOGGED_IN: gql`
		query IsUserLoggedIn {
			isLoggedIn @client
		}
	`,
	CURRENT_USER: gql`
		query currentUser {
			currentUserId @client
		}
	`,
	FETCH_QUESTIONS: gql`
		query fetchQuestions {
			questions {
				_id
				user_id
				author
				title
				body
				date
			}
		}
	`,
	FETCH_USER_QUESTIONS: gql`
		query fetchUserQuestions($id: ID!) {
			fetchUserQuestions(_id: $id) {
				_id
				users {
					_id
				}
			}
		}
	`,
	FETCH_USERS: gql`
		query fetchUsers {
			users {
				_id
				email
				name
			}
		}
	`
};
