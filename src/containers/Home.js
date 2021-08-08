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
import homeTheatre from '../images/1.jpg';
import television from '../images/96406_1596312485.jpg';
import fridge from '../images/118566_1540206261.jpg';
import generators from '../images/126611_1612469848.jpg';
import airconditioners from '../images/162181_1572281033.jpg';
import appliance from '../images/appliance.jpg';
import Product from '../cart/product';
import useStyles from '../containers/styles';

import { Button, TextField, Grid, Paper, Box } from '@material-ui/core';

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [search, setSearch ] = useState('')
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

  const handleSearches = (event) => {
    setSearch(event.target.value)
  };


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
        <div className='searchContainer'>
        <input
          type="text"
          placeholder="search..."
          onChange={handleSearches}
        />
       </div>
       <main>
      <Grid container justify="center" spacing={4}>
                {products && products.length && (
            products.filter((product) =>{
              const div = document.querySelector('.secondName') ? document.querySelector('.secondName').classList.add('hide') : null
              if(search ===''){
                return div
                
              } else if(product.category.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                return document.querySelector('.secondName') ? document.querySelector('.secondName').classList.remove('hide') : null, product
                
              }

              else if(product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                return product
              }
            }).slice(0, Number(1)).map((product) => (
              
              <Paper  className='searchCategory secondName' component={Link} style={{ textDecoration: 'none'}} to='/home-theatre' elevation={10} className='homeTheatreItem'>
                <div key={product.id}>
                <p>{product.category}</p>
                <img className='linkImages' src={product.avatar.url.replace(/http/g, "https")} alt='' />
                <p className='categoryText'><Button component={Link} to='/home-theatre' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
                
              ))
          )}
          </Grid>
          </main>
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
          ) : (<Paper component={Link} style={{ textDecoration: 'none'}} to='/home-theatre' elevation={10} className='homeTheatreItem'>
                <div key={Math.random()}>
                <p>Home Theatres</p>
                <img src={homeTheatre} alt='home-theatres' />
                <p className='categoryText'><Button component={Link} to='/home-theatre' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>)}
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
          ) : (<Paper component={Link} style={{ textDecoration: 'none'}} elevation={10} to='/home-appliance' className='homeTheatreItem'>
                <div key={Math.random()}>
                <p>Home Appliances</p>
                <img src={appliance} alt='home appliance' />
                <p className='categoryText'><Button component={Link} to='/home-appliance' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>)}
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
          ) : (<Paper component={Link} to='/television-sets' style={{ textDecoration: 'none'}} elevation={10} className='homeTheatreItem'>
                <div key={Math.random()}>
                <p>Television-sets</p>
                <img src={television} alt='television-sets' />
                <p className='categoryText'><Button component={Link} to='/television-sets' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
                )}
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
          ) : (<Paper component={Link} to='/refrigerators' style={{ textDecoration: 'none'}} elevation={10} className='homeTheatreItem'>
                <div key={Math.random()}>
                <p>Refrigerators/Freezers</p>
                <img src={fridge} alt='fridge' />
                <p className='categoryText'><Button component={Link} to='/refrigerators' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
                )}
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
          ) : (
            <Paper component={Link} to='/generators' style={{ textDecoration: 'none'}} elevation={10} className='homeTheatreItem'>
                <div key={Math.random()}>
                <p>Power Solutions/Generators</p>
                <img src={generators} alt='generators' />
                <p className='categoryText'><Button component={Link} to='/generators' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
          )}
      </div>

      <div className='homeTheatre'>
      {products && products.length ? (
        products.filter((product) => product.category === 'Airconditioners/Coolers').slice(0, Number(1)).map((product) =>

               (
               <Paper component={Link} to='/coolers' style={{ textDecoration: 'none'}} elevation={10} className='homeTheatreItem'>
                <div key={product.id}>
                <p>{product.category}</p>
                <img src={product.avatar.url.replace(/http/g, "https")} alt={product.name} />
                <p className='categoryText'><Button component={Link} to='/coolers' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>
              )
            )
          ) : (<Paper component={Link} to='/coolers' style={{ textDecoration: 'none'}} elevation={10} className='homeTheatreItem'>
                <div key={Math.random()}>
                <p>Airconditioners/Coolers</p>
                <img src={airconditioners} alt='airconditioners' />
                <p className='categoryText'><Button component={Link} to='/coolers' variant='contained' color="primary">Shop Now</Button></p>
                </div>
                </Paper>)}
      </div>
      </div>
    </div>
  );
};

export default Home;
