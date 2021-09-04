import { connect } from "react-redux"
import MainPage from "./main_page";
import { fetchEvents } from "../../actions/event_actions";
import { updateFilter, clearFilters } from "../../actions/filter_actions";
import { fetchCitiesAuto, fetchEventsAuto, clearAutocomplete } from "../../actions/autocomplete_actions";
import { loggedIn } from '../../selectors';

const mstp = state => {
  return {
    autocompleteCities: Object.values(state.ui.autocomplete.cities),
    autocompleteEvents: Object.values(state.ui.autocomplete.events),
    events: Object.values(state.events.all),
    loggedIn: loggedIn(state)
  };
};

const mdtp = dispatch => {
  return {
		fetchEvents: () => dispatch(fetchEvents()),
    updateFilter: filter => dispatch(updateFilter(filter)),
    fetchCitiesAuto: cityFilter => dispatch(fetchCitiesAuto(cityFilter)),
    fetchEventsAuto: eventFilter => dispatch(fetchEventsAuto(eventFilter)),
    clearAutocomplete: () => dispatch(clearAutocomplete()),
    clearFilters: () => dispatch(clearFilters()),
  };
};

export default connect(mstp, mdtp)(MainPage);