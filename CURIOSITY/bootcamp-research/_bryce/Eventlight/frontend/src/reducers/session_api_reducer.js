import {
	RECEIVE_CURRENT_USER,
	RECEIVE_USER_LOGOUT,
	RECEIVE_USER_SIGN_IN,
	BEGIN_SIGNUP
} from '../actions/session_actions'

import { UPDATE_LIKES, UPDATE_REGISTRATIONS } from '../actions/user_actions'

const initialState = {
	isAuthenticated: false,
	user: {}
}

export default function(state = initialState, action) {
	switch (action.type) {
		case RECEIVE_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !!action.currentUser,
				user: action.currentUser
			}
		case RECEIVE_USER_LOGOUT:
			return {
				isAuthenticated: false,
				user: undefined
			}
		case RECEIVE_USER_SIGN_IN:
			return {
				...state,
				isSignedIn: true
			}
		case BEGIN_SIGNUP:
			return {
				...state,
				signup_email: action.email
			}
		case UPDATE_LIKES:
			return {
				...state,
				user: {
					...state.user,
					liked_events: action.liked_events
				}
			}
		case UPDATE_REGISTRATIONS:
			return {
				...state,
				user: {
					...state.user,
					registrations: action.registrations
				}
			}
		default:
			return state
	}
}
