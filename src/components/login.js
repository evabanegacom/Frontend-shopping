import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { Link } from 'react-router-dom'
import * as yup from 'yup';
import { fetchUser } from '../actions/actions';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'react-notifications/lib/notifications.css';
import {
   NotificationContainer,
   NotificationManager,
 } from 'react-notifications';

const reviewSchema = yup.object().shape({
  email: yup.string().required().min(7),
  password: yup.string().required().min(6),
})

const useStyles = makeStyles(theme => ({
  font: {
    color: 'white'
  }
}))

function Login(props ) {
  const classes = makeStyles()
  const dispatch = useDispatch();
  const addUser = user => dispatch(fetchUser(user));
  const user = useSelector((state) => state.user);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() =>{
    setTimeout(() => {
    if(user.error === 'invalid'){
      NotificationManager.warning('Incorrect password or email ', 'failed', 2000);
    }
    }, 2000);
  }, [JSON.stringify(user)])

  user.loggedIn === true ? props.history.push('/') : console.log('cool')
  const gridStyle = { display: 'flex', alignItems:'center', justifyContent: 'center' }
    const paperStyle = { marginTop: '50px', marginBottom: '50px', background: 'transparent', padding: 20, height: '70vh', width: 280, borderRadius: '20px'}
    const avatarStyle = { backgroundColor: '#264e0cf5' }
    const textMargin = { marginTop: '20px', fontWeight:'bold', borderRadius: '10px'}
    const inputMargin = { marginTop: '5px', color: 'white', fontWeight:'bold'}

    const btnStyle = { margin: '8px 0'}
    return (
    <div className='loginBackground'>
    <div style={gridStyle}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          addUser(values);
        }}
      >
        {(formikProps) => (
          <Grid>
          <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
                <Avatar style={ avatarStyle }><LockOutlinedIcon /></Avatar>
                <h2 style={{color: '#ffffff', marginTop: '10px'}}>Log In</h2>
              </Grid>
          <form onSubmit={formikProps.handleSubmit} style={{ textAlign: 'center'}}>
            <TextField
              className={classes.font}
              placeholder="enter email"
              onChange={formikProps.handleChange("email")}
              value={formikProps.values.email}
              type='email'
              label='Email'
              fullWidth
              required
              className='inputText'
              style={textMargin}
              InputLabelProps={{
      style: { color: '#ffffff'} 
   }}

   InputProps ={{
     style: {color: '#ffffff'}
   }}
             
              
              onBlur={formikProps.handleBlur('email')}
            />

            <p>{formikProps.touched.email && formikProps.errors.email}</p>

            <TextField
              placeholder="password 6 chars min"
              onChange={formikProps.handleChange("password")}
              value={formikProps.values.password}
              type={passwordShown ? "text" : "password"}
              label='Password'
              fullWidth
              required
              style={textMargin}
              InputLabelProps={{
      style: { color: '#ffffff', className: classes.font} 
   }}

   InputProps ={{
     style: {color: '#ffffff'}
   }}
              onBlur={formikProps.handleBlur('password')}
            />
            <i onClick={togglePasswordVisiblity} class="fas fa-eye"></i>

            <p>{formikProps.touched.password && formikProps.errors.password}</p>
            <Button type='submit' color='primary' style={btnStyle} variant='contained' fullWidth>Sign In</Button>
            <Typography style={inputMargin}> 
            Don't have an account?
            </Typography>

            <Typography style={inputMargin}> 
            <Link style={{ textDecoration: 'none', color: 'cyan', fontWeight:'bold'}} to="/signUp" color="inherit">SignUp</Link>
            </Typography>

          </form>
          <NotificationContainer />

          </Paper>
          </Grid>
        )}
      </Formik>
    </div>
    </div>
  );
}

export default Login