//ACTIONS 
export const GET_CHARACTERS = "GET_CHARACTERS"
export const ADD_CHARACTER = "ADD_CHARACTER"
export const UPDATE_CHARACTER = "UPDATE_CHARACTER"
export const DELETE_CHARACTER = "DELETE_CHARACTER"


// ACTION CREATORS
export const getCharacters = (characters) => ({ type: GET_CHARACTERS, characters })
export const addCharacter = (character) => ({ type: ADD_CHARACTER, character })
export const updateCharacter = (character) => ({ type: UPDATE_CHARACTER, character })
export const deleteCharacter = (character) => ({ type: DELETE_CHARACTER, character })