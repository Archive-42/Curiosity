export const SHOW_SIGNIN_ERROR_MODAL = 'SHOW_SIGNIN_ERROR_MODAL'
export const HIDE_SIGNIN_ERROR_MODAL = 'HIDE_SIGNIN_ERROR_MODAL'

export const showSignInErrorModal = message => {
  return {
    type: SHOW_SIGNIN_ERROR_MODAL,
    message
  }
}

export const hideSignInErrorModal = () => {
  return {
    type: HIDE_SIGNIN_ERROR_MODAL
  }
}
