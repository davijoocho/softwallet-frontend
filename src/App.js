import React,{useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home.js';
import SignUp from './components/SignUp/SignUp.js';
import SignIn from './components/SignIn/SignIn.js'
import Dashboard from './components/Dashboard/Dashboard.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js'

import './App.css';

const App = () => {




 const [isSignedIn, setIsSignedIn] = useState(false);

 const signIn = () => {
   setIsSignedIn(!isSignedIn);
 }




  return (
  <Router> 
   <Switch> 
       <Route exact path='/' component={Home}/> 
       <Route exact path='/signup' render={props => (<SignUp {...props} signIn={signIn}/>)}/>
       <Route exact path='/signin' component={SignIn}/> 
       <ProtectedRoute component={Dashboard} isSignedIn={isSignedIn} path='/dashboard'/> 
    </Switch>
  </Router>
  );
}

export default App;
