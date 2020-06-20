import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home.js';
import SignUp from './components/SignUp/SignUp.js';
import SignIn from './components/SignIn/SignIn.js'
import Dashboard from './components/Dashboard/Dashboard.js';

import './App.css';

const App = () => {
  return (
  <Router> 
   <Switch> 
       <Route exact path='/' component={Home}/> 
       <Route exact path='/signup' component={SignUp}/> 
       <Route exact path='/signin' component={SignIn}/> 
       <Route exact path='/dashboard' component={Dashboard}/> 
    </Switch>
  </Router>
  );
}

export default App;
