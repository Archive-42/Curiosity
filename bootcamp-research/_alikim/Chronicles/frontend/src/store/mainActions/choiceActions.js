// ACTIONS
export const GET_CHOICES = "GET_CHOICES"
export const ADD_CHOICE = "ADD_CHOICE"
export const UPDATE_CHOICE = "UPDATE_CHOICE"
export const DELETE_CHOICE = "DELETE_CHOICE"


// ACTION CREATORS
export const getChoices = (choices) => ({ type: GET_CHOICES, choices })
export const addChoice = (choice) => ({ type: ADD_CHOICE, choice })
export const updateChoice = (choice) => ({ type: UPDATE_CHOICE, choice })
export const deleteChoice = (choice) => ({ type: DELETE_CHOICE, choice })