import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './cart/header';
import Footer from './components/footer';
import { ThemeProvider } from '@material-ui/core'
import theme from './utils/theme';
import Loading from './components/loader';

const Login = lazy(() => import('./components/login'));
const SignUp = lazy(() => import('./components/signUp'));
const Order = lazy(() => import('./components/order'));
const Home = lazy(() => import('./containers/Home'));
const AddProduct = lazy(() => import('./containers/addProduct'));
const Products = lazy(() => import('./containers/products'));
const Basket = lazy(() => import('./cart/basket'));
const Customers = lazy(() => import('./containers/customers'));

function App() {
  return (
    <Router>
     <Suspense fallback={<Loading />}>
     <ThemeProvider theme={theme}>
     <Header />
     </ThemeProvider>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signUp' component={SignUp} />
        <Route exact path="/" component={Home} />
        <Route exact path="/ejovial" component={AddProduct} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/cart" component={Basket} />
        <Route exact path="/users/:id/orders" component={Order} />
        <Route exact path="/customers" component={Customers} />
      </Switch>
      <Footer />
    </Suspense>
    </Router>
  );
}

export default App;
