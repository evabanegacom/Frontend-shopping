import React, { useEffect } from 'react';
import { getProducts } from '../actions/actions';
import { useSelector, useDispatch } from "react-redux";
import { Button } from '@material-ui/core';
import { addToCart } from '../actions/actions';
import 'react-notifications/lib/notifications.css';
import {
   NotificationContainer,
   NotificationManager,
 } from 'react-notifications';

const NewProductPage = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
      }, [])

      const handleAdd = product => {
        dispatch(addToCart(product))
        NotificationManager.success('Item added to cart', 'success', 2000);
    }
    
    const products = useSelector((state) => state.products.products);

    const filterProduct = products.length && products.filter(
        (product) => product.id === parseInt(props.match.params.id, 10)
      );

    return (
        <>
        { filterProduct.length && filterProduct.map((product) =>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '30px'}}>
              <div><p>{product.name}</p></div>
              <div style={{ marginTop: '20px'}}><p>{product.price}</p></div>
              <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center'}}><img xs={12} sm={6} md={4} lg={3} src={product.avatar.url.replace(/http/g, "https")} alt={product.name} /></div>
              <div style={{ marginTop: '20px'}}><p>{product.description}</p></div>
              <Button style={{background: 'green', color: '#fff'}} onClick={() => handleAdd(product)} >Buy Now</Button>
              <NotificationContainer />
          </div>
        )}
        </>
    )
}

export default NewProductPage;
