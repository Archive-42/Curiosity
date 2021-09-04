import { baseUrl } from '../../config';
import { reloadCurrentUser } from './authentication';

export const ADD_FAVORITE_PRODUCT = 'ADD_FAVORITE_PRODUCT';
export const REMOVE_FAVORITE_PRODUCT = 'REMOVE_FAVORITE_PRODUCT';
export const ADD_FAVORITE_SHOP = 'ADD_FAVORITE_SHOP';
export const REMOVE_FAVORITE_SHOP = 'REMOVE_FAVORITE_SHOP';
export const SET_FAVORITES = 'SET_FAVORITES';

export const favoriteShop = favoriteShop => ({ type: ADD_FAVORITE_SHOP, shop: favoriteShop });
export const unfavoriteShop = shopId => ({ type: REMOVE_FAVORITE_SHOP, shopId });
export const favoriteProduct = favoriteProduct => ({ type: ADD_FAVORITE_PRODUCT, product: favoriteProduct });
export const unfavoriteProduct = productId => ({ type: REMOVE_FAVORITE_PRODUCT, productId });
export const setInitialFavorites = favorites => ({ type: SET_FAVORITES, favorites });

export const toggleFavoriteProduct = (userId, productId) => async dispatch => {
  const body = {
    userId,
    productId,
    favProduct: true,
    shopId: null
  };
  const response = await fetch(`${baseUrl}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (response.ok) {
    let favorite = await response.json() || null;
    if (favorite) {
      await dispatch(favoriteProduct(favorite));
    } else {
      await dispatch(unfavoriteProduct(productId));
    }
    await dispatch(reloadCurrentUser());
  }
};

export const toggleFavoriteShop = (userId, shopId) => async dispatch => {
  const body = {
    userId,
    shopId,
    favProduct: false,
    productId: null
  };
  const response = await fetch(`${baseUrl}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (response.ok) {
    let favorite = await response.json();
    if (favorite) {
      await dispatch(favoriteShop());
    } else {
      await dispatch(unfavoriteShop());
    }
    await dispatch(reloadCurrentUser());
  }
};
