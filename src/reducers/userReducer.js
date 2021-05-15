const initialState = {
    loggedIn: false,
    user: {},
    error: null,
  };
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          loggedIn: action.payload.loggedIn,
          user: { ...action.payload.user },
          error: action.payload.error,
        };
  
      case 'LOG_OUT':
        localStorage.clear();
        return {
          ...state,
          loggedIn: false,
          user: {},
        };
      default:
        return state;
    }
  };
  
  export default userReducer;