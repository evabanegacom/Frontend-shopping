const initState = {
  cartItems: []
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
      
      default:
        return state
    }
  };
  
  export default cartReducer;