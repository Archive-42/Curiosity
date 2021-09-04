import { GET_ALL_CONTENT } from '../genActions/traitActions'


export default function tagsReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CONTENT:
      return action.content.tags
    default:
      return state
  }
}