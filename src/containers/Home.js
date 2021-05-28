import React, { useEffect, useState } from "react";
import { logout, autoLogin } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Home = () => {
    const dispatch = useDispatch();
    const handleLogout = () =>{
        dispatch(logout())
      }
      const user = useSelector((state) => state.user);

      useEffect(() => {
        dispatch(autoLogin());
      }, [JSON.stringify(user)]);


    const gridStyle = { height: '100vh', display: 'flex', alignItems:'center', justifyContent: 'center' }
    const paperStyle = { background: 'transparent', padding: 20, height: '70vh', width: 280, borderRadius: '20px'}
    const avatarStyle = { backgroundColor: '#264e0cf5' }
    const btnStyle = { margin: '8px 0'}
    return (
        <div style={gridStyle}>
        {user.loggedIn !== false ? (<p>{user.user.name} {user.user.email}</p>) : (<p>nobody is here</p>)}
        <button onClick={handleLogout}>logout</button>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
              <Grid align='center'>
                <Avatar style={ avatarStyle }><LockOutlinedIcon /></Avatar>
                <h2>Log In</h2>
              </Grid>
              <TextField label='Email' placeholder='Enter your Email' fullWidth required />
              <TextField label='Password' placeholder='Enter your Password' type='password' fullWidth required />
      <FormControlLabel control={<Checkbox color='primary'/>} label="Remember me" />
      <Button type='submit' color='primary' style={btnStyle} variant='contained' fullWidth>Sign In</Button>
      <Typography> Do you have an account?
      <Link href="#" color="inherit">
  {'Signup'}
</Link>
      </Typography>
            </Paper>
        </Grid>
        </div>
    )
}

export default Home
