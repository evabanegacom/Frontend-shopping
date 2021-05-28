import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';
import { Formik } from "formik";
import * as yup from 'yup';
import { fetchUser } from '../actions/actions';

const reviewSchema = yup.object().shape({
  email: yup.string().required().min(5),
  password: yup.string().required().min(6),
})

function Login(props ) {
  const dispatch = useDispatch();
  const addUser = user => dispatch(fetchUser(user));
    return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          addUser(values);
          actions.resetForm();
          props.history.push('/')
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <input
              placeholder="enter email"
              onChange={formikProps.handleChange("email")}
              value={formikProps.values.email}
              type='text'
              onBlur={formikProps.handleBlur('email')}
            />

            <p>{formikProps.touched.email && formikProps.errors.email}</p>

            <input
              placeholder="password 6 chars min"
              onChange={formikProps.handleChange("password")}
              value={formikProps.values.password}
              type='password'
              onBlur={formikProps.handleBlur('password')}

            />

            <p>{formikProps.touched.password && formikProps.errors.password}</p>

            <button type='submit' onClick={formikProps.handleSubmit}>SignUp</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login