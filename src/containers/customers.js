import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { customers, getOrders } from '../actions/actions';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import './customer.css';

const Customers = () => {
    const [search, setSearch ] = useState('')

    const dispatch = useDispatch();
    const theCustomers = useSelector((state) => state.customers.customers)
    const orders = useSelector((state) => state.userOrders.orders);

useEffect(() =>{
    dispatch(getOrders())
  dispatch(customers())
}, [])

const handleSearches = (event) => {
    setSearch(event.target.value)
  };

  const userId = (id) => {
    return orders.length && orders.filter(
    (order) => order.user_id === id
  )
}

    return (
        <div className='mainContent'>
          <div className='searchDiv'>
                <input
          type="text"
          placeholder="search..."
          onChange={handleSearches}
          
        /></div>
         <div className='customerInfo'>
          {theCustomers.length && theCustomers.filter((customer) =>{
              if(search === ''){
              return theCustomers.map((customer) => (
                  <div className='info' key={customer.id}>
                  <p>Name: &nbsp;{customer.name}</p>
                  <p>Email: &nbsp;{customer.email}</p>
                  <p>Number: &nbsp;{customer.phone}</p>
                  <p>Orders: &nbsp;{userId(customer.id).length}</p>
              </div>
              ))
              }else if(customer.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                  return customer
              }
          }). map((customer) => (
            <Paper elevation={10} className='info'>
              <div>
                  <p>Name: &nbsp;{customer.name}</p>
                  <p>Email: &nbsp;{customer.email}</p>
                  <p>Number: &nbsp;{customer.phone}</p>
                  <p>Orders: &nbsp;{userId(customer.id).length}</p>
              </div>
              </Paper>
          ))
          }
          </div>
        </div>
    )
}

export default Customers;
