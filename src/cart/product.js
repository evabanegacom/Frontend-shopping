import React from 'react'
// import {addToCart} from '../actions/actions'
import { useSelector, useDispatch } from "react-redux";

const Product = (props) => {
    const { addToCart, product } = props
    const dispatch = useDispatch();
    return (
        <div>
           <p>{product.name}</p>
                  <p>{Number(product.price)}</p>
                  <p>{product.description}</p>
                  <p>{product.category}</p>
                  <img style={{ width: '150px', height: '150px'}} src={product.avatar.url}/>
                  <button onClick={() => addToCart(product)}>Add To Cart</button> 
        </div>
    )
}

export default Product
