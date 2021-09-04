const ADD_PRODUCTS = 'products/addProducts';
const ADD_ONE_PRODUCT = 'products/addOneProduct';
const REMOVE_ONE_PRODUCT = 'products/removeOneProduct';

const addProducts = (payload) => {
  return {
    type: ADD_PRODUCTS,
    payload
  };
};

const addOneProduct = (payload) => {
  return {
    type: ADD_ONE_PRODUCT,
    payload
  };
};

const removeOneProduct = (id) => {
  return { type: REMOVE_ONE_PRODUCT, payload: id };
};

export const getAllProducts = () => async (dispatch) => {
  const response = await fetch('/products');
  if (response.ok) {
    const data = await response.json();
    dispatch(addProducts(data.products));
  }
};

export const addProduct = (product) => async (dispatch) => {
  const response = await fetch('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });

  if (response.ok) {
    const data = await response.json();
    console.log('add', data);
    dispatch(addOneProduct(data.product));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  const response = await fetch(`/products/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(removeOneProduct(id));
  }
};

const productReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case ADD_PRODUCTS:
      action.payload.forEach((product) => (newState[product.id] = product));
      return newState;
    case ADD_ONE_PRODUCT:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case REMOVE_ONE_PRODUCT:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default productReducer;
