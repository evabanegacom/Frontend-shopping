import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducer';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;