import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QTY,
  DECREASE_QTY,
  CLEAR_CART
} from '../actions/cart';

// action.product

export default function reducer(state = {}, action) {
  Object.freeze(state);
  const newState = { ...state };
  switch (action.type) {
    case ADD_TO_CART: {
      if (newState[ action.product.id ]) {
        newState[ action.product.id ] = {
          ...action.product,
          qty: (newState[ action.product.id ].qty + 1)
        };
      } else {
        newState[ action.product.id ] = {
          ...action.product,
          qty: 1
        };
      }
      return newState;
    }

    case REMOVE_FROM_CART: {
      delete newState[ action.product.id ];
      return newState;
    }

    case INCREASE_QTY: {
      newState[ action.product.id ].qty = (newState[ action.product.id ].qty + 1);
      return newState;
    }

    case DECREASE_QTY: {
      newState[ action.product.id ].qty = (newState[ action.product.id ].qty - 1);
      return newState;
    }

    case CLEAR_CART: {
      return {};
    }

    default: return state;
  }
}