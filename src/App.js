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
import dashboardTheme from './components/ProtectedRoute/dashboard-theme.js';


import './App.css';

const App = () => {

{/* change isSignedIn to false after development */}

 const [isSignedIn, setIsSignedIn] = useState(true);

 const [userProfile, setUserProfile] = useState({
   name: '',
   email: '' 
 });


  return (
  <Router> 
   <Switch> 

      <Route exact path='/' component={Home}/> 

      <React.Fragment>

        <ThemeProvider theme={dashboardTheme}>

           <ProtectedRoute component={Dashboard} userProfile={userProfile} isSignedIn={isSignedIn} path='/dashboard'/> 

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

         </ThemeProvider>

       </React.Fragment>

    </Switch>
  </Router>
 );
}

export default App;
