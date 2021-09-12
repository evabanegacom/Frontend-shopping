import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

const PageNotFound = () => {
    const NotFound = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 0;
    img{
          height: 300px;
          width: 400px
      }
      @media only screen and (max-width: 767px){
          img{
              width: 320px;
          }
      }
    `;
    return (
        <NotFound>
            <div style={{ background: 'white', width: '100%'}}><Button component={Link} to='/'>Go to homepage</Button></div>
            <div style={{ background: '#131c3b', width: '100%'}}><img src='https://res.cloudinary.com/spetsnaz/image/upload/v1631470398/screenshot-web.whatsapp.com-2021.09.12-19_09_11_xdfrsr.png' alt='' /></div>
        </NotFound>
    )
}

export default PageNotFound
