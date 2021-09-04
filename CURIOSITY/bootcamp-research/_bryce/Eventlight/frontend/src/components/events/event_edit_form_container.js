import React from 'react'
import { connect } from 'react-redux'
import { updateEvent, fetchEvent } from '../../actions/event_actions'
import EventForm from './event_form'
import { fetchTypes } from '../../actions/type_actions'
import { fetchCategories } from '../../actions/category_actions'

class EditEventForm extends React.Component {
	componentDidMount() {
		if (!this.props.event) {
			this.props.fetchEvent(this.props.eventId)
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.eventId !== this.props.eventId) {
			this.props.fetchEvent(this.props.eventId)
		}
	}

	render() {
		const {
			submit,
			fetchTypes,
			fetchCategories,
			event,
			currentUserId,
			availableTypes,
			availableCategories
		} = this.props
		if (event && ![event.creator, event.creator._id].includes(currentUserId)) {
			this.props.history.push(`/events/${event._id}`)
		}
		return event ? (
			<EventForm
				event={event}
				submit={submit}
				fetchTypes={fetchTypes}
				fetchCategories={fetchCategories}
				availableTypes={availableTypes}
				availableCategories={availableCategories}
			/>
		) : (
			<div>Fetching Event</div>
		)
	}
}

const msp = (state, ownProps) => {
	const eventId = ownProps.match.params.eventId
	return {
		availableTypes: state.types,
		availableCategories: state.categories,
		currentUserId: state.session.user.id,
		event: state.events.all[eventId],
		eventId
	}
}

const mdp = dispatch => {
	return {
		submit: data => dispatch(updateEvent(data)),
		fetchEvent: id => dispatch(fetchEvent(id)),
		fetchTypes: () => dispatch(fetchTypes()),
		fetchCategories: () => dispatch(fetchCategories())
	}
}

export default connect(msp, mdp)(EditEventForm)
