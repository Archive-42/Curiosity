import { merge } from 'lodash'
import { RECEIVE_TYPES } from '../actions/type_actions'

const TypesReducer = (state = {}, action) => {
	Object.freeze(state)
	let newState = merge({}, state)
	switch (action.type) {
		case RECEIVE_TYPES:
			action.types.data.forEach(type => (newState[type._id] = type))
			return newState
		default:
			return state
	}
}

export default TypesReducer
