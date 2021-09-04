import {
	RECEIVE_EVENT_ERRORS,
	RECEIVE_EVENTS,
	RECEIVE_LIKED_EVENTS,
	RECEIVE_EVENT,
	CLEAR_ERRORS
} from '../actions/event_actions'

const _nullErrors = []

const EventErrorsReducer = (state = _nullErrors, action) => {
	Object.freeze(state)
	switch (action.type) {
		case RECEIVE_EVENT_ERRORS:
			return action.errors
		case RECEIVE_EVENTS:
			return _nullErrors
		case RECEIVE_LIKED_EVENTS:
			return _nullErrors
		case RECEIVE_EVENT:
			return _nullErrors
		case CLEAR_ERRORS:
			return _nullErrors
		default:
			return state
	}
}

export default EventErrorsReducer
