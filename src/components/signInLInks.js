import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/actions';

const SignedInLInks = ({ logOut }) => {
  const history = useHistory();
  const handleClick = e => {
    e.preventDefault();
    logOut();
    history.push('/');
  };

  return (
    <div>
      <p><NavLink onClick={handleClick} to="/">Logout</NavLink></p>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logout()),
});


export default connect(null, mapDispatchToProps)(SignedInLInks);