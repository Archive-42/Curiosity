import React from 'react'
import { connect } from 'react-redux'
import '../../styles/sign_in_error_modal.css'
import { Link } from 'react-router-dom'
import { hideSignInErrorModal } from '../../actions/signin_error_modal_actions'

const mstp = state => ({
  show: state.ui.signin_error_modal.show,
  message: state.ui.signin_error_modal.message || ''
})

const mdtp = dispatch => ({
  close: () => dispatch(hideSignInErrorModal())
})

const SignInErrorModal = ({ show, message, close }) =>
  show ? (
    <div className="sign-in-error-modal">
      <div className="inner-wrapper">
        <h1>Sign-in Required</h1>
        <p>{message}</p>
        <div className="buttons">
          <Link to="/login"><div onClick={close}>Sign In</div></Link>
          <div onClick={close}>Cancel</div>
        </div>
      </div>
    </div>
  ) : null

export default connect(
  mstp,
  mdtp
)(SignInErrorModal)
