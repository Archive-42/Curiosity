import axios from 'axios'

export const getTypes = () => {
	return axios.get('/api/types/')
}
