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
        <div style={{ textAlign: "center", marginTop: '10px' }}>
          <h1>Ejovial Electronics</h1>
          <br/>
          <p>home of the finest electronics appliances buy now</p>
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
