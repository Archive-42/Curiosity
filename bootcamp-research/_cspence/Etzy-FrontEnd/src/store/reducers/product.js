import { LOAD_PRODUCT, EDIT_PRODUCT, NEW_PRODUCT } from '../actions/product';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case NEW_PRODUCT:
    case EDIT_PRODUCT:
    case LOAD_PRODUCT: {
      return {
        ...action.product
      };
    }

    default:
      return {};
  }
}
