const initialState = {
    orders: [],
    error: null,
    waiting: 'wait for it',
  };
  
  const userOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ORDERS':
        return {
          ...state,
          waiting: 'here we are',
        orders: action.payload,
        error: null
        };

        case 'REMOVE_ORDER':
          return {
            ...state
          }
  
      default:
        return state;
    }
  };
  
  export default userOrderReducer;