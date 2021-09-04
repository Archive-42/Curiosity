import { CLEAR_ERRORS } from '../actions/session_actions';
import { RECEIVE_SERVER_ERRORS, RECEIVE_SERVERS, RECEIVE_SERVER } from '../actions/server_actions';

const serverErrorsReducer = (state = [], action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_SERVER_ERRORS:
			return action.errors.responseJSON;
		case RECEIVE_SERVER:
			return [];
		case RECEIVE_SERVERS:
			return [];
		case CLEAR_ERRORS:
			return [];
		default:
			return state;
	}
};

export default serverErrorsReducer;
