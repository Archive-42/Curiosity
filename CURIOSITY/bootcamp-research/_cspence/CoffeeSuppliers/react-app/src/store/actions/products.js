export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const setProducts = products => ({ type: SET_ALL_PRODUCTS, products });
export const editProduct = product => ({ type: EDIT_PRODUCT, product });
export const addProduct = product => ({ type: ADD_PRODUCT, product });
export const deleteProduct = productId => ({ type: DELETE_PRODUCT, productId });

export const setProductsThunk = () => async dispatch => {
    let products = await fetch('/api/products/all');
    if (products.ok) {
        products = await products.json();
        await dispatch(setProducts(products));
    }
};

export const editProductThunk = product => async dispatch => {
    let editedProduct = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (editedProduct.ok) {
        editedProduct = await editedProduct.json();
        await dispatch(editProduct(editedProduct));
    }
};

export const addProductThunk = product => async dispatch => {
    let newProduct = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (newProduct.ok) {
        newProduct = await newProduct.json();
        await dispatch(addProduct(newProduct));
    }
};

export const deleteProductThunk = productId => async dispatch => {
    let product = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    });
    if (product.ok) {
        product = await product.json();
        await dispatch(deleteProduct(product));
    }
};
