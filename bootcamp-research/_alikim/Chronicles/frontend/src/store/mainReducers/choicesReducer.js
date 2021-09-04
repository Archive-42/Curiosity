import {
  GET_CHOICES,
  ADD_CHOICE,
  UPDATE_CHOICE,
  DELETE_CHOICE,
} from '../mainActions/choiceActions'
import {
  ADD_THREAD,
  UPDATE_THREAD,
  DELETE_THREAD,
} from '../mainActions/threadActions'
import { DELETE_TALE } from '../mainActions/taleActions'
import { DELETE_CHRONICLE } from '../mainActions/chronicleActions'
import { GET_USER_CREATIONS } from '../mainActions/userActions'


export default function choicesReducer(state = {}, action) {
  let newState = { ...state }
  switch (action.type) {
    
    case GET_USER_CREATIONS:
      Object.values(action.content.choices).forEach(choice => newState[choice.id] = choice)
      return newState
      
    case GET_CHOICES:
      return action.choices
    case ADD_CHOICE:
      newState[action.choice.id] = action.choice
      return newState
    case UPDATE_CHOICE:
      newState[action.choice.id] = action.choice
      return newState
    case DELETE_CHOICE:
      delete newState[action.choice.id]
      return newState

    case ADD_THREAD:
      Object.values(action.choices).forEach(choice => newState[choice.id] = choice)
      return newState
    case UPDATE_THREAD:
      newState = Object.values(state).filter(choice => choice.prev_thread_id !== action.thread.id)
      Object.values(action.choices).forEach(choice => newState[choice.id] = choice)
      return newState
    case DELETE_THREAD:
      return Object.values(state).filter(choice => choice.prev_thread_id !== action.id)

    case DELETE_TALE:
      return Object.values(state).filter(choice => !action.tale.thread_ids.includes(choice.prev_thread_id))

    case DELETE_CHRONICLE:
      return Object.values(state).filter(choice => !action.chronicle.tale_ids.includes(choice.tale_id))

    default:
      return state
  }
}