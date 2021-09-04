import { LOAD_SHOP } from '../actions/shop';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_SHOP: {
      return {
        ...state,
        currentShop: action.shop
      }
    }

    default:
      return state;
  }
}