import { connect } from 'react-redux'
import { fetchRegistrations } from '../../actions/event_actions'
import React from 'react'
import EventIndex from '../events/event_index'

const msp = state => {
  return {
    events: Object.values(state.events.registrations).filter(
      event => Date.now() > new Date(event.start_date).getTime()
    )
  }
}

const mdp = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchRegistrations())
  }
}

class PastTickets extends React.Component {
  componentDidMount() {
    if (this.props.events.length === 0) this.props.fetchEvents()
  }

  render() {
    return (
      <div className="current-tickets">
        <h2>Past tickets</h2>
        {this.props.events.length === 0 ? (
          <div className="nothing-here">
            <div className="nothing-here-image" />
            <div className="nothing-here-text">No past tickets</div>
          </div>
        ) : (
          <EventIndex useDateComponent={true} {...this.props} />
        )}
      </div>
    )
  }
}

export default connect(
  msp,
  mdp
)(PastTickets)
