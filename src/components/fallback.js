import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Fallback = () => {
    const StyledDivs = styled.div`
      text-align: center;
    `;

    return (
        <StyledDivs>
            <h1>Sorry SOmething went wrong... please go back</h1>
            <p><Link style={{ textDecoration: 'none'}} to='/'>Please go home</Link></p>
        </StyledDivs>
    )
}

export default Fallback