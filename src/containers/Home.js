import React, { useEffect, useState } from "react";
import { autoLogin, getProducts } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import "./home.css";
import electronic from '../images/electronic.png';
import ladyImage from '../images/slazzer-edit.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button, TextField, Typography, Paper, Box } from '@material-ui/core';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products.products);
  
  // const homeTheatres = products.length && products.filter((product) => product.category === 'BestDeals')
  // //const homeAppliances = products.length && products.filter((product) => product.category === 'BestDeals')
  // const TelevisionSets = products.length && products.filter((product) => product.category === 'BestDeals')
  // const fridge = products.length && products.filter((product) => product.category === 'BestDeals')
  // const generators = products.length && products.filter((product) => product.category === 'BestDeals')
  // const coolers = products.length && products.filter((product) => product.category === 'BestDeals')

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
               
                <div key={product.id} className='carouselItem'>
                <img src={product.avatar.url.replace(/http/g, "https")} alt='' />
                
                </div>
                
              )
            })
          )}
          </Slider>
          
        </section>
      <div className='homeContent'>
        <div className="caption">
          <img src={ladyImage} alt='lady' />
        </div>
        <div className="forImage">
          <img src={electronic} alt='pc' />
        </div>
      </div>
      <div className='labels'><marquee>Browse our categories</marquee></div>
      <div className='categoryItems'>
      <div className='homeTheatre'>
      {products && products.length ? (
        products.filter((product) => product.category === 'Home Theatres').slice(0, Number(1)).map((product) =>
               (
               <Paper component={Link} style={{ textDecoration: 'none'}} to='/home-theatre' elevation={10} className='homeTheatreItem'>
                <div key={product.id}>
                <p>{product.category}</p>
                <img src={product.avatar.url.replace(/http/g, "https")} alt='' />
                <p className='categoryText'><Button component={Link} to='/home-theatre' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
              )
            )
          ) : (<p>wait for it</p>)}
      </div>

      <div className='homeTheatre'>
      {products && products.length ? (
            products.filter((product) => product.category === 'Home Appliances').slice(0, Number(1)).map((product) =>
               (
               <Paper component={Link} style={{ textDecoration: 'none'}} elevation={10} to='/home-appliance' className='homeTheatreItem'>
                <div key={product.id}>
                <p>{product.category}</p>
                <img src={product.avatar.url.replace(/http/g, "https")} alt='' />
                <p className='categoryText'><Button component={Link} to='/home-appliance' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
              )
            )
          ) : (<p>wait for it</p>)}
      </div>

      <div className='homeTheatre'>
      {products && products.length ? (
        products.filter((product) => product.category === 'Television-sets').slice(0, Number(1)).map((product) =>
               (
               <Paper component={Link} to='/television-sets' style={{ textDecoration: 'none'}} elevation={10} className='homeTheatreItem'>
                <div key={product.id}>
                <p>{product.category}</p>
                <img src={product.avatar.url.replace(/http/g, "https")} alt='' />
                <p className='categoryText'><Button component={Link} to='/television-sets' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
              )
            )
          ) : (<p>wait for it</p>)}
      </div>

      <div className='homeTheatre'>
      {products && products.length ? (
        products.filter((product) => product.category === 'Refrigerators/Freezers').slice(0, Number(1)).map((product) =>
               (
               <Paper component={Link} to='/refrigerators' style={{ textDecoration: 'none'}} elevation={10} className='homeTheatreItem'>
                <div key={product.id}>
                <p>{product.category}</p>
                <img src={product.avatar.url.replace(/http/g, "https")} alt='' />
                <p className='categoryText'><Button component={Link} to='/refrigerators' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
              )
            )
          ) : (<p>wait for it</p>)}
      </div>

      <div className='homeTheatre'>
      {products && products.length ? (
        products.filter((product) => product.category === 'Power Solutions/Generators').slice(0, Number(1)).map((product) =>

               (
               <Paper component={Link} to='/generators' style={{ textDecoration: 'none'}} elevation={10} className='homeTheatreItem'>
                <div key={product.id}>
                <p>{product.category}</p>
                <img src={product.avatar.url.replace(/http/g, "https")} alt='' />
                <p className='categoryText'><Button component={Link} to='/generators' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
              )
            )
          ) : (<p>wait for it</p>)}
      </div>

      <div className='homeTheatre'>
      {products && products.length ? (
        products.filter((product) => product.category === 'Airconditioners/Coolers').slice(0, Number(1)).map((product) =>

               (
               <Paper component={Link} to='/coolers' style={{ textDecoration: 'none'}} elevation={10} className='homeTheatreItem'>
                <div key={product.id}>
                <p>{product.category}</p>
                <img src={product.avatar.url.replace(/http/g, "https")} alt='' />
                <p className='categoryText'><Button component={Link} to='/coolers' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
              )
            )
          ) : (<p>wait for it</p>)}
      </div>
      </div>
    </div>
  );
};

export default Home;
