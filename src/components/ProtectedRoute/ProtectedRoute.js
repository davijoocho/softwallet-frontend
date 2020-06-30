import React from 'react';
import {Route, Redirect} from 'react-router-dom';


 
const ProtectedRoute = ({component: Component, isSignedIn, userProfile, ...rest}) => {

   

    return( 
        <Route {...rest} render={props => (
            isSignedIn === true ?
            <Component userProfile={userProfile} {...props}/> :
             <Redirect to='/signin'/>
               )}/>
    );
}

export default ProtectedRoute;