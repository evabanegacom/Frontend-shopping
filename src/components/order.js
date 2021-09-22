import React, { useEffect, useState } from "react";
import { getOrders, autoLogin, getProducts, deleteOrder } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromOrder } from '../actions/actions';
import { Button , Paper, TextField} from '@material-ui/core';
import './orderCss.css';
import dateFormat from 'dateformat';
import { Formik } from "formik";
import * as yup from 'yup';
import 'react-notifications/lib/notifications.css';
import {
   NotificationContainer,
   NotificationManager,
 } from 'react-notifications';

 const reviewSchema = yup.object().shape({
  name: yup.string().required().min(4),
  comment: yup.string().required().min(5),
  product_id: yup.string().required().min(1),
})

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

  const userId = orders.length && orders.filter(
    (order) => order.user_id === parseInt(props.match.params.id, 10)
  );
  
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
    <div className='theOrderDiv'>

      {userId && userId.map((x) => {
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
              <p style={{ color:'white'}}>Price: &nbsp;&#8358; {parsing.price}</p>
              <p style={{ color:'white'}}>Quantity: &nbsp;{parsing.count}</p>
             
              <p style={{ color:'white'}}>Date: &nbsp;{dateFormat(parsing.created_at, "mmmm dS, yyyy")}</p>
      <Button style={{color: 'yellow'}} type='submit' onClick={() => addingToCart(parsing)}>Re-Order</Button>
      <Button color='secondary' type='submit' onClick={() => dispatch(deleteOrder(x.id))}>Remove</Button>
      {/* <Button color='secondary' type='button' >make a review</Button> */}
       {/* <Formik
       initialValues={{ name: "", comment: "", product_id: parsing.id }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          console.log(values)
          addUser(values);
          actions.resetForm();
        }}
        >
        {(formikProps) => (
          <Paper className='formik' elevation={10}>
            <h2>SignUp</h2>
          <div className='avatarLogo'><Avatar style={ avatarStyle }><LockOutlinedIcon /></Avatar></div>
          <form onSubmit={formikProps.handleSubmit}>
            <TextField
              placeholder="Name"
              onChange={formikProps.handleChange("name")}
              value={formikProps.values.name}
              onBlur={formikProps.handleBlur('name')}
              type='text'
              label='Name'
              required
              fullWidth
            />

            <p>{formikProps.touched.name && formikProps.errors.name}</p>

            <TextField
              placeholder="comment"
              onChange={formikProps.handleChange("comment")}
              value={formikProps.values.comment}
              onBlur={formikProps.handleBlur('comment')}
              type='text'
              label='comment'
              required
              fullWidth
            />

            <p>{formikProps.touched.comment && formikProps.errors.comment}</p>
            <Button className='signUpButton' type='submit' fullWidth onClick={formikProps.handleSubmit}>Create Account</Button>
            </form>
            </Paper>
        )}
       </Formik> */}
              </div>
            </div>
          );
        });
      })}
      <NotificationContainer />
    </div>
  );
};

export default Orders;
