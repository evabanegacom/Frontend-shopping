const initState = {
  customers: [],
};

const allUsersReducer = (state=initState, action) => {
  switch (action.type) {
    case "ALL_USERS":
      return {
        customers: action.payload.data,
      };

    default:
      return state;
  }
};

export default allUsersReducer;
