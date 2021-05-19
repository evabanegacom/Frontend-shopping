import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from '../cart/product';
import Filter from '../containers/filter';
import ReactPaginate from "react-paginate";
import Basket from '../cart/basket';
import { getProducts } from '../actions/actions';

const Products = () => {
    const dispatch = useDispatch();
    const storage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    const [ sort, setSort] = useState('')
    const [ size, setSize] = useState('')
    const products = useSelector((state) => state.products.products);
    const [currentPage, setCurrentPage ] = useState(0)
    const [search, setSearch ] = useState('')
    const [ data, setData] = useState([])
    const PER_PAGE = 20;
    const offset = currentPage * PER_PAGE;
    const [ cartItems, setCartItems ] = useState(storage)
    const pageCount = Math.ceil(data.length / PER_PAGE);

    useEffect (function effectFunction() {
      fetch('http://localhost:3001/api/v1/products', {
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
          ((a.price > b.price)? 1: -1):
          sorted === 'highest' ?
          ((a.price < b.price)? 1: -1):
          ((a.created_at < b.created_at)? 1: -1)
        ))
        )
      }

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
      };

      const createOrder = (order) => {
       alert("need to save order" + order.name)
      }


    return (
        <div>
                <Filter
                size={size} 
                sorting={sort}
                count={data.length}
                filterProducts={filterProducts}
                sortProducts={sortProducts}
                />
                <input
          type="text"
          placeholder="search..."
          onChange={handleSearches}
          style={{ width: '300px', height: '30px', borderRadius: '10px', background: 'black', outline: 'none', border: 'none', marginTop: '20px', color: '#FFFFFF'}}
        />
          {data && data.length ? (
            data.filter((product) =>{
              if(search ===''){
                return data.slice(offset, offset + PER_PAGE).map((product) => (<Product product={product} key={product.id} addToCart={addToCart}/>))
              } else if(product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                return product
              }
            }).slice(offset, offset + PER_PAGE).map((product) => (
              <Product addToCart={addToCart} product={product} key={product.id} />
            ))
          ) : (<p>no items here</p>)}
          <Basket 
          cartItems={cartItems} 
          removeFromCart={removeFromCart} 
          removeOneItem={removeOneItem} 
          addOneItem={addOneItem} 
            createOrder={createOrder}
          />
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
        </div>
    )
}

export default Products
