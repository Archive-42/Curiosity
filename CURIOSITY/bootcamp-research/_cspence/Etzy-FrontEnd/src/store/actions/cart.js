export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QTY = 'INCREASE_QTY';
export const DECREASE_QTY = 'DECREASE_QTY';
export const CLEAR_CART = 'CLEAR_CART';

export const addItem = product => ({
  type: ADD_TO_CART,
  product
});

export const removeItem = product => ({
  type: REMOVE_FROM_CART,
  product
});

export const increaseItem = product => ({
  type: INCREASE_QTY,
  product
});

export const decreaseItem = product => ({
  type: DECREASE_QTY,
  product
});

export const removeAll = () => ({
  type: CLEAR_CART
});

export const addToCart = product => dispatch => {
  dispatch(addItem(product));
};

export const removeFromCart = product => dispatch => {
  dispatch(removeItem(product));
};

export const increaseQty = product => dispatch => {
  dispatch(increaseItem(product));
};

export const decreaseQty = product => dispatch => {
  dispatch(decreaseItem(product));
};

export const clearCart = () => dispatch => {
  dispatch(removeAll());
};