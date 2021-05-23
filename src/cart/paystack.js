import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack'
import { useSelector, useDispatch } from "react-redux";
import { usePaystackPayment } from 'react-paystack';


const API_KEY =`${process.env.REACT_APP_API_KEY}`
      // const API_KEY = 'sk_test_6818bd1854932ea6624c2c5e581f1185a22c86eb'
      
  // you can call this function anything

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  const config = {
    reference: (new Date()).getTime(),
    email: "user@example.com",
    amount: 20000,
    publicKey: API_KEY,
};

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  

  const Paystack = (props) => {
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);
  console.log(user)

  console.log(typeof cart.reduce((a, c) => a + c.price*c.count, 0))
  
    const initializePayment = usePaystackPayment({ 
      reference:(new Date()).getTime(),
       email: 'user@example.com', 
       amount: Math.trunc(cart.reduce((a, c) => a + c.price*c.count, 0))*100, 
       publicKey:API_KEY
     });
    // const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Paystack Hooks Implementation</button>
      </div>
    );
};

export default Paystack
