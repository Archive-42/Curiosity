import { connect } from "react-redux";
import SearchBar from "./search_bar";
import { fetchCitiesAuto, fetchEventsAuto, clearAutocomplete } from "../../actions/autocomplete_actions";
import { updateFilter, clearFilters } from "../../actions/filter_actions";

const mstp = state => {
  return {
    eventsAuto: Object.values(state.ui.autocomplete.events),
    citiesAuto: Object.values(state.ui.autocomplete.cities)
  };
}

const mdtp = dispatch => {
  return {
    fetchCitiesAuto: cityFilter => dispatch(fetchCitiesAuto(cityFilter)),
    fetchEventsAuto: eventFilter => dispatch(fetchEventsAuto(eventFilter)),
    clearAutocomplete: () => dispatch(clearAutocomplete()),
    updateFilter: filterParams => dispatch(updateFilter(filterParams)),
    clearFilters: () => dispatch(clearFilters())
  };
}

export default connect(mstp, mdtp)(SearchBar);