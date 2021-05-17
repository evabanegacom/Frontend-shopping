import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './components/routes';
import Header from './cart/header';

const Login = lazy(() => import('./components/login'));
const SignUp = lazy(() => import('./components/signUp'));
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
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.SIGNUP} component={SignUp} />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path="/ejovial" component={AddProduct} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/cart" component={Basket} />
      </Switch>
    </Suspense>
    </Router>
  );
}

export default App;
