import axios from 'axios';

// User Creation

const setUser = data => ({
    type: "SET_USER",
    payload: data,
  });
  
  export const logout = () => ({ type: "LOG_OUT" });
  
  export const signUserUp = (userInfo) => async (dispatch) => {
    await fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", (data.token));
        dispatch(setUser(data));
      });
  };

  // User Authentication

export const fetchUser = (userInfo) => async (dispatch) => {
    await fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", (data.token));
        dispatch(setUser(data));
      });
  };


// Fetch logged in user
export const autoLogin = () => async dispatch => {
  await fetch('http://localhost:3001/api/v1/auto_login', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      dispatch(setUser(data));
    });
};

// CReating A form for the products

const setProduct = data => ({
  type: "SET_PRODUCT",
  payload: data,
});

// export const postProduct = productInfo => async dispatch => {
//   await fetch('http://localhost:3001/api/v1/products', {
//     method: 'POST',
//     headers: {
//       'content-type': 'multipart/form-data',
//       Accept: 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//     body: JSON.stringify(productInfo),
//   })
//     .then(res => res.json())
//     .then(data => {
//       dispatch(setProduct(data));
//     });
// };

export const postProduct = productInfo => async dispatch => {
  await axios.post('http://localhost:3001/api/v1/products', productInfo, {
    headers: {
      'content-type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
    .then(data => {
      dispatch(setProduct(data));
    });
};

// GET ALL PRODUCTS

const setProducts = data => ({
  type: "SET_PRODUCTS",
  payload: data,
});

export const getProducts = () => async dispatch => {
  await fetch('http://localhost:3001/api/v1/products', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      dispatch(setProducts(data));
    });
};

// CART ACTIVITIES

export const addToCart = product => ({
  type: 'ADD_PRODUCT',
  product,
});

export const removeFromCart = product => ({
  type: 'REMOVE_PRODUCT',
  product,
});