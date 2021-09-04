import {
  GET_CHARACTERS,
  ADD_CHARACTER,
  UPDATE_CHARACTER,
  DELETE_CHARACTER
} from '../mainActions/characterActions'
import { DELETE_CHRONICLE } from '../mainActions/chronicleActions'
import { GET_USER_CREATIONS } from '../mainActions/userActions'


export default function charactersReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    
    case GET_USER_CREATIONS:
      Object.values(action.content.characters).forEach(character => newState[character.id] = character)
      return newState
        
    case GET_CHARACTERS:
      return action.characters
    case ADD_CHARACTER:
      newState[action.character.id] = action.character
      return newState
    case UPDATE_CHARACTER:
      newState[action.character.id] = action.character
      return newState
    case DELETE_CHARACTER:
      delete newState[action.character.id]
      return newState

    default:
      return state
  }
}