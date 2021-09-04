import { Button, Typography } from '@material-ui/core';
import React from 'react';

const ProductInfo = (props) => {
    const products = useSelector(state => state.products);
    const ui = useSelector(state => state.ui);
    const cart = useSelector(state => state.cart);

    const addToCart = () => {
        
    }

    return (
        <div>
            <h2>{products.dict[ui.currentProduct].name}</h2>
            <Typography>
                {products.dict[ui.currentProduct].description}
            </Typography>
            <div>
                <Typography>${products.dict[ui.currentProduct].price}</Typography>
                <Button onClick={addToCart}>Add to Cart</Button>
            </div>
        </div>
    );
}

export default ProductInfo;
