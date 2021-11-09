import React, { useState, useEffect } from 'react';
import { getProducts, getReviews } from '../actions/actions';
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Paper } from '@material-ui/core';
import { addToCart } from '../actions/actions';
import styled from "styled-components";
import 'react-notifications/lib/notifications.css';
import Zoom from 'react-reveal/Zoom';
import { FaStar } from 'react-icons/fa'
import {
   NotificationContainer,
   NotificationManager,
 } from 'react-notifications';

const NewProductPage = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
        dispatch(getReviews())
      }, [])

      const handleAdd = product => {
        dispatch(addToCart(product))
        NotificationManager.success('Item added to cart', 'success', 2000);
    }

    const [readMore, setReadMore] = useState(true);

    const reviews = useSelector((state) => state.reviews.review);

      const productReview = reviews && reviews?.data?.filter(
      (review) => review.product_id === parseInt(props.match.params.id)
    );

    const toggleReadMore = () => {
      setReadMore(!readMore)
    };
    
    const products = useSelector((state) => state.products.products);

    const filterProduct = products.length && products.filter(
        (product) => product.id === parseInt(props.match.params.id, 10)
      );

      const ProductDiv = styled.div`
        display: flex;
        flex-direction: column;
        text-align: center;
        overflow: hidden;
        padding: 0 0 20px 0;
        img {
          width: 300px;
          height: 250px;
        }
        
      `;

      const Thespan = styled.span`
        color: #003049;
   font-weight: 700;
   cursor: pointer;
   font-size: 20px;
      `;

   const Styledh3 = styled.h3`
     margin-bottom: 20px;
   `;

    const Theinput = styled.input`
      display: none;
    `;

    const DivRating = styled.div`
      display: flex;
      flex-direction: column;
    `;

    const StyledPaper = styled(Paper)`
      margin-bottom: 20px;
    `;

    const starRating = (userRating) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
        {[...Array(5)].map((star, i) =>{
          const ratingValue = i + 1;
          return (
            <label>
              <Theinput
                type='radio'
                name='rating'
                value={ratingValue}
              />
              <FaStar 
                className='star'
                color={Number(ratingValue) <= Number(userRating) ? '#ffc107': '#e4e5e9'}
                size={20}
                
              />
            </label>
          )
        })}
      </div>
      )
    }

    return (
        <>
        { filterProduct.length && filterProduct.map((product) =>
          <ProductDiv>
            <div>
              <div><p style={{ marginTop: '20px'}}>{product.name}</p></div>
              <div><p style={{ marginBottom: '20px'}}>&#8358; {Number(product.price).toLocaleString("en")}</p></div>
              <Grid container justify="center" spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={3}><img src={product.avatar.url.replace(/http/g, "https")} alt={product.name} /></Grid>
              {product.avatartwo.url && <Grid item xs={12} sm={6} md={4} lg={3}><img src={product.avatartwo.url.replace(/http/g, "https")} alt={product.name} />
              </Grid>}
              {product.avatarthree.url && <Grid item xs={12} sm={6} md={4} lg={3}><img src={product.avatarthree.url.replace(/http/g, "https")} alt={product.name} />
              </Grid>}
              </Grid>
              <div>
              <p style={{ marginBottom: '20px', marginTop: '30px'}}>
              {readMore ? product.description.slice(0, 150) : product.description}
              <Thespan onClick={toggleReadMore}>{readMore ? "...read more" : " show less"}
              </Thespan>
              </p>
              </div>
              
              <Button style={{ fontWeight: 700, color: '#fff', background: 'green', marginBottom: '20px'}} fullWidth onClick={() => handleAdd(product)} >Buy Now</Button>
              </div>
               <Styledh3>Reviews and comments</Styledh3>
              {productReview && productReview.map((reviews) =>(
              <StyledPaper elevation={10}>
               <DivRating>
                 <p style={{lineHeight: '40px'}}>{reviews.name} wrote:&nbsp;&nbsp;&nbsp;{reviews.comment}</p>
                 {starRating(reviews.rating)}
               </DivRating>
               </StyledPaper>
              ))}
              <NotificationContainer />
          </ProductDiv>
        )}
        </>
    )
}

export default NewProductPage;
