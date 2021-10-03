import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProducts, addToCart } from '../actions/actions';
import { Box, Grid } from '@material-ui/core';
import Product from '../cart/product';
import useStyles from '../containers/styles';
import ReactPaginate from "react-paginate";
import Filter from './filterCategories';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './sliderCategory.css';
import SecondSlider from './sliders';
import 'react-notifications/lib/notifications.css';
import {
   NotificationContainer,
   NotificationManager,
 } from 'react-notifications';

const Television = () => {

  const classes = useStyles();

    
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
    
  const sliced = data.length && data.filter((product) => product.category === 'Television-sets')

  const [currentPage, setCurrentPage ] = useState(0)
  const [search, setSearch ] = useState('')
  const PER_PAGE = 20;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(data.length / PER_PAGE);

    const [ sort, setSort] = useState('')

    const handleSearches = (event) => {
        setSearch(event.target.value)
      };

      const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage)
        setSearch('')
      }

    const sortProducts = (event) => {
        const sorted = event.target.value
        setSort(sorted)
        setData(sliced.slice().sort((a, b) => (
          sorted === 'lowest' ?
          ((Number(a.price) > Number(b.price))? 1: -1):
          sorted === 'highest' ?
          ((Number(a.price) < Number(b.price))? 1: -1):
          ((a.created_at < b.created_at)? 1: -1)
        ))
        )
      }

    return (
        <Box component='div' display='flex' flexDirection='column'>
        <div className='filterContainer'>
                <Filter
                sorting={sort}
                count={sliced.length}
                sortProducts={sortProducts}
                />
                <div className='inputDiv'>
                <input
          type="text"
          placeholder="search..."
          onChange={handleSearches}
          
        /></div>
        </div>
<SecondSlider />
            <main className={classes.content}>
      <Grid container justify="center" spacing={4}>
                {sliced && sliced.length ? (
            sliced.filter((product) =>{
              if(search ===''){
                return sliced.slice(offset, offset + PER_PAGE).map((product) => (
                  <Grid item key={Product.id} xs={12} sm={6} md={4} lg={3}><Product product={product} key={product.id} /></Grid>))
              } else if(product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                return product
              }
            }).slice(offset, offset + PER_PAGE).map((product) => (
              <Grid item key={Product.id} xs={12} sm={6} md={4} lg={3}><Product product={product} key={product.id} /></Grid>
            ))
          ) : (<p>WAIT FOR IT...</p>)}
          </Grid>
          </main> 
            <NotificationContainer />
            <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
        </Box>
    )
}

export default Television;
