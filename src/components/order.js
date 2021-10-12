import React, { useEffect, useState } from "react";
import { getOrders, autoLogin, getProducts, deleteOrder, postReview } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromOrder } from '../actions/actions';
import { Button , Paper, TextField} from '@material-ui/core';
import './orderCss.css';
import dateFormat from 'dateformat';
import { Formik } from "formik";
import * as yup from 'yup';
import { FaStar } from 'react-icons/fa'
import 'react-notifications/lib/notifications.css';
import {
   NotificationContainer,
   NotificationManager,
 } from 'react-notifications';

const Orders = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  {user.loggedIn === false ? props.history.push('/') : (<p>you are not logged in </p>)}
  const orders = useSelector((state) => state.userOrders.orders);
  const [ newOrder, setNewOrder ] = useState([])
  const products = useSelector((state) => state.products.products);

useEffect(() => {
    dispatch(getOrders())
}, [JSON.stringify([orders])]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const addingToCart = product => {
   dispatch(addToCart(product))
   NotificationManager.success('Item added to cart', 'success', 2000);
  }

  
  const [hover, setHover] = useState(null)
  
  const [showRating, setShowRating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    comment: '',
    product_id: '',
    rating: '',
  })

  const userId = orders.length && orders.filter(
    (order) => order.user_id === parseInt(props.match.params.id, 10)
  );

  const onNameChange = (event) => {
    event.preventDefault()
    setFormValues((formValues) =>({
      ...formValues,
      name: event.target.value
    }))
  }

  const onCommentChange = (event) => {
    event.preventDefault()
    setFormValues((formValues) =>({
      ...formValues,
      comment: event.target.value
    }))
  }

  const onChangeId = (id, index) => {
    setFormValues((formValues) =>({
      ...formValues,
      product_id: id
    }))
    setShowRating(true)
  }

  const onChangeRating = (rating) => {
    setFormValues((formValues) =>({
      ...formValues,
      rating: rating
    }))
    setShowForm(true)
  }

  const closeRatingForm = () => {
    setShowRating(false)
    setShowForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues)
    dispatch(postReview(formValues))
    NotificationManager.success('Review submitted', 'success', 2000);
    setTimeout(() => {
      closeRatingForm()
    }, 2000);
  }

  
// New mapping methods
    // let totals = userId.map(function(x){
    //     return (
    //         <p>{x.total}</p>
    //     )
    // })

    // console.log(totals)

//   var scores = [[2, 7], [13, 47], [55, 77]];
// scores.map(function(subarray) {
//   return subarray.map(function(number) {
//     return number * 3;
//   })
// })


user.loggedIn === false && props.history.push('/login')
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
    <div className='theOrderDiv'>

      {userId && userId.map((x, index) => {
        return x.cartitems.map((y) => {
          const replacement = y.replace(/[&\\\=]/g, "");
          const remove = replacement.replace(/[&\\\>]/g, ":");
          const parsing = JSON.parse(remove);
          
          {/* const images = products.filter(
            (product) => product.id === parsing.id
          );
          let totals = images.map(function (x) {
            return <img src={x.avatar.url.replace(/http/g, "https")} alt="" />;
          }); */}
          {/* function countInArray(what) {
    return x.cartitems.filter((item) => item.id === what.id).length;
    } */}
          return (
            <div className='orderContent' key={parsing.id}>
              {/* {totals} */}
              <img src={parsing.avatar.url.replace(/http:/g, "https:")} alt='' />
              <div style={{ background: '#003049'}}>
              <p style={{ color:'white'}}>Name: &nbsp;{parsing.name}</p>
              <p style={{ color:'white'}}>Price: &nbsp; &#8358;{Number(parsing.price).toLocaleString("en")}
</p>
              <p style={{ color:'white'}}>Quantity: &nbsp;{parsing.count}</p>
             
              <p style={{ color:'white'}}>Date: &nbsp;{dateFormat(x.created_at, "mmmm dS, yyyy")}</p>
      <Button style={{color: 'yellow'}} type='submit' onClick={() => addingToCart(parsing)}>Re-Order</Button>
      <Button color='secondary' type='submit' onClick={() => dispatch(deleteOrder(x.id))}>Remove</Button>
      <Button onClick= {() => onChangeId(parsing.id)} color='secondary' type='button' >make a review</Button>
      {showRating && (parsing.id===formValues.product_id) && <div className='starDiv'>
        {[...Array(5)].map((star, i) =>{
          const ratingValue = i + 1;
          return (
            <label>
              <input className='hide-rating'
                type='radio'
                name='rating'
                value={ratingValue}
                
                onClick={() => onChangeRating(ratingValue)}
              />
              <FaStar 
                className='star'
                color={ratingValue <= (hover || formValues.rating) ? '#ffc107': '#e4e5e9'}
                size={20}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          )
        })}
      </div>
      }
       
              </div>
            </div>
          );
        });
      })}
    </div>
    
    {showForm && <Paper elevation={10}>
            <h4>Make a review</h4>
          {/* <div className='avatarLogo'><Avatar style={ avatarStyle }><LockOutlinedIcon /></Avatar></div> */}
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="name"
              onChange={onNameChange}
              type='text'
              label='name'
              required
              fullWidth
            />

            <TextField
              placeholder="comment"
              onChange={onCommentChange}
              type='text'
              label='comment'
              required
              fullWidth
            />
            <Button className='signUpButton' type='submit' fullWidth >Submit Review</Button>
            </form>
            <Button className='signUpButton' onClick={closeRatingForm}type='button' fullWidth >Cancel</Button>
            </Paper>
    }
       <NotificationContainer />
    </div>
  );
};

export default Orders;
