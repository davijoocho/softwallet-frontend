import React,{useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home.js';
import SignUp from './components/SignUp/SignUp.js';
import SignIn from './components/SignIn/SignIn.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js';
import {ThemeProvider} from '@material-ui/core/styles';
import signUpTheme from './components/SignUp/signup-theme';
import signInTheme from './components/SignIn/signin-theme';


import './App.css';

const App = () => {

 const [isSignedIn, setIsSignedIn] = useState(false);

 const [userProfile, setUserProfile] = useState({
   name: '',
   email: '' 
 });


  return (
  <Router> 
   <Switch> 

      <Route exact path='/' component={Home}/> 
      <ProtectedRoute component={Dashboard} userProfile={userProfile} isSignedIn={isSignedIn} path='/dashboard'/> 

      <React.Fragment>
       <ThemeProvider theme={signUpTheme}> 
  
          <Route 
           exact path='/signup' 
           render={props => (<SignUp {...props} setUserProfile={setUserProfile} signIn={setIsSignedIn} />)}/>

        <ThemeProvider theme={signInTheme}>

          <Route 
          exact path='/signin' 
          render={props => (<SignIn {...props} setUserProfile={setUserProfile} signIn={setIsSignedIn} />)}/>
        
        </ThemeProvider>

        </ThemeProvider>
       </React.Fragment>

    </Switch>
  </Router>
 );
}

export default App;
