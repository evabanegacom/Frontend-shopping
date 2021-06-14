import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from 'yup';
import { signUserUp } from '../actions/actions';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';

import './signUp.css';

const reviewSchema = yup.object().shape({
  name: yup.string().required().min(4),
  email: yup.string().required().min(5),
  password: yup.string().required().min(6),
  password_confirmation: yup.string().required().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("password")],
      "Both password need to be the same"
    )
    })
})

export default function SignUp(props) {
  const avatarStyle = { backgroundColor: '#264e0cf5' }
  const dispatch = useDispatch();
  const addUser = user => dispatch(signUserUp(user));
  const user = useSelector((state) => state.user);
  user.loggedIn === true ? props.history.push('/') : console.log('cool')
  return (
    <div className='signUpDiv'>
      <Formik
        initialValues={{ name: "", email: "", password: "", password_confirmation: '' }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          console.log(values)
          addUser(values);
          actions.resetForm();
          props.history.push('/')
        }}
      >
        {(formikProps) => (
          <Paper className='formik' elevation={10}>
            <h2>SignUp</h2>
          <div className='avatarLogo'><Avatar style={ avatarStyle }><LockOutlinedIcon /></Avatar></div>
          <form onSubmit={formikProps.handleSubmit}>
            <TextField
              placeholder="Name"
              onChange={formikProps.handleChange("name")}
              value={formikProps.values.name}
              onBlur={formikProps.handleBlur('name')}
              type='text'
              label='Name'
              required
              fullWidth
            />

            <p>{formikProps.touched.name && formikProps.errors.name}</p>

            <TextField
              placeholder="Email"
              onChange={formikProps.handleChange("email")}
              value={formikProps.values.email}
              onBlur={formikProps.handleBlur('email')}
              type='email'
              label='Your Email'
              required
              fullWidth
            />

            <p>{formikProps.touched.email && formikProps.errors.email}</p>

            <TextField
              placeholder="password 6 chars min"
              onChange={formikProps.handleChange("password")}
              value={formikProps.values.password}
              onBlur={formikProps.handleBlur('password')}
              type='password'
              label='Password'
              required
              fullWidth
            />

            <p>{formikProps.touched.password && formikProps.errors.password}</p>
            <TextField
              placeholder="Confirm Password"
              onChange={formikProps.handleChange("password_confirmation")}
              value={formikProps.values.password_confirmation}
              onBlur={formikProps.handleBlur('password_confirmation')}
              fullWidth
              required
              label='Confirm Password'
              type='password'
            />
            <p>{formikProps.touched.password_confirmation && formikProps.errors.password_confirmation}</p>

            <Button className='signUpButton' type='submit' fullWidth onClick={formikProps.handleSubmit}>Create Account</Button>
          </form>
          </Paper>
        )}
      </Formik>
    </div>
  );
}

