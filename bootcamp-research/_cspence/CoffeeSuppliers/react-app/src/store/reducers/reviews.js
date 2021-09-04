import {
    ADD_REVIEW,
    REMOVE_REVIEW,
    EDIT_REVIEW,
    GET_ALL_REVIEWS
} from '../actions/reviews';

const initialState = {
    dict: {},
    ids: []
};

// TODO: Complete reviews reducer
export default function reducer(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
        case ADD_REVIEW:
            newState.ids.push(action.review.id);
            newState.dict[action.review.id] = action.review;
            return newState;
        case REMOVE_REVIEW:
            newState.ids = newState.ids.filter(id => id !== action.reviewId);
            delete newState.dict[action.reviewId];
            return newState;
        case EDIT_REVIEW:
            newState.dict[action.review.id] = action.review;
            return newState;
        case GET_ALL_REVIEWS:
            newState = action.reviews;
            return newState;
        default:
            return state;
    }
}
