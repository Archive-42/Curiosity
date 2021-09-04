import { RECEIVE_ALL_POKEMON, RECEIVE_POKEMON } from '../actions/pokemon_actions'
import {merge} from 'lodash'

const pokemonReducer = (state = {}, action) => {
  Object.freeze(state)  
  switch (action.type) {
        case RECEIVE_ALL_POKEMON:
            return merge({}, state, action.pokemon)
        case RECEIVE_POKEMON:
            const pokeObj = {[action.pokemon.id]: action.pokemon }
            return Object.assign({}, state, pokeObj);
            
        default:
            return state;
    }
}

export default pokemonReducer;