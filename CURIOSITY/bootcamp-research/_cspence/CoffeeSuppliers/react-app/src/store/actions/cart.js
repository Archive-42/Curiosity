export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const IMPORT_CART = 'IMPORT_CART';
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const PLACE_ORDER = 'PLACE_ORDER';

export const addToCart = item => ({ type: ADD_TO_CART, item });
export const removeFromCart = itemId => ({ type: REMOVE_FROM_CART, itemId });
export const clearCart = () => ({ type: CLEAR_CART });
export const updateCartItem = updatedItem => ({ type: UPDATE_CART_ITEM, updatedItem });
export const importCart = cartItems => ({ type: IMPORT_CART, cartItems });
export const setCurrentOrder = purchaseId => ({ type: SET_CURRENT_ORDER, purchaseId });

export const importCartThunk = userId => async dispatch => {
    let cartItems = await fetch(`/api/purchases/users/${userId}/not-ordered`);
    if (cartItems.ok) {
        cartItems = await cartItems.json();
        await dispatch(importCart(cartItems.orderItems));
        await dispatch(setCurrentOrder(cartItems.purchaseId));
    }
};

export const updateCartItemThunk = (itemId, qty) => async dispatch => {
    let updatedItem = await fetch(`/api/order-items/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ qty })
    });
    if (updatedItem.ok) {
        updatedItem = updatedItem.json();
        await dispatch(updateCartItem(updatedItem));
    }
};

export const clearCartThunk = purchaseId => async dispatch => {
    let cleared = await fetch(`/api/order-items/clear-current/${purchaseId}`, {
        method: 'DELETE'
    });
    if (cleared.ok) {
        await dispatch(clearCart());
    }
}

export const removeFromCartThunk = itemId => async dispatch => {
    let removed = await fetch(`/api/order-items/${itemId}`, {
        method: 'DELETE'
    });
    if (removed.ok) {
        removed = await removed.json();
        await dispatch(removeFromCart(removed.id));
    }
}

export const addToCartThunk = (userId, productId, qty, purchaseId) => async dispatch => {
    let added = await fetch(`/api/order-items/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, productId, qty, purchaseId })
    });
    if (added.ok) {
        added = await added.json();
        await dispatch(addToCart(added));
    }
}

export const placeOrderThunk = purchaseId => async dispatch => {
    let ordered = await fetch(`/api/purchases/${purchaseId}`, {
        method: 'PUT'
    });
    if (ordered.ok) {
        ordered = await ordered.json();
        await dispatch(clearCart());
    }
}
