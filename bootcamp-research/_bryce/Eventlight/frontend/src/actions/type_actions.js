import { getTypes } from '../util/type_api_util'

export const RECEIVE_TYPES = 'RECEIVE_TYPES'

export const receiveTypes = types => ({
	type: RECEIVE_TYPES,
	types
})

export const fetchTypes = () => dispatch => {
	getTypes()
		.then(types => dispatch(receiveTypes(types)))
		.catch(err => console.log(err))
}
