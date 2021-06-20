import React, { useEffect, useState } from "react";
import { autoLogin } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import "./home.css";
import electronic from '../images/electronic.png';
import ladyImage from '../images/slazer.png';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(autoLogin());
  }, [JSON.stringify(user)]);

  return (
    <div className="homepage">
        <div style={{ textAlign: "center", marginTop: '10px', background: 'black' }}>
          <h1 style={{ color: 'white'}}>Ejovial Electronics</h1>
          <br/>
          <p className='homeText'>home of the finest electronic appliances buy now</p>
        </div>
      <div className='homeContent'>
        <div className="caption">
          <img src={ladyImage} alt='' />
        </div>
        <div className="forImage">
          <img src={electronic} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Home;
