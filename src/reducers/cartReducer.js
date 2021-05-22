const initState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
  }


const cartReducer = (state=initState, action) => {
    switch(action.type){
      case 'ADD_TO_CART':
        return {
          cartItems: action.payload.cartItem
        }

      case 'REMOVE_FROM_CART':
        return {
          cartItems: action.payload.cartItem
        }

      case 'CLEAR_CART':
        return {
          cartItems: []
        }
      
      default:
        return state
    }
  };
  
  export default cartReducer;