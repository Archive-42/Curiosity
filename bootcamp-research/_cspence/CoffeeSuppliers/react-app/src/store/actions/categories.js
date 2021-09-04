export const SET_CATEGORIES = 'SET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const ADD_PRODUCT_TO_CATEGORY = 'ADD_PRODUCT_TO_CATEGORY';
export const REMOVE_PRODUCT_FROM_CATEGORY = 'REMOVE_PRODUCT_FROM_CATEGORY';

export const setCategories = categories => ({ type: SET_CATEGORIES, categories });
export const addCategory = category => ({ type: ADD_CATEGORY, category });
export const deleteCategory = categoryId => ({ type: DELETE_CATEGORY, categoryId });
export const editCategory = category => ({ type: EDIT_CATEGORY, category });
export const addProductToCategory = (productId, category) => ({ type: ADD_PRODUCT_TO_CATEGORY, productId, category });
export const removeProductFromCategory = (productId, categoryId) => ({ type: REMOVE_PRODUCT_FROM_CATEGORY, productId, categoryId });

export const setCategoriesThunk = () => async dispatch => {
    let categories = await fetch('/api/categories');
    if (categories.ok) {
        categories = await categories.json();
        await dispatch(setCategories(categories));
    }
};

export const addCategoryThunk = category => async dispatch => {
    let category = await fetch('/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    });
    if (category.ok) {
        category = await category.json();
        await dispatch(addCategory(category));
    }
};

export const deleteCategoryThunk = categoryId => async dispatch => {
    let deletedCategory = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE'
    });
    if (deletedCategory.ok) {
        deletedCategory = await deletedCategory.json();
        await dispatch(deleteCategory(deletedCategory.id));
    }
};

export const editCategoryThunk = category => async dispatch => {
    let editedCategory = await fetch(`/api/categories/${category.id}`, {
        method: 'PUT',
        headers: {
            'Category-Type': 'application/json'
        },
        body: JSON.stringify(category)
    });
    if (editedCategory.ok) {
        editedCategory = await editedCategory.json();
        await dispatch(editCategory(editedCategory));
    }
};

export const addProductToCategoryThunk = (productId, categoryId) => async dispatch => {
    let join = await fetch(`/api/categories/${categoryId}/products/${productId}`, {
        method: 'POST'
    });
    if (join.ok) {
        join = await join.json();
        await dispatch(addProductToCategory(productId, categoryId));
    }
};

export const removeProductFromCategoryThunk = (productId, categoryId) => async dispatch => {
    let deletedJoin = await fetch(`/api/categories/${categoryId}/products/${productId}`, {
        method: 'DELETE'
    });
    if (deletedJoin.ok) {
        deletedJoin = deletedJoin.json();
        await dispatch(removeProductFromCategory(productId, categoryId));
    }
};
