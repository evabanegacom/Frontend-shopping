import React, { useEffect } from 'react';
import { getProducts } from '../actions/actions';
import { useSelector, useDispatch } from "react-redux";
import { Button } from '@material-ui/core';
import { addToCart } from '../actions/actions';
import styled from "styled-components";
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

      const ProductDiv = styled.div`
        display: flex;
        align-items: center;
      `;

    return (
        <>
        { filterProduct.length && filterProduct.map((product) =>
          <ProductDiv>
              <div><p>{product.name}</p></div>
              <div><p>{product.price}</p></div>
              <div><img src={product.avatar.url.replace(/http/g, "https")} alt={product.name} /></div>
              <div><p>{product.description}</p></div>
              <Button onClick={() => handleAdd(product)} >Buy Now</Button>
              <NotificationContainer />
          </ProductDiv>
        )}
        </>
    )
}

export default NewProductPage;
