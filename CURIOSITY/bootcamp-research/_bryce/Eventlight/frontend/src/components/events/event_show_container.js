import { connect } from 'react-redux';
import { fetchEvent } from '../../actions/event_actions';
import EventShow from './event_show';
import { isLiked, isRegistered } from '../../selectors';
import { toggleLikeEvent, registerForEvent, deleteEventRegistration } from '../../actions/user_actions';

const msp = (state, ownProps) => {
	const eventId = ownProps.match.params.eventId;
	return {
		eventId,
		event: state.events.all[eventId],
		isLiked: isLiked(state, eventId),
		isRegistered: isRegistered(state, eventId)
	};
};

const mdp = dispatch => {
	return {
		fetchEvent: id => dispatch(fetchEvent(id)),
		toggleLikeEvent: id => dispatch(toggleLikeEvent(id)),
		registerForEvent: id => dispatch(registerForEvent(id)),
		deleteEventRegistration: id => dispatch(deleteEventRegistration(id))
	};
};

export default connect(msp, mdp)(EventShow);
