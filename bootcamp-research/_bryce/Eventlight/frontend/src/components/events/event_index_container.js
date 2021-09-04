import { connect } from 'react-redux'
import { fetchEvents } from '../../actions/event_actions'
import EventIndex from './event_index'

const msp = state => {
	return {
		events: Object.values(state.events.all),
		searchFilters: state.ui.filter
	}
}

const mdp = dispatch => {
	return {
		fetchEvents: filters => dispatch(fetchEvents(filters)),
	}
}

export default connect(msp, mdp)(EventIndex)
