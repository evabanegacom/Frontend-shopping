import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducer';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer'
import orderReducer from './orderReducer';
import userOrderReducer from './userOrderReducer';
import allUserReducer from './allUsersReducer';
import reviewReducer from './reviewReducer'

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  userOrders: userOrderReducer,
  customers: allUserReducer,
  reviews: reviewReducer,
});

export default rootReducer;