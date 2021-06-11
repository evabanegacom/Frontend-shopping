import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getOrders, autoLogin, getProducts, deleteOrder } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromOrder } from '../actions/actions';
import { Button } from '@material-ui/core';
import './orderCss.css';
import dateFormat from 'dateformat';

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

  return (
    <div className='theOrderDiv'>
      {userId && userId.map((x) => {
        return x.cartitems.map((y) => {
          const replacement = y.replace(/[&\/\\=]/g, "");
          const remove = replacement.replace(/[&\/\\>]/g, ":");
          const parsing = JSON.parse(remove);
          const images = products.filter(
            (product) => product.id === parsing.id
          );
          let totals = images.map(function (x) {
            return <img src={x.avatar.url} alt="" />;
          });
          return (
            <div className='orderContent' key={parsing.id}>
              {totals}
              <p>Name: &nbsp;{parsing.name}</p>
              <p>Price: &nbsp;{parsing.price}</p>
              <p>Quantity: &nbsp;{parsing.count}</p>
             
              <p>Date: &nbsp;{dateFormat(parsing.created_at, "mmmm dS, yyyy")}</p>
              
      <Button color='secondary' type='submit' onClick={() => dispatch(deleteOrder(x.id))}>Remove</Button>
            </div>
          );
        });
      })}

    </div>
  );
};

export default Orders;
