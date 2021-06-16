import axios from 'axios';

// User Creation

const setUser = data => ({
    type: "SET_USER",
    payload: data,
  });
  
  export const logout = () => ({ type: "LOG_OUT" });
  
  export const signUserUp = (userInfo) => async (dispatch) => {
    await fetch("https://neptune-spear.herokuapp.com/api/v1/users", {
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
    await fetch("https://neptune-spear.herokuapp.com/api/v1/login", {
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
      })
      .catch((error) =>{
        console.log(error)
        dispatch(setUser(error))
      })
  };


// Fetch logged in user
export const autoLogin = () => async dispatch => {
  await fetch('https://neptune-spear.herokuapp.com/api/v1/auto_login', {
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

export const postProduct = productInfo => async dispatch => {
  await axios.post('https://neptune-spear.herokuapp.com/api/v1/products', productInfo, {
    headers: {
      'content-type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
    .then((data) =>{
      dispatch(setProducts(data))
    }
    );
};

// GET ALL PRODUCTS

const setProducts = data => ({
  type: "SET_PRODUCTS",
  payload: data,
});

export const getProducts = () => async dispatch => {
  await fetch('https://neptune-spear.herokuapp.com/api/v1/products', {
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

// DELETE PRODUCT

export const deleteProduct = id => async dispatch => {
  await axios.delete(`https://neptune-spear.herokuapp.com/api/v1/products/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((data) => {
      dispatch(setProducts(data))
    }
    );
};

// CART ACTIVITIES

export const addToCart = (product) => (dispatch, getState) => {
  const cartItem = getState().cart.cartItems.slice()
  let alreadyInCart = false
  cartItem.forEach((x) => {
    if(x.id === product.id){
      alreadyInCart = true;
      x.count++;
    }
  })
  if(!alreadyInCart){
    cartItem.push({...product, count: 1})
  }
  dispatch({
    type: 'ADD_TO_CART',
    payload: { cartItem },
  })
  localStorage.setItem("cartItems", JSON.stringify(cartItem))
}

export const removeFromCart = product => (dispatch, getState) => {
  const cartItem = getState().cart.cartItems.slice().filter(x=> x.id !== product.id)  
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: { cartItem },
  })
  localStorage.setItem('cartItems', JSON.stringify(cartItem))
}

export const addOne = (product) => (dispatch, getState) => {
  const cartItem = getState().cart.cartItems.slice()
  let alreadyInCart = false
  cartItem.forEach((x) => {
    if(x.id === product.id){
      x.count++;
      alreadyInCart = true;
    }
  })
  dispatch({
    type: 'ADD_TO_CART',
    payload: { cartItem },
  })
  localStorage.setItem("cartItems", JSON.stringify(cartItem))
}

export const removeOne = (product) => (dispatch, getState) => {
  const cartItem = getState().cart.cartItems.slice()
  let alreadyInCart = true
  cartItem.forEach((x) => {
    if(x.id === product.id && x.count !=1){
      x.count--;
      alreadyInCart = true;
    }
  })
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: { cartItem },
  })
  localStorage.setItem("cartItems", JSON.stringify(cartItem))
}

// ORDERS

export const createOrder = data => ({
  type: "CREATE_ORDER",
  payload: { data },
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const clearOrder = () => dispatch => {
  dispatch({ type: 'CLEAR_ORDER'})
}

export const postOrder = productInfo => async dispatch => {
  await axios.post('https://neptune-spear.herokuapp.com/api/v1/orders', productInfo, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
    .then(data => {
      dispatch(createOrder(data.data));
      localStorage.removeItem('cartItems')
      dispatch(clearCart())
    });
};

// USER'S ORDERS

const setOrders = data => ({
  type: 'SET_ORDERS',
  payload: data
})

export const getOrders = () => async dispatch => {
  await fetch('https://neptune-spear.herokuapp.com/api/v1/orders', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      dispatch(setOrders(data));
    });
};

// DELETE ORDER

const removeOrder = (data) => ({
  type: 'REMOVE_ORDER',
  payload: data
});

export const deleteOrder = id => async dispatch => {
  await axios.delete(`https://neptune-spear.herokuapp.com/api/v1/orders/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((data) => {
      dispatch(removeOrder(data))
    }
    );
};
