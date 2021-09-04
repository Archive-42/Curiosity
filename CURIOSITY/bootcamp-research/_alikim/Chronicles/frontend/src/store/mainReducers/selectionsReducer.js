import {
  SET_SELECTIONS,
  ADD_SELECTION,
  UPDATE_SELECTION,
  UPDATE_SELECTIONS,
  WIPE_SELECTIONS,
  WIPE_ALL_SELECTIONS
} from '../mainActions/selectionActions'

const initialState = {
  chronicle: "",
  tale: "",
  thread: "",
  choice: "",
  character: "",
  place: "",
  asset: "",
  status: "",
  meter: "",
  // effect: "",
  // lock: "",
}

export default function selectionsReducer(state = initialState, action) {
  const newState = { ...state }
  switch (action.type) {
    case SET_SELECTIONS:
      return action.selections
    case ADD_SELECTION:
      newState[action.selectionType] = action.selection
      return newState
    case UPDATE_SELECTION:
      newState[action.selectionType] = action.selection
      return newState
    case UPDATE_SELECTIONS:
      action.selections.forEach(update => newState[update.type] = update.selection)
      return newState
    case WIPE_SELECTIONS:
      action.selectionTypes.forEach(type => newState[type] = "")
      return newState
    case WIPE_ALL_SELECTIONS:
      return initialState
    default:
      return state
  }
}