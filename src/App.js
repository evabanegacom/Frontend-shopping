import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './cart/header';

const Login = lazy(() => import('./components/login'));
const SignUp = lazy(() => import('./components/signUp'));
const Order = lazy(() => import('./components/order'));
const Home = lazy(() => import('./containers/Home'));
const AddProduct = lazy(() => import('./containers/addProduct'));
const Products = lazy(() => import('./containers/products'));
const Basket = lazy(() => import('./cart/basket'));

function App() {
  return (
    <Router>
     <Suspense fallback={<p>...Loading</p>}>
     <Header />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signUp' component={SignUp} />
        <Route exact path="/" component={Home} />
        <Route exact path="/ejovial" component={AddProduct} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/cart" component={Basket} />
        <Route exact path="/users/:id/orders" component={Order} />
      </Switch>
    </Suspense>
    </Router>
  );
}

export default App;
