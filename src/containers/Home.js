import React, { useEffect, useState } from "react";
import { autoLogin } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import './home.css';
import image from '../images/background.webp'

const Home = () => {
    const dispatch = useDispatch();
      const user = useSelector((state) => state.user);

      useEffect(() => {
        dispatch(autoLogin());
      }, [JSON.stringify(user)]);


    
    return (
        <div className='homepage'>
        
        <div style={{ textAlign: 'center'}}>
          <h1>Ejovial Electronics</h1>
        </div>
        <div>
          {/* <img src={image} alt='' /> */}
        </div>
        </div>
    )
}

export default Home
