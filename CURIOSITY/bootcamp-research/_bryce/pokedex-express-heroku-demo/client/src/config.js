export const imageUrl =
	process.env.REACT_APP_IMAGE_URL || process.env.NODE_ENV === 'production'
		? 'http://localhost:8000' // 'https://pokedex-redux-single-repo.herokuapp.com'
		: 'http://localhost:8000';

export const baseUrl = process.env.REACT_APP_BASEURL || `${imageUrl}/api`;
