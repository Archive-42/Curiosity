// ACTIONS
export const GET_EFFECTS = "GET_EFFECTS"
export const ADD_EFFECT = "ADD_EFFECT"
export const UPDATE_EFFECT = "UPDATE_EFFECT"
export const DELETE_EFFECT = "DELETE_EFFECT"


// ACTION CREATORS
export const getThreads = (effects) => ({ type: GET_EFFECTS, effects })
export const addThread = (effect) => ({ type: ADD_EFFECT, effect })
export const updateThread = (effect) => ({ type: UPDATE_EFFECT, effect })
export const deleteThread = (effect) => ({ type: DELETE_EFFECT, effect })