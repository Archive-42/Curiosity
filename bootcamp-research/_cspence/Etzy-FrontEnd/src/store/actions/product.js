import { baseUrl } from '../../config';

export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const NEW_PRODUCT = 'NEW_PRODUCT';

export const loadOne = product => ({ type: LOAD_PRODUCT, product });
export const editOne = product => ({ type: EDIT_PRODUCT, product });
export const createOne = product => ({ type: NEW_PRODUCT, product });

export const getProduct = (id) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/products/${id}`);
  if (response.ok) {
    const product = await response.json();
    dispatch(loadOne(product));
    return product;
  }
};

export const editProduct = (id, productInfo) => async dispatch => {
  const response = await fetch(`${baseUrl}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productInfo)
  });
  if (response.ok) {
    const updatedProduct = await response.json();
    dispatch(editOne(updatedProduct));
    return null;
  } else {
    const { error: { errors } } = await response.json();
    return errors;
  }
};

export const newProduct = (productInfo) => async dispatch => {
  const response = await fetch(`${baseUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productInfo)
  });
  if (response.ok) {
    const newProduct = await response.json();
    dispatch(createOne(newProduct));
    return null;
  } else {
    const { error: { errors } } = await response.json();
    return errors;
  }
};