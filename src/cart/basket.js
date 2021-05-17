import React, { useState  } from 'react';
import { useSelector, useDispatch } from "react-redux";

const Basket = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    console.log(cart);
    return (
        <div>
           <div>
               { cart && cart.length === 0 && <div>Cart is empty</div>}
               
           </div> 
        </div>
    )
}

export default Basket
