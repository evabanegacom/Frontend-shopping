const initialState = {
    products: [],
    error: null,
    waiting: 'wait for it',
  };
  
  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return {
          ...state,
          waiting: 'here we are',
          products: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default productsReducer;