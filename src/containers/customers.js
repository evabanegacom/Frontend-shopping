import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { customers, autoLogin } from '../actions/actions';

const Customers = () => {

    const dispatch = useDispatch();
    const theCustomers = useSelector((state) => state.customers.users)

useEffect(() =>{
    dispatch(autoLogin())
  dispatch(customers())
}, [])

    return (
        <div>
          {theCustomers.map((customer) =>(
              <div>
                  <p>{customer.name}</p>
                  <p>{customer.email}</p>
              </div>
          ))}
        </div>
    )
}

export default Customers;
