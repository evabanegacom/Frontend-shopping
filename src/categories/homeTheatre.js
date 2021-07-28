import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProducts, addToCart } from '../actions/actions';
import 'react-notifications/lib/notifications.css';
import {
   NotificationContainer,
   NotificationManager,
 } from 'react-notifications';

const HomeTheatre = () => {
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
      }, [])
  const handleAdd = product => {
        dispatch(addToCart(product))
        NotificationManager.success('Item added to cart', 'success', 3000);
    }

    const products = useSelector((state) => state.products.products);
    return (
        <div>
            {products && products.length ? (
                products.map((product) =>{
                    return product.category === 'Home Theatres' && (
                        <div>
                            <p>{product.name}</p>
                            <img src={product.avatar.url.replace(/http/g, "https")} alt={product.name} />
                            <p>{product.price}</p>
                            <button onClick={() => handleAdd(product)}>Add to cart</button>
                        </div>
                    )
                })
            ) : (<p>wait for it</p>)}
            <NotificationContainer /> 
        </div>
    )
}

export default HomeTheatre
