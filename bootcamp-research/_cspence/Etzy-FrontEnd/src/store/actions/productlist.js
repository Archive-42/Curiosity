import { baseUrl } from '../../config';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export const load = list => ({ type: LOAD_PRODUCTS, list });

export const getProducts = () => async (dispatch) => {
  const response = await fetch(`${baseUrl}/products`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};