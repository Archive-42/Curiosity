import {loadNPCs} from '../reducers/npcsReducer'
import {npc} from '../../data/data'

export const dispatchLoadNPCs = () => {
    return dispatch => {
        return dispatch(loadNPCs(npc));
    }
}
