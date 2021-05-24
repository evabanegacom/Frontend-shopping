import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";


const Header = () => {
    const cart = useSelector((state) => state.cart.cartItems);

    return (
        <header>
            <div>
                <a href="#">
                    <h1>Small shopping cart</h1>
                </a>
            </div>
            <div>
            <p>you have {cart.length} items in your cart</p>
          <Link to='/cart'>Cart</Link>
            </div>
        </header>
    )
}

export default Header
