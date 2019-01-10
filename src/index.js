import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch}from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import User from './pages/User';
import DashBoard from './pages/DashBoard';
import History from './pages/History';
import Login from './pages/Login';
import UserList from './pages/UserList';

ReactDOM.render(
<Router>
    <Switch>
        <Route exact path="/" component={App}></Route>  
        <Route path="/dashboard"  component={DashBoard}></Route>
        <Route path="/user" component={User}></Route>
        <Route path= "/history" component={History}></Route>
        <Route path="/" component={Login}></Route>
        <Route path="/userlist" component={UserList}></Route>
    </Switch>
</Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
