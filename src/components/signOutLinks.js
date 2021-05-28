import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => (
  <div className="right">
    <p><NavLink to="/signUp">Sign up</NavLink></p>
    <p><NavLink to="/login">Login</NavLink></p>
  </div>
);

export default SignedOutLinks;