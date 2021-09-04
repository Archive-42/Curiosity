import { connect } from 'react-redux'
import { logout, getCurrentUser } from '../../actions/session_actions'
import { loggedIn, numLiked, numRegistrations } from '../../selectors'

import NavBar from './navbar'

const mapStateToProps = state => ({
  loggedIn: loggedIn(state),
  user: state.session.user,
  numLiked: numLiked(state),
  numRegistrations: numRegistrations(state)
})

const mdtp = dispatch => ({
  logout: () => dispatch(logout()),
  getCurrentUser: () => dispatch(getCurrentUser())
})

export default connect(
  mapStateToProps,
  mdtp
)(NavBar)
