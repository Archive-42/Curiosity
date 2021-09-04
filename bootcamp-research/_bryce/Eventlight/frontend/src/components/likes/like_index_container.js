import { connect } from 'react-redux'
import { fetchLikedEvents } from '../../actions/event_actions'
import LikesPage from './likes_page'

const msp = state => {
  return {
    events: Object.values(state.events.liked_events)
  }
}

const mdp = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchLikedEvents())
  }
}

export default connect(
  msp,
  mdp
)(LikesPage)
