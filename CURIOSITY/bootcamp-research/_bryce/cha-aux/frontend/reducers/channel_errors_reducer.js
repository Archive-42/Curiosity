import { CLEAR_ERRORS } from '../actions/session_actions';
import { RECEIVE_CHANNEL_ERRORS, RECEIVE_CHANNELS, RECEIVE_CHANNEL } from '../actions/channel_actions';

const channelErrorsReducer = (state = [], action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_CHANNEL_ERRORS:
			return action.errors.responseJSON;
		case RECEIVE_CHANNEL:
			return [];
		case RECEIVE_CHANNELS:
			return [];
		case CLEAR_ERRORS:
			return [];
		default:
			return state;
	}
};

export default channelErrorsReducer;
