import React, { useState } from 'react';
import './contact.css';
import emailjs from 'emailjs-com';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import { Formik } from "formik";
import * as yup from 'yup';
import 'react-notifications/lib/notifications.css';
import {
   NotificationContainer,
   NotificationManager,
 } from 'react-notifications';

const reviewSchema = yup.object().shape({
  name: yup.string().required().min(4),
  email: yup.string().required().min(5),
  phone: yup.string().required().min(11),
  message: yup.string().required().min(6),
})

const Contact = () => {

  const sendEmail = (values) => {
    
    emailjs.send('service_ey6p9rp', 'template_l5uaqhh', values, 'user_p6RgQH7YhWPsKwWBkmYPP')
      .then(result => {
        console.log(result.text);
      }, error => {
        console.log(error.text);
      });

  }

    return (
        <div className='contactPage'>
          <div style={{ textAlign: 'center', marginTop: '20px'}}><p>For inquiries, complaints and cancellation of orders, contact us through any of the options below</p></div>
          <div className='contactDiv'>
      <Formik
        initialValues={{ name: "", email: "", message: "", phone: '' }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          console.log(values)
          sendEmail(values)
          NotificationManager.success('We will respond shortly', 'Message sent!', 5000);
          actions.resetForm();
        }}
      >
        {(formikProps) => (
          <Paper className='formiks' elevation={10}>
          <h4>Send a message</h4>
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

            <TextField
              placeholder="Phone Number"
              onChange={formikProps.handleChange("phone")}
              value={formikProps.values.phone}
              onBlur={formikProps.handleBlur('phone')}
              type='text'
              label='Phone number'
              fullWidth
              required
              
            />

            <p>{formikProps.touched.phone && formikProps.errors.phone}</p>

            <TextField
              placeholder="message 20 chars min"
              onChange={formikProps.handleChange("message")}
              value={formikProps.values.message}
              onBlur={formikProps.handleBlur('message')}
              type='text'
              label='message'
              required
              fullWidth
              multiline
          

            />

            <p>{formikProps.touched.message && formikProps.errors.message}</p>
            
            <Button className='contactButton' type='submit' fullWidth onClick={formikProps.handleSubmit}>Contact Us</Button>
          </form>
          <NotificationContainer /> 

          </Paper>
        )}
      </Formik>
    </div>
    <div style={{ textAlign: 'center', marginTop: '20px', fontWeight: 700}}><p>Address</p></div>
    <div style={{ textAlign: 'center', marginTop: '10px', lineHeight: '30px'}}>
      <p>State: Lagos</p>
      <p>City: Amuwo-Odofin</p>
      <p>Zip/Postal - 102262</p>
      <p>Street: lawal street</p>
    </div>

    <div style={{ textAlign: 'center', marginTop: '20px', fontWeight: 700}}><p>Email Us</p></div>
    <div style={{ textAlign: 'center', marginTop: '10px'}}>
    <a style={{textDecoration: 'none', color: 'black', cursor:'pointer', fontSize: '18px'}} href="mailto:udegbue69@gmail.com">udegbue69@gmail.com</a>
    </div>
    <div style={{ textAlign: 'center', marginTop: '20px', fontWeight: 700}}><p>Social Handles</p></div>
    <div className='socialHandles'>
        <p>Facebook&nbsp; &nbsp;<a href='https://facebook.com/ejovi.akpono'><i style={{ color: 'blue'}} class="fab fa-facebook"></i></a></p>
        <p>LinkedIn &nbsp; &nbsp;<a href='https://www.linkedin.com/in/precious-udegbue/'><i style={{ color: 'blue'}} class="fab fa-linkedin"></i></a></p>
        <p>Whatsapp &nbsp;+2348064129038</p>
        <p>Instagram &nbsp; &nbsp;<a href='https://instagram.com/ejovial_concepts'><i id='insta' class="fab fa-instagram"></i></a></p>
    </div>
        </div>
    )
}

export default Contact
