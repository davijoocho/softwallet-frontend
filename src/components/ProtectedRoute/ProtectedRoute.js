import React from 'react';
import {Route, Redirect} from 'react-router-dom';


 
const ProtectedRoute = ({component: Component, isSignedIn, ...rest}) => {

   

    return( 
        <Route {...rest} render={props => (
            isSignedIn === true ?
            <Component {...props}/> :
             <Redirect to='/signin'/>
               )}/>
    );
}

export default ProtectedRoute;