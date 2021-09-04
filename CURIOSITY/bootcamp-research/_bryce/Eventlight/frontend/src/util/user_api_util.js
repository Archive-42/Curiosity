import axios from 'axios';

export const toggleLikeEvent = event_id => {
	return axios.post(`/api/likes/`, {
		event_id
	});
};

export const registerForEvent = event_id => {
	return axios.post(`/api/registrations/`, {
		event_id
	});
};

export const deleteEventRegistration = event_id => {
	return axios.delete(`/api/registrations/${event_id}`);
};

export const updateUser = user => {
	return axios.patch(`/api/users/${user.id}`, {
		user
	});
};
