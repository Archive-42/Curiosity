import {
    SET_CATEGORIES,
    ADD_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY,
    ADD_PRODUCT_TO_CATEGORY,
    REMOVE_PRODUCT_FROM_CATEGORY
} from '../actions/categories';

const initialState = {
    dict: {},
    ids: []
};

export default function reducer(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
        case SET_CATEGORIES:
            return action.categories;
        case ADD_CATEGORY:
            newState.ids.push(action.category.id);
            newState.dict[action.category.id] = action.category;
            return newState;
        case DELETE_CATEGORY:
            delete newState.dict[action.categoryId];
            newState.ids = newState.ids.filter(id => id !== action.categoryId);
            return newState;
        case EDIT_CATEGORY:
            newState.dict[action.category.id] = action.category;
            return newState;
        case ADD_PRODUCT_TO_CATEGORY:
            newState.dict[action.categoryId].productIds.push(action.productId);
            return newState;
        case REMOVE_PRODUCT_FROM_CATEGORY:
            newState.dict[action.categoryId].productIds = newState.dict[action.categoryId].productIds.filter(id => id !== action.productId);
            return newState;
        default:
            return state;
    }
}
