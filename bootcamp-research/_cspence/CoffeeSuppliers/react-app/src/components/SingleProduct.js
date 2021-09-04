import React from 'react';

// TODO: Single product view w/ all details
// TODO: Ability to review previously ordered items
// TODO: Add to cart
// TODO: Favorite product
const SingleProduct = (props) => {
    const product = useSelector(state => state.products[props.productId]);
    const reviews = useSelector(state => state.reviews);
    const categories = useSelector(state => state.categories);

    return (
        <>
        </>
    );
}

export default SingleProduct;
