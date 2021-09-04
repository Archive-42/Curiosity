import axios from 'axios';

export const getEvents = filters => {
	return axios.get('/api/events', { params: { ...filters } });
};

export const getLikedEvents = () => {
	return axios.get('/api/likes');
};

export const getRegistrations = () => {
	return axios.get('/api/registrations');
};

export const getEvent = id => {
	return axios.get(`/api/events/${id}`);
};

export const fetchEventsAutocomplete = filter => {
	return axios.get('/api/events/auto', { params: { ...filter } });
};

export const postEvent = event => {
	return axios.post('/api/events', event, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
};

export const patchEvent = event => {
	return axios.patch(`/api/events/${event.get('_id')}`, event);
};
