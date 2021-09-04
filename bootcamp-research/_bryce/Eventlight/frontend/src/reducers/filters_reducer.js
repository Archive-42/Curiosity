import { UPDATE_FILTER, CLEAR_FILTERS } from "../actions/filter_actions";

const FiltersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case UPDATE_FILTER:
      return Object.assign({}, state, action.filter);

    case CLEAR_FILTERS:
      return {};

    default:
      return state;
  }
};

export default FiltersReducer;