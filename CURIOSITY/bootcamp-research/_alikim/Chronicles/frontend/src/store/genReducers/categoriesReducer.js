import { GET_ALL_CONTENT } from '../genActions/traitActions'


export default function categoriesReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CONTENT:
      return action.content.categories
    default:
      return state
  }
}
