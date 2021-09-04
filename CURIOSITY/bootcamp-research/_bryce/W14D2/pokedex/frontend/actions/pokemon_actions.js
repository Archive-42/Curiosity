import * as APIUtil from '../util/api_util';

export const RECEIVE_ALL_POKEMON = "RECEIVE_ALL_POKEMON";
export const RECEIVE_POKEMON = "RECEIVE_POKEMON";
export const RECEIVE_POKEMON_ERRORS = "RECEIVE_POKEMON_ERRORS";

export const receiveAllPokemon = pokemon => ({
    type: RECEIVE_ALL_POKEMON,
    pokemon
})

export const receivePokemon = data => {
    return {
        type: RECEIVE_POKEMON,
        pokemon: data.pokemon,
        items: data.items
    }
}

export const receivePokemonErrors = errors => {
    return {
        type: RECEIVE_POKEMON_ERRORS,
        errors
    }
}

export const requestAllPokemon = () => (dispatch) => (
    APIUtil.fetchAllPokemon()
      .then(pokemon => dispatch(receiveAllPokemon(pokemon)))
  )

export const requestPokemonById = (id) => {
    return dispatch => {
        return(
            APIUtil.fetchPokemonById(id)
            .then(pokemon => dispatch(receivePokemon(pokemon)))
        )
    }
}

export const createPokemon = pokemon => dispatch => (
    APIUtil.createPokemon(pokemon)
        .then(pokemon => {
            dispatch(receivePokemon(pokemon));
            return pokemon;
        },
            errors => {
               dispatch(receivePokemonErrors(errors.responseJSON)); 
            }
        )
)