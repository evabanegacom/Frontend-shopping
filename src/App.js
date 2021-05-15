import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './components/routes';
import Products from './containers/products'

const Login = lazy(() => import('./components/login'));
const SignUp = lazy(() => import('./components/signUp'));
const Home = lazy(() => import('./containers/Home'));
// const AdminProduct = lazy(() => import('./containers/adminProduct'));

function App() {
  return (
    <Router>
     <Suspense fallback={<p>...Loading</p>}>
      <Switch>
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.SIGNUP} component={SignUp} />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path="/ejovial" component={Products} />
      </Switch>
    </Suspense>
    </Router>
  );
}

export default App;
