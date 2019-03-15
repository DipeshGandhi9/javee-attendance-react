import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';


const Login = Loadable({
  loader: () => import('../pages/Login'),
  loading: () => null,
  modules: ['../pages']
});

export default () => (
  <Switch>
    <Route exact path="/" component={Login} />
  </Switch>
);