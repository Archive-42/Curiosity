// ACTIONS
export const GET_ASSETS = "GET_ASSETS"
export const ADD_ASSET = "ADD_ASSET"
export const UPDATE_ASSET = "UPDATE_ASSET"
export const DELETE_ASSET = "DELETE_ASSET"


// ACTION CREATORS
export const getAssets = (assets) => ({ type: GET_ASSETS, assets })
export const addAsset = (asset) => ({ type: ADD_ASSET, asset })
export const updateAsset = (asset) => ({ type: UPDATE_ASSET, asset })
export const deleteAsset = (asset) => ({ type: DELETE_ASSET, asset })