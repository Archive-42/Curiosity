import {
  GET_USER_CREATIONS,
  LOGOUT_USER,
  CREATE_USER,
} from '../mainActions/userActions'

import {
  ADD_CHRONICLE,
  DELETE_CHRONICLE,
} from '../mainActions/chronicleActions'
import {
  ADD_TALE,
  DELETE_TALE,
} from '../mainActions/taleActions'
import {
  ADD_THREAD,
  DELETE_THREAD,
} from '../mainActions/threadActions'
import {
  ADD_CHOICE,
  DELETE_CHOICE,
} from '../mainActions/choiceActions'
import {
  ADD_CHARACTER,
  DELETE_CHARACTER,
} from '../mainActions/characterActions'
import {
  ADD_PLACE,
  DELETE_PLACE,
} from '../mainActions/placeActions'
import {
  ADD_ASSET,
  DELETE_ASSET,
} from '../mainActions/assetActions'
import {
  ADD_STATUS,
  DELETE_STATUS,
} from '../mainActions/statusActions'
import {
  ADD_METER,
  DELETE_METER,
} from '../mainActions/meterActions'
// import {
//   ADD_,
//   DELETE_,
// } from '../actions/Actions'



export default function userReducer(state = {}, action) {
  let newState = { ...state }
  let i;
  switch (action.type) {

    case CREATE_USER:
      return action.user
    
    case GET_USER_CREATIONS:
      return action.content.user

    // chronicles
    case ADD_CHRONICLE:
      newState.chronicle_ids.push(action.chronicle.id)
      return newState
    case DELETE_CHRONICLE:
      i = newState.chronicle_ids.indexOf(action.id)
      newState.chronicle_ids.splice(i, 1)
      return newState

    // tales
    case ADD_TALE:
      newState.tale_ids.push(action.tale.id)
      return newState
    case DELETE_TALE:
      i = newState.tale_ids.indexOf(action.id)
      newState.tale_ids.splice(i, 1)
      return newState

    // threads
    case ADD_THREAD:
      newState.thread_ids.push(action.thread.id)
      return newState
    case DELETE_THREAD:
      i = newState.thread_ids.indexOf(action.id)
      newState.thread_ids.splice(i, 1)
      return newState

    // choices
    case ADD_CHOICE:
      newState.choice_ids.push(action.choice.id)
      return newState
    case DELETE_CHOICE:
      i = newState.choice_ids.indexOf(action.id)
      newState.choice_ids.splice(i, 1)
      return newState

    // characters
    case ADD_CHARACTER:
      newState.entity_ids.push(action.character.id)
      return newState
    case DELETE_CHARACTER:
      i = newState.entity_ids.indexOf(action.id)
      newState.entity_ids.splice(i, 1)
      return newState

    // places
    case ADD_PLACE:
      newState.entity_ids.push(action.place.id)
      return newState
    case DELETE_PLACE:
      i = newState.entity_ids.indexOf(action.id)
      newState.entity_ids.splice(i, 1)
      return newState

    // assets
    case ADD_ASSET:
      newState.asset_ids.push(action.asset.id)
      return newState
    case DELETE_ASSET:
      i = newState.asset_ids.indexOf(action.id)
      newState.asset_ids.splice(i, 1)
      return newState

    case LOGOUT_USER:
      return {}

    // statuses
    case ADD_STATUS:
      newState.status_ids.push(action.status.id)
      return newState
    case DELETE_STATUS:
      i = newState.status_ids.indexOf(action.id)
      newState.status_ids.splice(i, 1)
      return newState

    // meters
    case ADD_METER:
      newState.meter_ids.push(action.meter.id)
      return newState
    case DELETE_METER:
      i = newState.meter_ids.indexOf(action.id)
      newState.meter_ids.splice(i, 1)
      return newState
      
    // // effects
    // case ADD_:
    //   newState._ids.push(action..id)
    //   return newState
    // case DELETE_:
    //   i = newState._ids.indexOf(action..id)
    //   newState._ids.splice(i, 1)
    //   return newState

    // // locks
    // case ADD_:
    //   newState._ids.push(action..id)
    //   return newState
    // case DELETE_:
    //   i = newState._ids.indexOf(action..id)
    //   newState._ids.splice(i, 1)
    //   return newState

    // // pcs
    // case ADD_:
    //   newState._ids.push(action..id)
    //   return newState
    // case DELETE_:
    //   i = newState._ids.indexOf(action..id)
    //   newState._ids.splice(i, 1)
    //   return newState



    default:
      return state
  }
}