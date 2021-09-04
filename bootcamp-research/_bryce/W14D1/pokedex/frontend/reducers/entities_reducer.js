import pokemonReducer from './pokemon_reducer';
import itemsReducer from './items_reducer';
import {combineReducers} from 'redux';


const entitiesReducer = combineReducers({
    pokemon: pokemonReducer,
    items: itemsReducer
})

export default entitiesReducer;