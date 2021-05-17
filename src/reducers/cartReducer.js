const cartReducer = (state = [], action) => {
    if (action.type === 'ADD_PRODUCT') {
      const exists = state.find(product => product.id === action.product.id)
      if(exists){
          return state.map((item => item.id === action.product.id ? {...exists, qty: exists.qty + 1} : item))
      } else {
        return [...state, {...action.product, qty: 1}]
      }
    }
    if (action.type === 'REMOVE_PRODUCT') {
      const newBooks = state.filter(book => book.id !== action.book.id);
      return newBooks;
    }
    return state;
  };
  
  export default cartReducer;