export const GET_PLACES = "GET_PLACES"
export const ADD_PLACE = "ADD_PLACE"
export const UPDATE_PLACE = "UPDATE_PLACE"
export const DELETE_PLACE = "DELETE_PLACE"


// ACTION CREATORS
export const getPlaces = (places) => ({ type: GET_PLACES, places })
export const addPlace = (place) => ({ type: ADD_PLACE, place })
export const updatePlace = (place) => ({ type: UPDATE_PLACE, place })
export const deletePlace = (place) => ({ type: DELETE_PLACE, place })