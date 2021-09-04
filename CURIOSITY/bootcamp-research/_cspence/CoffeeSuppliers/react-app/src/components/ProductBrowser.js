import React from 'react';
import ProductCard from './ProductCard';

// TODO : List all products
const ProductBrowser = (props) => {
    const ui = useSelector(state => state.ui);
    const categories = useSelector(state => state.categories);
    const products = useSelector(state => state.products);
    let currentProducts = products.ids.map(id => products.dict[id]);

    useEffect(() => {
        if (ui.currentCategory) {
            currentProducts = products.ids
                .filter(id => categories.dict[ui.currentCategory].productIds.includes(id))
                .map(productId => products.dict[productId]);
        } else {
            currentProducts = products.dict;
        }
    }, [ui]);

    return (
        <>
            {Object.keys(currentProducts).map(productId => {
                <ProductCard product={products.dict[productId]} />
            })}
        </>
    );
}

export default ProductBrowser;
