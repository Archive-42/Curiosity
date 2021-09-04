// ACTIONS
export const GET_METERS = "GET_METERS"
export const ADD_METER = "ADD_METER"
export const UPDATE_METER = "UPDATE_METER"
export const DELETE_METER = "DELETE_METER"


// ACTION CREATORS
export const getMeters = (meters) => ({ type: GET_METERS, meters })
export const addMeter = (meter) => ({ type: ADD_METER, meter })
export const updateMeter = (meter) => ({ type: UPDATE_METER, meter })
export const deleteMeter = (meter) => ({ type: DELETE_METER, meter })