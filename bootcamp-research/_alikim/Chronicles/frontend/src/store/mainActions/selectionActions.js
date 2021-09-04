
// ACTIONS
export const SET_SELECTIONS = "SET_SELECTIONS"
export const ADD_SELECTION = "ADD_SELECTION"
export const UPDATE_SELECTION = "UPDATE_SELECTION"
export const UPDATE_SELECTIONS = "UPDATE_SELECTIONS"
export const WIPE_SELECTIONS = "WIPE_SELECTIONS"
export const WIPE_ALL_SELECTIONS = "WIPE_ALL_SELECTIONS"


// ACTION CREATORS
export const setSelections = (selections) => ({ type: SET_SELECTIONS, selections })
export const addSelection = (selectionType, selection) => ({ type: ADD_SELECTION, selectionType, selection })
export const updateSelection = (selectionType, selection) => ({ type: UPDATE_SELECTION, selectionType, selection })
export const updateSelections = (selections) => ({ type: UPDATE_SELECTIONS, selections })
export const wipeSelections = (selectionTypes) => ({ type: WIPE_SELECTIONS, selectionTypes })
export const wipeAllSelections = () => ({type: WIPE_ALL_SELECTIONS})