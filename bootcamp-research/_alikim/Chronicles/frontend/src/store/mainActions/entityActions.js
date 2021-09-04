//ACTIONS 
export const GET_ENTITIES = "GET_ENTITIES"
export const ADD_ENTITY = "ADD_ENTITY"
export const UPDATE_ENTITY = "UPDATE_ENTITY"
export const DELETE_ENTITY = "DELETE_ENTITY"


// ACTION CREATORS
export const getEntities = (entities) => ({ type: GET_ENTITIES, entities })
export const addEntity = (entity) => ({ type: ADD_ENTITY, entity })
export const updateEntity = (entity) => ({ type: UPDATE_ENTITY, entity })
export const deleteEntity = (entity) => ({ type: DELETE_ENTITY, entity })