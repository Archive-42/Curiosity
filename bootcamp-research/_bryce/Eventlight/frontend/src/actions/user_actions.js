import * as ApiUtils from '../util/user_api_util';
import { showSignInErrorModal } from './signin_error_modal_actions';
import { receiveCurrentUser } from './session_actions';

export const UPDATE_LIKES = 'UPDATE_LIKES';
export const UPDATE_REGISTRATIONS = 'UPDATE_REGISTRATIONS';

export const toggleLikeEvent = event_id => (dispatch, getState) => {
	if (!getState().session.isAuthenticated) {
		dispatch(showSignInErrorModal("You'll have to sign in or register before you can like events"));
		return;
	}
	return ApiUtils.toggleLikeEvent(event_id).then(({ data: { liked_events } }) => {
		dispatch({
			type: UPDATE_LIKES,
			liked_events: liked_events
		});
	});
};

export const registerForEvent = event_id => (dispatch, getState) => {
	if (!getState().session.isAuthenticated) {
		dispatch(showSignInErrorModal("You'll have to sign in or register before you can register for events"));
		return;
	}
	return ApiUtils.registerForEvent(event_id).then(({ data: { registrations } }) => {
		dispatch({
			type: UPDATE_REGISTRATIONS,
			registrations
		});
	});
};

export const deleteEventRegistration = event_id => (dispatch, getState) => {
	if (!getState().session.isAuthenticated) {
		dispatch(showSignInErrorModal("You'll have to sign in or register before you can register for events"));
		return;
	}
	return ApiUtils.deleteEventRegistration(event_id).then(({ data: { registrations } }) => {
		dispatch({
			type: UPDATE_REGISTRATIONS,
			registrations
		});
	});
};

export const updateUser = user => dispatch => {
	return ApiUtils.updateUser(user).then(({ data: usr }) => {
		dispatch(receiveCurrentUser(usr));
	});
};
