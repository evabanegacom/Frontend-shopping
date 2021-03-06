import React, { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack'
import { useSelector, useDispatch } from "react-redux";
import { usePaystackPayment } from 'react-paystack';
import { autoLogin } from '../actions/actions';
import { Button } from '@material-ui/core';


const API_KEY =`${process.env.REACT_APP_API_KEY}`
      // const API_KEY = 'sk_test_6818bd1854932ea6624c2c5e581f1185a22c86eb'
      
  // you can call this function anything

  

  const config = {
    reference: (new Date()).getTime(),
    email: "user@example.com",
    amount: 20000,
    publicKey: API_KEY,
};

  // you can call this function anything
  

  const Paystack = ({ isValid, createOrderPaystack, paidWithCard }) => {
    const dispatch = useDispatch();
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(autoLogin())
  }, []);

  const initializePayment = usePaystackPayment({ 
    reference:(new Date()).getTime(),
     email: JSON.stringify(user.loggedIn === 'true') ? user.user.email : null, 
     amount: Math.trunc(cart.reduce((a, c) => a + c.price*c.count, 0))*100, 
     publicKey: 'pk_test_2c676d6b01cea0704354f1a486590a28da55a341'
   });

  const onSuccess = (reference) => {
    // const validate
    // Implementation for whatever you want to do with reference and after success call.
    
    createOrderPaystack()
    console.log(reference);
    paidWithCard()
  };

  const handlePay = (amount) => {
    const validate = isValid()
    if(validate ){
      initializePayment(onSuccess)
      // if(amount.status === 'success'){
      // paidWithCard()
      // }
    }
  }
    // const initializePayment = usePaystackPayment(config);
    return (
      <div>
          {/* <Button style={{color: 'green'}} fullWidth onClick={handlePay}>Pay With Credit Card</Button> */}
      </div>
    );
};

export default Paystack
