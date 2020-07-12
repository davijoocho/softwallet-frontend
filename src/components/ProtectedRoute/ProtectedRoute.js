import React from 'react';
import {Route, Redirect} from 'react-router-dom';




 
const ProtectedRoute = ({component: Component, isSignedIn, signIn, userProfile, setUserProfile, ...rest}) => {

    return( 
           <Route {...rest} render={props => (
            isSignedIn === true ?
            <Component {...props} 
            signIn={signIn}
            setUserProfile={setUserProfile}
            isSignedIn={isSignedIn}
            userProfile={userProfile}/> :
            <Redirect to='/signin'/>
         )}/>
    );
}

export default ProtectedRoute;