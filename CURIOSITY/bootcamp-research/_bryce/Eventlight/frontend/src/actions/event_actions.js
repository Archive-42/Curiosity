import { getEvents, getEvent, getLikedEvents, getRegistrations, postEvent, patchEvent } from '../util/event_api_util';

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const RECEIVE_LIKED_EVENTS = 'RECEIVE_LIKED_EVENTS';
export const RECEIVE_CURRENT_USERS_EVENTS = 'RECEIVE_CURRENT_USERS_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const RECEIVE_EVENT_ERRORS = 'RECEIVE_EVENT_ERRORS';
export const RECEIVE_REGISTRATIONS = 'RECEIVE_REGISTRATIONS';
export const RECEIVE_UPDATED_EVENT = 'RECEIVE_UPDATED_EVENT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveEvents = events => ({
	type: RECEIVE_EVENTS,
	events
});

export const receiveLikedEvents = events => ({
	type: RECEIVE_LIKED_EVENTS,
	events
});

export const receiveRegistrations = events => ({
	type: RECEIVE_REGISTRATIONS,
	events
});

export const receiveCurrentUsersEvents = events => ({
	type: RECEIVE_CURRENT_USERS_EVENTS,
	events
});

export const receiveEvent = event => ({
	type: RECEIVE_EVENT,
	event
});

export const receiveUpdatedEvent = event => ({
	type: RECEIVE_UPDATED_EVENT,
	event
});

export const receiveEventErrors = errors => ({
	type: RECEIVE_EVENT_ERRORS,
	errors
});

export const clearErrors = () => ({
	type: CLEAR_ERRORS
});

export const fetchEvents = filters => dispatch =>
	getEvents(filters)
		.then(events => dispatch(receiveEvents(events)))
		.catch(errors => dispatch(receiveEventErrors(errors.response.data)));

export const fetchEvent = id => dispatch =>
	getEvent(id)
		.then(event => dispatch(receiveEvent(event)))
		.catch(errors => dispatch(receiveEventErrors(errors.response.data)));

export const fetchLikedEvents = () => dispatch =>
	getLikedEvents()
		.then(events => dispatch(receiveLikedEvents(events)))
		.catch(errors => dispatch(receiveEventErrors(errors.response.data)));

export const fetchCurrentUsersEvents = currentUserId => {
	return dispatch => {
		return getEvents({ currentUserId })
			.then(events => dispatch(receiveCurrentUsersEvents(events)))
			.catch(errors => dispatch(receiveEventErrors(errors)));
	};
};

export const fetchRegistrations = () => dispatch =>
	getRegistrations()
		.then(events => dispatch(receiveRegistrations(events)))
		.catch(errors => dispatch(receiveEventErrors(errors.response.data)));

export const createEvent = event => dispatch => {
	return postEvent(event)
		.then(event => {
			dispatch(receiveEvent(event));
		})
		.catch(errors => {
			dispatch(receiveEventErrors(errors.response.data));
		});
};

export const updateEvent = event => dispatch => {
	return patchEvent(event)
		.then(event => {
			dispatch(receiveUpdatedEvent(event));
		})
		.catch(errors => {
			dispatch(receiveEventErrors(errors.response.data));
		});
};
