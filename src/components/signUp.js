import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Formik } from "formik";
import * as yup from 'yup';
import { signUserUp } from '../actions/actions';


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
  const dispatch = useDispatch();
  const addUser = user => dispatch(signUserUp(user));
  const user = useSelector((state) => state.user);
  user.loggedIn === true ? props.history.push('/') : console.log('cool')
  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", password: "", password_confirmation: '' }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          addUser(values);
          console.log(values)
          actions.resetForm();
          props.history.push('/')

        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <input
              placeholder="Your Name"
              onChange={formikProps.handleChange("name")}
              value={formikProps.values.name}
              onBlur={formikProps.handleBlur('name')}
            />

            <p>{formikProps.touched.name && formikProps.errors.name}</p>

            <input
              placeholder="enter email"
              onChange={formikProps.handleChange("email")}
              value={formikProps.values.email}
              onBlur={formikProps.handleBlur('email')}
            />

            <p>{formikProps.touched.email && formikProps.errors.email}</p>

            <input
              placeholder="password 6 chars min"
              onChange={formikProps.handleChange("password")}
              value={formikProps.values.password}
              onBlur={formikProps.handleBlur('password')}

            />

            <p>{formikProps.touched.password && formikProps.errors.password}</p>
<input
              placeholder="password 6 chars min"
              onChange={formikProps.handleChange("password_confirmation")}
              value={formikProps.values.password_confirmation}
              onBlur={formikProps.handleBlur('password_confirmation')}

            />
            <p>{formikProps.touched.password_confirmation && formikProps.errors.password_confirmation}</p>

            <button type='submit' onClick={formikProps.handleSubmit}>SignUp</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

