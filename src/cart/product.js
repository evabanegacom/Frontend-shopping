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

    const openModal =  (products) => {
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
        <a href={'#' +  product.id} onClick={() => openModal(product)}>
                  <img style={{ width: '150px', height: '150px'}} src={product.avatar.url}/>
        </a>
                  <button onClick={() => addToCart(product)}>Add To Cart</button>
                  </Fade>
                  {
                      productModal && (
                          <Modal isOpen={true} onRequestClose={closeModal}>
                              <Zoom>
                              <button onClick={closeModal}>close</button>
                                  <div>
                                      <img src={product.avatar.url} alt='' />
                                      <div>
                                        <p><strong>{product.name}</strong></p>
                                        <p>{product.description}</p>
                                        <p>{product.category}</p>
                                        <p>{product.price}</p>
                                        <button onClick={() => {addToCart(product); closeModal();}}>Add to cart</button>
                                      </div>
                                  </div>
                              </Zoom>
                          </Modal>
                      )
                  } 
        </div>
    )
}

export default Product
