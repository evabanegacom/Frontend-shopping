import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { customers, autoLogin } from '../actions/actions';

const Customers = () => {
    const [search, setSearch ] = useState('')

    const dispatch = useDispatch();
    const theCustomers = useSelector((state) => state.customers.customers)
    console.log('customers', theCustomers)

useEffect(() =>{
    dispatch(autoLogin())
  dispatch(customers())
}, [])

const handleSearches = (event) => {
    setSearch(event.target.value)
  };

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
                  <div>
                  <p>{customer.name}</p>
                  <p>{customer.email}</p>
                  <p>{customer.phone}</p>
              </div>
              ))
              }else if(customer.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                  return customer
              }
          }). map((customer) => (
              <div>
                  <p>{customer.name}</p>
              </div>
          ))
          }
        </div>
    )
}

export default Customers;
