import React from 'react';
import './contact.css';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import { Formik } from "formik";
import * as yup from 'yup';

const Contact = () => {

    const reviewSchema = yup.object().shape({
        name: yup.string().required().min(4),
        email: yup.string().required().min(5),
        phone: yup.string().required().min(11),
        message: yup.string().required().min(6),
      })
    return (
        <div className='contactPage'>
          <div style={{ textAlign: 'center', marginTop: '20px'}}><p>For inquiries, complaints and orders cancellation contact us through any of the options below</p></div>
          <div className='contactDiv'>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          console.log(values)
          actions.resetForm();
        }}
      >
        {(formikProps) => (
          <Paper className='formik' elevation={10}>
            <h2>Contact</h2>
          <div>Send us a message</div>
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
            
            <Button className='signUpButton' type='submit' fullWidth onClick={formikProps.handleSubmit}>Contact Us</Button>
          </form>
          </Paper>
        )}
      </Formik>
    </div>
    <p>email</p>
        </div>
    )
}

export default Contact
