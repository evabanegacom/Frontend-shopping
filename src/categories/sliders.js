import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProducts, addToCart } from '../actions/actions';
import { Box, Grid } from '@material-ui/core';
import Product from '../cart/product';
import { makeStyles } from "@material-ui/core/styles";
import ReactPaginate from "react-paginate";
import Filter from './filterCategories';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './sliderCategory.css';
import 'react-notifications/lib/notifications.css';
import {
   NotificationContainer,
   NotificationManager,
 } from 'react-notifications';

const Sliders = () => {
  const dispatch = useDispatch()

  
  const useStyles = makeStyles({
    secondMedia: {
      display: "none",
    },
  })

  const classes = useStyles();

    const forClasses = (product) =>{
    if(product.category === 'BestDeals'){
      return classes.secondMedia
    }

    // else if(product.category === 'Electronics'){
    //   return classes.secondMedia
    // }

    else {
      return null
    }
  }

  useEffect(() => {
      dispatch(getProducts())
    }, [])

    const products = useSelector((state) => state.products.products);

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 4,
      slidesToScroll: 1
    };

    var smallSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    var mediumSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 1
    };

    var smallerSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 2,
      slidesToScroll: 1
    };
    
    const [ data, setData] = useState([]);

    useEffect (function effectFunction() {
      fetch('https://neptune-spear.herokuapp.com/api/v1/products', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => response.json())
      .then((data => {
        setData(data)
      }))
    }, []);
    
  
    return (
        <>
        
        
         <section className='bigSlider'>
        <Slider className='sliderMain' {...settings}>
          {products && products.length && (
            products.map((product) => (
              <Grid container justify="center" spacing={2}>
                
                <Grid item key={Product.id} xs={12} sm={12} md={12} lg={12}><Product product={product} key={product.id} /></Grid>
                
          </Grid>
          ))
          )}
          </Slider>
        </section>

        <section className='mediumSlider'>
        <Slider className='small' {...mediumSettings}>
          {products && products.length && (
            products.map((product) => (
              <Grid container justify="center" spacing={2}>
                
                <Grid item key={Product.id} xs={12} sm={12} md={12} lg={12}><Product product={product} key={product.id} /></Grid>
                
          </Grid>
          ))
          )}
          </Slider>
        </section>

        <section className='smallerSlider'>
        <Slider className='small' {...smallerSettings}>
          {products && products.length && (
            products.map((product) => (
              <Grid container justify="center" spacing={2}>
                
                <Grid item key={Product.id} xs={12} sm={12} md={12} lg={12}><Product product={product} key={product.id} /></Grid>
                
          </Grid>
          ))
          )}
          </Slider>
        </section>

        <section className='smallSlider'>
        <Slider className='small' {...smallSettings}>
          {products && products.length && (
            products.map((product) => (
              <Grid container justify="center">
                
                <Grid item key={Product.id} xs={12} sm={9} md={12} lg={12}><Product product={product} key={product.id} /></Grid>
                
          </Grid>
          ))
          )}
          </Slider>
        </section>

            
        </>
    )
}

export default Sliders
