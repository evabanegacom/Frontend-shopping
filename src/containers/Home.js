import React, { useEffect, useState } from "react";
import { autoLogin, getProducts } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import "./home.css";
import electronic from '../images/electronic.png';
import ladyImage from '../images/slazzer-edit.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products.products);


  useEffect(() => {
    dispatch(autoLogin());
  }, [JSON.stringify(user)]);

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="homepage">
        <div style={{ textAlign: "center", marginTop: '10px', background: 'blue' }}>
          <h1 style={{ color: 'white'}}>Ejovial Electronics</h1>
          <br/>
          <p className='homeText'>home of the finest electronic appliances <Button component={Link} to='/products' variant='contained' color="primary">buy now</Button></p>
        </div>
        <section className='carousel'>
        <Slider className='slider' {...settings}>
          {products && products.length && (
            products.map((product) => {
              return product.category === 'BestDeals' && (
               
                <div className='carouselItem'>
                <img src={product.avatar.url.replace(/http/g, "https")} alt='' />
                
                </div>
                
              )
            })
          )}
          </Slider>
          
        </section>
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
