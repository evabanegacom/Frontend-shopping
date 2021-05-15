const initialState = {
    product: [],
    error: null,
    waiting: 'wait for it',
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PRODUCT':
        return {
          ...state,
          waiting: 'here we are',
          product: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default productReducer;