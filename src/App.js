import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import * as actions from './actions/index';

import './App.css';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App" id="javee">
      <Helmet>
        <meta charSet="utf-8" />
        {/* <title>Javee Attendance</title> */}
        <meta name="description" content="Javee Attendance" />
      </Helmet>

      <div className="App-intro">
        <Routes />
      </div>
    </div>
    );
  }
}

export default withRouter(connect(
  dispatch => bindActionCreators({
    ...actions,
  }, dispatch),
)(App));
