import { connect } from 'react-redux'
import { login, checkForExistingEmail } from '../../actions/session_actions'
import LoginForm from './login_form'

const mapStateToProps = state => {
  return {
    errors: state.errors.session
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    checkForExistingEmail: email => dispatch(checkForExistingEmail(email))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
