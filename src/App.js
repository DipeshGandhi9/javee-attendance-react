import React, { Component } from 'react';
import { Helmet } from "react-helmet";

import './App.css';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Javee Attendance</title>
        <meta name="description" content="Javee Attendance" />
      </Helmet>

      <div className="App-intro">
        <Routes />
      </div>
    </div>
    );
  }
}

export default App;
