import React, { useEffect, useState } from "react";
import { getOrders, autoLogin, getProducts, deleteOrder } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from '../actions/actions';

const Orders = (props) => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.userOrders.orders);
  const [ newOrder, setNewOrder ] = useState(orders ? orders : [])
  const products = useSelector((state) => state.products.products);

  useEffect (function effectFunction() {
    fetch('http://localhost:3001/api/v1/orders', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
        .then(response => response.json())
        .then((data => {
          setNewOrder(data)
        }))
}, []);
  // useEffect(() => {
  //   dispatch(autoLogin());
  // }, []);

  useEffect(() => {
    if(newOrder){
      dispatch(getOrders());

    }
  }, [newOrder]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);


  const userId = newOrder.filter(
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
    <div>
      {userId.map((x) => {
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
            <div key={parsing.id}>
              <p>{parsing.name}</p>
              <p>{parsing.price}</p>
              <p>{parsing.count}</p>
              <p>{parsing.description}</p>
              <p>{parsing.created_at}</p>
              <p>{parsing.id}</p>
              {totals}
              {/* <img src={images.avatar.url} alt='' /> */}
              <button type='submit' onClick={() => dispatch(deleteOrder(x.id))}>Delete</button>
            </div>
          );
        });
      })}
    </div>
  );
};

export default Orders;
