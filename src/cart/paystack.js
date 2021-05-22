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
    publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
};

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  

  const Paystack = (props) => {
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);
  
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Paystack Hooks Implementation</button>
      </div>
    );
};

export default Paystack
