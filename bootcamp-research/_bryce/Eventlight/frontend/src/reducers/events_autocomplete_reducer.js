import { RECEIVE_EVENTS_AUTO, CLEAR_AUTOCOMPLETE } from "../actions/autocomplete_actions"

const EventsAutocompleteReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_EVENTS_AUTO:
      const newState = {};
      action.events.data.forEach( event => newState[event._id] = event );
      return newState;

    case CLEAR_AUTOCOMPLETE:
      return {};

    default:
      return state;
  }
};

export default EventsAutocompleteReducer;