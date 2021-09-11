import React from 'react';
import styled from "styled-components";

const PageNotFound = () => {
    const NotFound = styled.div`
      ${'' /* background: url(${'https://cdn4.vectorstock.com/i/1000x1000/75/83/404-error-page-not-found-plug-graphic-vector-19997583.jpg'});
      background-size: auto auto;
      background-repeat: no-repeat; */}
      
      img {
          @media only screen and (max-width: 767px){
              width: 300px;
              heght: 300px;
          }
      }
    `;
    return (
        <NotFound>
            <p>404 PAGE NOT FOUND</p>
            <img style={{width: '100%'}} src='https://cdn4.vectorstock.com/i/1000x1000/75/83/404-error-page-not-found-plug-graphic-vector-19997583.jpg' alt='' />
        </NotFound>
    )
}

export default PageNotFound
