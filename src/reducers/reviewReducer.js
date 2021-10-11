const initialState = {
    review: [],
    error: null,
    waiting: 'wait for it',
  };
  
  const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'MAKE_REVIEW':
        return {
          ...state,
          review: action.payload,
          error: null,
          waiting: 'here we are',
        };
  
      default:
        return state;
    }
  };
  
  export default reviewReducer;