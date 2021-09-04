import { fetchEventsAutocomplete } from '../util/event_api_util'
import * as CityApiUtil from "../util/city_api_util";

export const RECEIVE_EVENTS_AUTO = 'RECEIVE_EVENTS_AUTO'
export const RECEIVE_CITIES_AUTO = "RECEIVE_CITIES_AUTO";
export const CLEAR_CITIES = "CLEAR_CITIES"
export const CLEAR_AUTOCOMPLETE = "CLEAR_AUTOCOMPLETE"

export const receiveEventsAuto = events => {
	return {
		type: RECEIVE_EVENTS_AUTO,
		events
	};
};

export const fetchEventsAuto = filter => {
	return dispatch => {
		return fetchEventsAutocomplete(filter)
			.then( events => dispatch(receiveEventsAuto(events)) );
	};
};

export const receiveCitiesAuto = cities => {
  return {
    type: RECEIVE_CITIES_AUTO,
    cities
  };
};

export const clearCities = () => {
  return {
    type: CLEAR_CITIES
  };
};

export const fetchCitiesAuto = filter => {
  return dispatch => {
    if (!filter.city) return dispatch(clearCities());
    return CityApiUtil.fetchCitiesAuto(filter)
      .then( cities => dispatch(receiveCitiesAuto(cities)) );
  };
};


export const clearAutocomplete = () => {
  return {
    type: CLEAR_AUTOCOMPLETE
  }
}

