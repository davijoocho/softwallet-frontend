import React from 'react';
import {Route, Redirect} from 'react-router-dom';




 
const ProtectedRoute = ({component: Component, isSignedIn, signIn, userProfile, ...rest}) => {

    return( 
           <Route {...rest} render={props => (
            isSignedIn === true ?
            <Component {...props} 
            signIn={signIn}
            isSignedIn={isSignedIn}
            userProfile={userProfile}/> :
            <Redirect to='/signin'/>
         )}/>
        
    );
}

export default ProtectedRoute;