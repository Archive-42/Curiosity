import { merge } from 'lodash'
import { RECEIVE_CATEGORIES } from '../actions/category_actions'

const CategoriesReducer = (state = [], action) => {
	Object.freeze(state)
	let newState = merge({}, state)
	switch (action.type) {
		case RECEIVE_CATEGORIES:
			action.categories.data.forEach(category => (newState[category._id] = category))
			return newState
		default:
			return state
	}
}

export default CategoriesReducer
