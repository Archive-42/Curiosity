import { RECEIVE_ALL_POKEMON, RECEIVE_POKEMON } from '../actions/pokemon_actions'

const uiReducer = (state = {}, action) => {
  Object.freeze(state)  
  switch (action.type) {
        default:
            return state;
    }
}

export default uiReducer;