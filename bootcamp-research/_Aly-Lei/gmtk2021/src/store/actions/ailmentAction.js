import {loadAilments} from '../reducers/ailmentsReducer'
import {ailments} from '../../data/data'

export const dispatchLoadAilments = () => {
    return dispatch => {
        return dispatch(loadAilments(ailments));
    }
}
