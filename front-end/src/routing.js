import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import RouteDispatcher from './managers/RouteChange.Manager';

function Routes(props) {
  return (<Router onChange={RouteDispatcher.routeChange}>
    <App />
  </Router>);
} 

export default Routes;
