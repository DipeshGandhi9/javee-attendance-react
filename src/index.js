import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux'
import { Frontload } from 'react-frontload';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';
import DashBoard from './pages/DashBoard';
import Attendance from './pages/Attendance';
import Calendar from './pages/Calendar';
import createStore from './store/config';
import Employee from './pages/Employee';
import EmployeeList from './pages/EmployeeList';
import User from './pages/User';
import UserList from './pages/UserList';
import OrganizationList from './pages/OrganizationList';
import Organization from './pages/Organization';

const { store, history } = createStore();
const Application = (
  <ReduxProvider store={store}>
    <Router history={history}>
      <Frontload noServerRender={false}>
        <Switch>
          <Route exact path="/" component={App}></Route>
          <Route path="/employee" component={Employee}></Route>
          <Route path="/employeelist" component={EmployeeList}></Route>
          <Route path="/attendance" component={Attendance}></Route>
          <Route path="/calendar" component={Calendar}></Route>
          <Route path="/dashboard" component={DashBoard}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/userlist" component={UserList}></Route>
          <Route path="/organizationlist" component={OrganizationList}></Route>
          <Route path="/organization" component={Organization}></Route>
        </Switch>
      </Frontload>
    </Router>
  </ReduxProvider>
);

const root = document.querySelector('#root');
if (root.hasChildNodes()) {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(Application, root);
  });
} else {
  ReactDOM.render(Application, root)
}
