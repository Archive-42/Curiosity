import {
  SHOW_SIGNIN_ERROR_MODAL,
  HIDE_SIGNIN_ERROR_MODAL
} from '../actions/signin_error_modal_actions'
import { merge } from 'lodash'

const SignInModalReducer = (
  state = {
    show: false,
    message: 'You have to register or sign in before you can like events.'
  },
  action
) => {
  Object.freeze(state)

  const newState = merge({}, state)

  switch (action.type) {
    case SHOW_SIGNIN_ERROR_MODAL:
      newState.show = true
      newState.message = action.message
      return newState

    case HIDE_SIGNIN_ERROR_MODAL:
      newState.show = false
      newState.message = ''
      return newState

    default:
      return state
  }
}

export default SignInModalReducer
