import React from 'react';
import { useSelector } from 'react-redux';

// TODO : List all items in cart
// TODO : Add price total
// TODO : Add functionalities clear cart and order
// TODO : Disable order option for logged out users
// TODO : Admin orders should be marked fulfilled automatically
const Cart = (props) => {
    const cart = useSelector(state => state.cart);

    return (
        <>
        </>
    );
}

export default Cart;
