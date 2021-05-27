import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getOrders, autoLogin, getProducts, deleteOrder } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromOrder } from '../actions/actions';

const Orders = (props) => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);
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
    <div>
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
            <div key={parsing.id}>
              <p>{parsing.name}</p>
              <p>{parsing.price}</p>
              <p>{parsing.count}</p>
              <p>{parsing.description}</p>
              <p>{parsing.created_at}</p>
              <p>{parsing.id}</p>
              {totals}
      <button type='submit' onClick={() => dispatch(deleteOrder(x.id))}>Delete</button>
            </div>
          );
        });
      })}

    </div>
  );
};

export default Orders;
