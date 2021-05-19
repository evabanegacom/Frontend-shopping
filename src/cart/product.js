import React, { useEffect, useState } from "react";
// import {addToCart} from '../actions/actions'
import Fade from 'react-reveal/Fade'
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom'

const Product = (props) => {
    const { product, addToCart } = props
    const dispatch = useDispatch();
    const [productModal, setProductModal] = useState(null)

    const openModal =  (e, products) => {
      setProductModal(products)
      console.log(productModal)
    }

    const closeModal = () => {
        setProductModal(null)
    }

    return (
        <div>
        <Fade bottom cascade>
           <p>{product.name}</p>
                  <p>{Number(product.price)}</p>
                  <p>{product.description}</p>
                  <p>{product.category}</p>
        <a href={'/product/' +  product.id} onClick={() => openModal(product)}>
                  <img style={{ width: '150px', height: '150px'}} src={product.avatar.url}/>
        </a>
                  <button onClick={() => addToCart(product)}>Add To Cart</button>
                  </Fade>
                  {
                      productModal && (
                          <Modal isOpen={true} onRequestClose={closeModal}>
                              <Zoom>
                              <button onClick={closeModal}>close</button>
                                  <div>Modal</div>
                              </Zoom>
                          </Modal>
                      )
                  } 
        </div>
    )
}

export default Product
