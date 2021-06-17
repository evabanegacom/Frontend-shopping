const initState = {
  customers: [],
};

const allUsersReducer = (state=initState, action) => {
  switch (action.type) {
    case "ALL_USERS":
      return {
        ...state,
        customers: action.payload,
      };

    default:
      return state;
  }
};

export default allUsersReducer;
