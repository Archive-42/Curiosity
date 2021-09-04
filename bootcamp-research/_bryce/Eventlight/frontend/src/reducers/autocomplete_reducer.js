import { combineReducers } from "redux";
import CityAutocompleteReducer from "./cities_autocomplete_reducer";
import EventAutocompleteReducer from "./events_autocomplete_reducer";

const AutocompleteReducer = combineReducers({
  cities: CityAutocompleteReducer,
  events: EventAutocompleteReducer
});

export default AutocompleteReducer;