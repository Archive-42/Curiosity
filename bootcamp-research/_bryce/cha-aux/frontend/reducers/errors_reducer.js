import sessionErrorsReducer from './session_errors_reducer';
import serverErrorsReducer from './server_errors_reducer';
import channelErrorsReducer from './channel_errors_reducer';
import { combineReducers } from 'redux';

const errorsReducer = combineReducers({
	session: sessionErrorsReducer,
	server: serverErrorsReducer,
	channel: channelErrorsReducer
});

export default errorsReducer;
