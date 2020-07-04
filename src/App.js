import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home.js';
import SignUp from './components/SignUp/SignUp.js';
import SignIn from './components/SignIn/SignIn.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js';
import {ThemeProvider} from '@material-ui/core/styles';
import signUpTheme from './components/SignUp/signup-theme';
import signInTheme from './components/SignIn/signin-theme';
import dashboardTheme from './components/Dashboard/dashboard-theme.js';


import './App.css';

const App = () => {

  {/* Change isSignedIn to false after development */}

 const [isSignedIn, setIsSignedIn] = useState(true);

 const [userProfile, setUserProfile] = useState({
   name: '',
   email: '' 
 });

 useEffect(() => {
   console.log(isSignedIn);
 }, [isSignedIn])



  return (
  <Router> 
   <Switch> 

      <Route exact path='/' component={Home}/> 

<React.Fragment>

      <ThemeProvider theme={dashboardTheme}>
      <ProtectedRoute component={Dashboard} userProfile={userProfile} isSignedIn={isSignedIn} signIn={setIsSignedIn} path='/dashboard'/> 

       <ThemeProvider theme={signInTheme}> 
       <Route 
        exact path='/signin' 
        render={props => (<SignIn {...props} setUserProfile={setUserProfile} signIn={setIsSignedIn} />)}/>

       <ThemeProvider theme={signUpTheme}>
        <Route 
         exact path='/signup' 
         render={props => (<SignUp {...props} setUserProfile={setUserProfile} signIn={setIsSignedIn} />)}/>

      </ThemeProvider>
      </ThemeProvider>
      </ThemeProvider>
  </React.Fragment>

    </Switch>
  </Router>
 );
}

export default App;
