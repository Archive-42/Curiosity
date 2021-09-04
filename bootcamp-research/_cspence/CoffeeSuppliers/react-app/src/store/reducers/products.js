import {
    SET_ALL_PRODUCTS,
    EDIT_PRODUCT,
    ADD_PRODUCT,
    DELETE_PRODUCT
} from "../actions/products";
import {
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
        case SET_ALL_PRODUCTS:
            newState = action.products;
            return newState;
        case EDIT_PRODUCT:
            newState.dict[action.product.id] = action.product;
            return newState;
        case ADD_PRODUCT:
            newState.dict[action.product.id] = action.product;
            return newState;
        case DELETE_PRODUCT:
            delete newState.dict[action.productId];
            newState.ids.filter(id => id !== action.productId);
            return newState;
        case ADD_PRODUCT_TO_CATEGORY:
            newState.dict[action.productId].categories[action.category.id] = newState.category;
        case REMOVE_PRODUCT_FROM_CATEGORY:
            delete newState.dict[action.productId].categories[action.categoryId];
            return newState;
        default:
            return state;
    }
}
