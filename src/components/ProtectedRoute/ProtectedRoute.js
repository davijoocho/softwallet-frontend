import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Summary from '../Summary/Summary.js';
import Income from '../Income/Income.js';
import Assets from '../Assets/Assets.js';
import Liabilities from '../Liabilities/Liabilities.js';
import Expenses from '../Expenses/Expenses.js';


 
const ProtectedRoute = ({component: Component, isSignedIn, userProfile, ...rest}) => {

   

    return( 
        <div>
        <Route {...rest} render={props => (
            isSignedIn === true ?
            <Component {...props}/> :
            <Redirect to='/signin'/>
         )}/>
        
        <Route exact path='/dashboard' render={props => (<Summary {...props}/>)}/>
        <Route exact path='/dashboard/income' render={props => (<Income {...props}/>)}/>
        <Route exact path='/dashboard/assets' render={props => (<Assets {...props}/>)}/>
        <Route exact path='/dashboard/liabilities' render={props => (<Liabilities {...props}/>)}/>
        <Route exact path='/dashboard/expenses' render={props => (<Expenses {...props}/>)}/>
        </div>
    );
}

export default ProtectedRoute;