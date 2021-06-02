import React, { useEffect, useState } from "react";
import Fade from 'react-reveal/Fade'
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom'
import { addToCart } from '../actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { AddShoppingCart } from '@material-ui/icons';

const Product = (props) => {
    const { product } = props
    const dispatch = useDispatch();
    const handleAdd = product => {
        dispatch(addToCart(product))
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

      colorIcon: {
        color: '#003049'
      },
    });

    const classes = useStyles();


    return (
        <div>

        
                <Fade bottom cascade>
        <Card className={classes.root}>
      <CardActionArea>
      <Link to={'#' + product.id} onClick={() => openModal(product)}> 
      <CardMedia
          component="img"
          alt={product.name}
          height="140"
          image={product.avatar.url}
          title={product.name}
        />    </Link>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardButtons}>
        <Button size="small" color={classes.colorIcon}>
          {product.category}
        </Button>
        <Button size="small" color="primary">
          ${product.price}
        </Button>
        <Button size="small" onClick={() => handleAdd(product)} color="primary">
          <AddShoppingCart />
        </Button>
      </CardActions>
    </Card>
                  </Fade>                  {
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
                                        <button onClick={() => {handleAdd(product); closeModal();}}>Add to cart</button>
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
