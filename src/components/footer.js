import React from "react";
import "./footer.css";
import samsung from '../images/samsung.jpeg';
import hisense from '../images/hisense.jpeg';
import syinx from '../images/syinx.jpeg';
import midea from '../images/midea.jpeg';
import scanfrost from '../images/scanfrost.jpeg';
import bruhm from '../images/bruhm.jpeg';
import binatone from '../images/binatone.jpeg';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footerDiv'>
      <h2>Brands</h2>
       <div className='contactIcons'>
        <img src={samsung} alt='samsung' />
        <img src={hisense} alt='hisense' />
        <img src={syinx} alt='syinx' />
        <img src={midea} alt='midea' />
        <img src={scanfrost} alt='scanfrost' />
        <img src={bruhm} alt='bruhm' />
        <img src={binatone} alt='binatone' />
        </div>
        <div className='contactNumber'>
        <p>Call us at +2348064129038</p><br />
        <p>Email us at udegbue69@gmail.com</p>
        </div>
        <p style={{ color: 'gold', fontStyle: 'italic', fontWeight: '600', marginBottom: '20px'}}>&#169; copyright Ejovial Electronics 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
