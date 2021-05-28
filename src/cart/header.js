import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import SignedInLinks from '../components/signInLInks';
import SignedOutLinks from '../components/signOutLinks';
import { useSelector, useDispatch } from "react-redux";
import { autoLogin } from "../actions/actions";

const Header = () => {
    const cart = useSelector((state) => state.cart.cartItems);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(autoLogin());
    }, [JSON.stringify(user)]);

    return (
        <header style={{ height:'7vh'}}>
          {user.loggedIn === false ? (<div>
          <SignedOutLinks />
          </div>) 
          : (<div>
            <p>you have {cart.length} items in your cart</p>
          <Link to='/cart'>Cart</Link>
          <SignedInLinks />
          </div>)}
        </header>
    )
}

export default Header
