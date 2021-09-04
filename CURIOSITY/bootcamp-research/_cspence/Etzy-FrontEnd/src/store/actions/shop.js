import { baseUrl } from '../../config';

export const LOAD_SHOP = 'LOAD_SHOP';

export const loadShop = shop => ({ type: LOAD_SHOP, shop });

export const getShop = id => async dispatch => {
  const response = await fetch(`${baseUrl}/shops/${id}`);
  if (response.ok) {
    const shop = await response.json();
    await dispatch(loadShop(shop));
  }
}