import React, { useEffect, useState } from "react";
import Fade from 'react-reveal/Fade'
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom'
import { addToCart } from '../actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { AddShoppingCart } from '@material-ui/icons';
import './modalCss.css';
import 'react-notifications/lib/notifications.css';
import {
   NotificationContainer,
   NotificationManager,
 } from 'react-notifications';

const Product = (props) => {
    const { product } = props
    const dispatch = useDispatch();
    const handleAdd = product => {
        dispatch(addToCart(product))
        NotificationManager.success('Item added to cart', 'success', 3000);
    }
    const [productModal, setProductModal] = useState(null)
    const openModal =  (products) => {
      setProductModal(products)
      console.log(productModal)
    }

    const closeModal = () => {
        setProductModal(null)
    }

    const useStyles = makeStyles({
      root: {
        maxWidth: "100%",
      },

      cardButtons: {
        display: 'flex',
        justifyContent: 'space-around',
      },

      cartColor: {
        background: '#003049',
        color: '#ffffff',
      },

      colorIcon: {
        color: '#003049'
      },

      secondMedia: {
        height: 150,
        margin: 'auto',
      },

      media: {
        height: 200,
        width: 200,
        margin: 'auto',
    },
    });

    const classes = useStyles();

    return (
        <div>

        
                <Fade bottom cascade>
        <Card className={classes.root}>
      <CardActionArea>
      <Link to={'#' + product.id} onClick={() => openModal(product)}> 
      <CardMedia className={product.category==='BestDeals' ? classes.secondMedia : classes.media}
          alt={product.name}

          component='img'
          
          // className={classes.media}          
          image={product.avatar.url.replace(/http/g, "https")}
          title={product.name}
        />    </Link>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardButtons}>
        <Button size="small" color={classes.colorIcon}>
        <Link style={{ textDecoration: 'none', color: 'green'}} to={'#' + product.id} onClick={() => openModal(product)}>see details</Link>
        </Button>
        <Button size="small" color="primary">
          ${product.price}
        </Button>
        <Button size="small" onClick={() => handleAdd(product)} color="primary">
          <AddShoppingCart className={classes.cartColor}/>
        </Button>
      </CardActions>
    </Card>
                  </Fade>                  {
                      productModal && (
                          <Modal isOpen={true} className='theModal' onRequestClose={closeModal}>
                              <Zoom>
                              <Button className='modalClose' onClick={closeModal}>X</Button>
                                  <div className='modalDiv'>
                                      <img src={product.avatar.url.replace(/http/g, "https")} alt='' />
                                      <div>
                                        <p>Name: &nbsp;&nbsp; <strong>{product.name}</strong></p>
                                        <p className='productDesc'><span style={{ fontWeight: 700}}>Description</span>: &nbsp;&nbsp;{product.description}</p>
                                        <p>Category: &nbsp;&nbsp; {product.category}</p>
                                        <p>Price: &nbsp;&nbsp; {product.price}</p>
                                      </div>
                                        <button className='cartButton' onClick={() => {handleAdd(product); closeModal();}}><AddShoppingCart /></button>
                                  </div>
                              </Zoom>
                          </Modal>
                      )
                  }
                  <NotificationContainer /> 
        </div>
    )
}

export default Product
