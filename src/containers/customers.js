import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { customers, autoLogin, getOrders } from '../actions/actions';

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

console.log(userId(3).length)


    return (
        <div>
          <div className='inputDiv'>
                <input
          type="text"
          placeholder="search..."
          onChange={handleSearches}
          
        /></div>
          {theCustomers.length && theCustomers.filter((customer) =>{
              if(search === ''){
              return theCustomers.map((customer) => (
                  <div key={customer.id}>
                  <p>{customer.name}</p>
                  <p>{customer.email}</p>
                  <p>{customer.phone}</p>
                  <p>orders: {userId(customer.id).length}</p>
              </div>
              ))
              }else if(customer.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                  return customer
              }
          }). map((customer) => (
              <div key={customer.id}>
                  <p>{customer.name}</p>
                  {/* <p>{customer.email}</p> */}
                  <p>orders: &nbsp;{userId(customer.id).length}</p>
              </div>
          ))
          }
        </div>
    )
}

export default Customers;
