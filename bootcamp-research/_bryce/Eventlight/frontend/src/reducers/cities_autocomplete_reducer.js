import { RECEIVE_CITIES_AUTO, CLEAR_AUTOCOMPLETE, CLEAR_CITIES } from "../actions/autocomplete_actions";

const defaultState = {
  0: { _id: 0, city: "San Francisco", state: "CA"},
  1: { _id: 1, city: "New York", state: "NY"},
  2: { _id: 2, city: "Los Angeles", state: "CA"},
  3: { _id: 3, city: "Houston", state: "TX"},
  4: { _id: 4, city: "Atlanta", state: "GA"},
  5: { _id: 5, city: "Chicago", state: "IL"},
  6: { _id: 6, city: "Boston", state: "MA"},
  7: { _id: 7, city: "Philadelphia", state: "PA"},
  8: { _id: 8, city: "Miami", state: "FL"},
  9: { _id: 9, city: "Denver", state: "CO"}
};


const CitiesAutocompleteReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CITIES_AUTO:
      const newState = {};
      action.cities.data.forEach( city => newState[city._id] = city );
      return newState;

    case CLEAR_CITIES:
      return defaultState;

    case CLEAR_AUTOCOMPLETE:
      return defaultState;

    default:
      return state;
  }
};

export default CitiesAutocompleteReducer;