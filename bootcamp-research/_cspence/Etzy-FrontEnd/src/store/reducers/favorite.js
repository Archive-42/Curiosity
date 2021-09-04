import {
  ADD_FAVORITE_PRODUCT,
  ADD_FAVORITE_SHOP,
  REMOVE_FAVORITE_PRODUCT,
  REMOVE_FAVORITE_SHOP
} from '../actions/favorite';

export default function reducer(state = { products: [], shops: [] }, action) {
  const newState = { ...state };
  switch (action.type) {
    case ADD_FAVORITE_PRODUCT: {
      newState.products.push(action.product);
      return newState;
    }

    case ADD_FAVORITE_SHOP: {
      newState.shops.push(action.shop);
      return newState;
    }

    case REMOVE_FAVORITE_PRODUCT: {
      newState.products.filter(product => product.id !== action.productId);
      return newState;
    }

    case REMOVE_FAVORITE_SHOP: {
      newState.shops.filter(shop => action.shopId !== shop.id);
      return newState;
    }

    default:
      return state;
  }
}