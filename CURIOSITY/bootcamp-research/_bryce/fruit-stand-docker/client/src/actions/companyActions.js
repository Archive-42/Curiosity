import { baseUrl } from '../config';

export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';
export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES';

const receiveCompany = (payload) => {
	return {
		type: RECEIVE_COMPANY,
		payload
	};
};

const receiveCompanies = (companies) => {
	return {
		type: RECEIVE_COMPANIES,
		companies
	};
};

export const fetchCompany = (id) => async (dispatch, getState) => {
	// Example of adding in an auth header for a route that requires it
	// We can take in getState as a second argument to our function, then get the access_token we stored in our session reducer
	// The `Authorization` header lines up with what our server is expecting the header to be named
	const { session: { access_token } } = getState();
	const response = await fetch(`${baseUrl}/companies/${id}`, { headers: { Authorization: access_token } });

	if (response.ok) {
		const payload = await response.json();
		dispatch(receiveCompany(payload));
	}
};

export const fetchCompanies = () => async (dispatch, getState) => {
	const { session: { access_token } } = getState();
	const response = await fetch(`${baseUrl}/companies`, { headers: { Authorization: access_token } });

	if (response.ok) {
		const { companies } = await response.json();
		dispatch(receiveCompanies(companies));
	}
};
