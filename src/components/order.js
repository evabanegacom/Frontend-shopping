import React, { useEffect, useState } from "react";
import { getOrders, autoLogin, getProducts, deleteOrder } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromOrder } from '../actions/actions';
import { Button } from '@material-ui/core';
import './orderCss.css';
import dateFormat from 'dateformat';
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

  const userId = orders.length && orders.filter(
    (order) => order.user_id === parseInt(props.match.params.id, 10)
  );
  
// New mapping methods
  //   let totals = userId.map(function(x){
  //       return (
  //           <p>{x.total}</p>
  //       )
  //   })

  //   console.log(totals)

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
          
          return (
            <div className='orderContent' key={parsing.id}>
              {/* {totals} */}
              <img src={parsing.avatar.url.replace(/http:/g, "https:")} alt='' />
              <p style={{ color:'cyan'}}>Name: &nbsp;{parsing.name}</p>
              <p style={{ color:'cyan'}}>Price: &nbsp;{parsing.price}</p>
              <p style={{ color:'cyan'}}>Quantity: &nbsp;{parsing.count}</p>
             
              <p style={{ color:'cyan'}}>Date: &nbsp;{dateFormat(parsing.created_at, "mmmm dS, yyyy")}</p>
              
      <Button color='secondary' type='submit' onClick={() => addingToCart(parsing)}>addtocart</Button>
      <Button color='secondary' type='submit' onClick={() => dispatch(deleteOrder(x.id))}>Remove</Button>
            </div>
          );
        });
      })}
      <NotificationContainer />
    </div>
  );
};

export default Orders;
