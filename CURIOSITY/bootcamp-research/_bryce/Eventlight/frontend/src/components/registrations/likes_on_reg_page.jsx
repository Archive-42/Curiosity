import { connect } from 'react-redux'
import { fetchLikedEvents } from '../../actions/event_actions'
import React from 'react'
import EventIndex from '../events/event_index'
import { Link } from 'react-router-dom'

const msp = state => {
  return {
    events: Object.values(state.events.liked_events).filter(
      event => Date.now() <= new Date(event.start_date).getTime()
    )
  }
}

const mdp = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchLikedEvents())
  }
}

class LikedEvents extends React.Component {
  componentDidMount() {
    if (this.props.events.length === 0) this.props.fetchEvents()
  }

  render() {
    return (
      <div className="likes-on-reg-page">
        <Link to="/likes">
          <h2>
            Likes
            <i className="fas fa-chevron-right" />
          </h2>
        </Link>
        <EventIndex useSquareComponent={true} {...this.props} />
      </div>
    )
  }
}

export default connect(
  msp,
  mdp
)(LikedEvents)
