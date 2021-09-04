export const ADD_REVIEW = 'ADD_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';
export const EDIT_REVIEW = 'EDIT_REVIEW';
export const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';

export const addReview = review => ({ type: ADD_REVIEW, review });
export const removeReview = reviewId => ({ type: REMOVE_REVIEW, reviewId });
export const editReview = review => ({ type: EDIT_REVIEW, review });
export const getAllReviews = reviews => ({ type: GET_ALL_REVIEWS, reviews });

export const addReviewThunk = review => async dispatch => {
    let newReview = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    if (newReview.ok) {
        newReview = await newReview.json();
        await dispatch(addReview(newReview));
    }
};

export const removeReviewThunk = reviewId => async dispatch => {
    let review = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (review.ok) {
        review = await review.json();
        await dispatch(removeReview(review));
    }
};

export const editReviewThunk = review => async dispatch => {
    let editedReview = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    if (editedReview.ok) {
        editedReview = await editedReview.json();
        await dispatch(editReview(editedReview));
    }
};

export const getAllReviewsThunk = () => async dispatch => {
    let reviews = await fetch(`/api/reviews`);
    if (reviews.ok) {
        reviews = await reviews.json();
        await dispatch(getAllReviews(reviews));
    }
}
