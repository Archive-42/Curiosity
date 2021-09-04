import {
  HIDE_FORM,
  LOAD,
  LOAD_TYPES,
  SET_CURRENT,
  SHOW_FORM,
} from '../actions/pokemon';

const pokemonReducer = (state = { types: [] }, action) => {
  switch (action.type) {
    case HIDE_FORM: {
      return {
        ...state,
        formVisible: false,
      };
    }

    case LOAD: {
      return {
        ...state,
        list: action.list,
      };
    }

    case LOAD_TYPES: {
      return {
        ...state,
        types: action.types,
      };
    }

    case SET_CURRENT: {
      return {
        ...state,
        current: action.current,
      };
    }

    case SHOW_FORM: {
      return {
        ...state,
        formVisible: true,
      };
    }

    default: return state;
  }
}

export default pokemonReducer;
