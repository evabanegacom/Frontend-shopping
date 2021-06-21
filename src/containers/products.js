import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from '../cart/product';
import Filter from '../containers/filter';
import ReactPaginate from "react-paginate";
import Basket from '../cart/basket';
import { Link } from 'react-router-dom'
import { getProducts, autoLogin } from '../actions/actions';
import { Box, Grid } from '@material-ui/core';
import useStyles from './styles';
import '../containers/filterCss.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Products = (props) => {
  const classes = useStyles();
    const dispatch = useDispatch();
    // const storage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    const [ sort, setSort] = useState('')
    const [ size, setSize] = useState('')
    const products = useSelector((state) => state.products.products);
    const cart = useSelector((state) => state.cart.cartItems);
    const [currentPage, setCurrentPage ] = useState(0)
    const [search, setSearch ] = useState('')
    const [ data, setData] = useState([])
    const PER_PAGE = 20;
    const offset = currentPage * PER_PAGE;
    const [ cartItems, setCartItems ] = useState('')
    const pageCount = Math.ceil(data.length / PER_PAGE);
    const user = useSelector((state) => state.user)

    useEffect (function effectFunction() {
      fetch('https://neptune-spear.herokuapp.com/api/v1/products', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
          .then(response => response.json())
          .then((data => {
            setData(data)
          }))
  }, []);

  useEffect(() => {
    dispatch(getProducts())
  }, [])

      const sortProducts = (event) => {
        const sorted = event.target.value
        setSort(sorted)
        setData(data.slice().sort((a, b) => (
          sorted === 'lowest' ?
          ((Number(a.price) > Number(b.price))? 1: -1):
          sorted === 'highest' ?
          ((Number(a.price) < Number(b.price))? 1: -1):
          ((a.created_at < b.created_at)? 1: -1)
        ))
        )
      }

      var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      const addToCart = (product) => {
        const cartItem = cartItems.slice()
        let alreadyInCart = false
        cartItem.forEach((item) => {
          if(item.id === product.id){
            item.count++;
            alreadyInCart = true;
          }
        })
        if(!alreadyInCart){
          cartItem.push({...product, count: 1})
        }
        setCartItems(cartItem)
        localStorage.setItem("cartItems", JSON.stringify(cartItem))
      }

      const addOneItem = (product) => {
        const cartItem = cartItems.slice()
        cartItem.forEach((item) => {
          if(item.id === product.id){
            item.count++;
          }
        })
        setCartItems(cartItem)
        localStorage.setItem("cartItems", JSON.stringify(cartItem))
      }

      const removeOneItem = (product) => {
        const cartItem = cartItems.slice()
        let alreadyInCart = false
        cartItem.forEach((item) => {
          if(item.id === product.id){
            item.count--
            alreadyInCart = false;
          }
          else{
            console.log('hello')
        }
        })
        setCartItems(cartItem)
        localStorage.setItem("cartItems", JSON.stringify(cartItem))
      }

      const removeFromCart = (product) => {
        const cartItem = cartItems.slice()
        setCartItems(cartItem.filter(x=> x.id !== product.id))
        localStorage.setItem("cartItems", JSON.stringify(cartItem.filter(x=> x.id !== product.id)))
      }

      const filterProducts = (event) => {
        if(event.target.value === ''){
          setSize(event.target.value)
          setData(products)
        }else{
          console.log(event.target.value)
        setSize(event.target.value)
        setData(products.filter(product => product.category.indexOf(event.target.value) >=0))
        }
      }

      const handleSearches = (event) => {
        setSearch(event.target.value)
      };

      const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage)
        setSearch('')
      }

      user.loggedIn === false && props.history.push('/login')

    return (
        <Box component='div' display='flex' flexDirection='column'>
                <div className='filterContainer'>
                <Filter
                size={size} 
                sorting={sort}
                count={data.length}
                filterProducts={filterProducts}
                sortProducts={sortProducts}
                />
                <div className='inputDiv'>
                <input
          type="text"
          placeholder="search..."
          onChange={handleSearches}
          
        /></div>
        </div>

        <section className='carousel'>
        <Slider className='slider' {...settings}>
          {data && data.length && (
            data.map((product) => {
              return product.category === 'BestDeals' ? (
               
                <div className='carouselItem'>
                <img src={product.avatar.url.replace(/http/g, "https")} alt='' />
                
                </div>
                
              ) : (console.log('no item'))
            })
          )}
          </Slider>
          
        </section>
        <main className={classes.content}>
      <Grid container justify="center" spacing={4}>
                {data && data.length ? (
            data.filter((product) =>{
              if(search ===''){
                return data.slice(offset, offset + PER_PAGE).map((product) => (
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
          {/* <Basket 
          // cartItems={cartItems} 
          // removeFromCart={removeFromCart} 
          // removeOneItem={removeOneItem} 
          // addOneItem={addOneItem} 
            // createOrder={createOrder}
          /> */}
          

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

export default Products
