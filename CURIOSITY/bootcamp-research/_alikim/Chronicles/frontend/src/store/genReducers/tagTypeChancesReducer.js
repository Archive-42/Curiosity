import { GET_GENERATOR } from '../genActions/genActions'


export default function tagTypeChancesReducer(state = {}, action) {
  switch (action.type) {
    case GET_GENERATOR:
      return action.tagTypeChances
    default:
      return state
  }
}