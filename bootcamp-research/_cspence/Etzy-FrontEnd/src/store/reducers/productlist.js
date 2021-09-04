import { LOAD_PRODUCTS } from '../actions/productlist';

export default function reducer(state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return {
        ...state,
        productList: action.list
      }
    }

    default:
      return state;
  }
}