import {
  GET_ENTITIES,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY
} from '../mainActions/entityActions'
import { GET_USER_CREATIONS } from '../mainActions/userActions'


export default function entitiesReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    
    case GET_USER_CREATIONS:
      Object.values(action.content.entities).forEach(entity => newState[entity.id] = entity)
      return newState
        
    case GET_ENTITIES:
      return action.entities
    case ADD_ENTITY:
      newState[action.entity.id] = action.entity
      return newState
    case UPDATE_ENTITY:
      newState[action.entity.id] = action.entity
      return newState
    case DELETE_ENTITY:
      delete newState[action.entity.id]
      return newState

    default:
      return state
  }
}