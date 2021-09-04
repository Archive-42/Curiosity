import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, UPDATE_CART_ITEM } from '../actions/cart';

export default function reducer(state = {}, action) {
    let newState = { ...state };

    switch (action.type) {
        case ADD_TO_CART:
            newState[action.product.id] = action.product;
            return newState;
        case REMOVE_FROM_CART:
            delete newState[action.productId];
            return newState;
        case CLEAR_CART:
            return {};
        case UPDATE_CART_ITEM:
            newState[action.updatedItem.id] = action.updatedItem;
        default:
            return state;
    }
}
