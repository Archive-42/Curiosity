import gql from 'graphql-tag';

export default {
	LOGIN_USER: gql`
		mutation LoginUser($email: String!, $password: String!) {
			login(email: $email, password: $password) {
				token
				loggedIn
				_id
			}
		}
	`,
	SIGNUP_USER: gql`
		mutation SignupUser($email: String!, $name: String!, $password: String!) {
			signup(email: $email, name: $name, password: $password) {
				token
				loggedIn
				_id
			}
		}
	`,
	VERIFY_USER: gql`
		mutation VerifyUser($token: String!) {
			verifyUser(token: $token) {
				loggedIn
				_id
			}
		}
	`,
	NEW_QUESTION: gql`
		mutation NewQuestion($user_id: ID!, $body: String!, $title: String!) {
			newQuestion(user_id: $user_id, body: $body, title: $title) {
				_id
				body
				user_id
				date
				title
			}
		}
	`,
	DELETE_QUESTION: gql`
		mutation DeleteQuestion($id: ID!) {
			deleteQuestion(_id: $id) {
				_id
			}
		}
	`,
	UPDATE_QUESTION: gql`
		mutation UpdateQuestion($id: ID!, $body: String!, $title: String!) {
			updateMessage(id: $id, body: $body, title: $title) {
				_id
				body
				title
			}
		}
	`
};
