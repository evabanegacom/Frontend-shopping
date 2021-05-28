import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => (
  <div className="right">
    <p><NavLink to="/signup">Sign up</NavLink></p>
    <p><NavLink to="/signin">Login</NavLink></p>
  </div>
);

export default SignedOutLinks;