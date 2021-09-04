import { AUTHENTICATE_USER, LOGOUT_USER } from '../actions/auth';

export default function reducer(state = null, action) {

    switch (action.type) {
        case AUTHENTICATE_USER:
            return action.user;
        case LOGOUT_USER:
            return null;
        default:
            return state;
    }
}
