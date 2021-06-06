import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footerDiv'>
      <h2>Contact us</h2>
       <div className='contactIcons'>
        <p><a href='https://github.com/evabanegacom'><i class="fab fa-github"></i></a></p>
        <p><a href='https://www.linkedin.com/in/precious-udegbue/'><i class="fab fa-linkedin"></i></a></p>
        <p><a href='https://www.loom.com/share/78fd35d5aa26447a9e6818be50bc9c76'><i class="fab fa-youtube"></i></a></p>
        <p><a href='https://twitter.com/precious_bones'><i class="fab fa-twitter"></i></a></p>
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
