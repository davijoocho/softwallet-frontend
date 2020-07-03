import React, {useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Summary from '../Summary/Summary.js';
import Income from '../Income/Income.js';
import Assets from '../Assets/Assets.js';
import Liabilities from '../Liabilities/Liabilities.js';
import Expenses from '../Expenses/Expenses.js';
import {CssBaseline, AppBar, Typography} from '@material-ui/core';
import './dashboard.css';


 
const ProtectedRoute = ({component: Component, isSignedIn, userProfile, ...rest}) => {

   const [transactionList, setTransactionList] = useState([
    {
        id: 1,
        date: '07-02-2020',
        transaction_name: 'Job',
        transaction_type: 'Income',
        description: 'paycheck from work',
        amount: 100023
    },
    {
        id: 2,
        date: '07-02-2020',
        transaction_name: 'Groceries',
        transaction_type: 'Expenses',
        description: 'Egg, Milk, Cereal, Bread',
        amount: -10
    },
    {
        id: 3,
        date: '07-02-2020',
        transaction_name: 'Student Loan',
        transaction_type: 'Liabilities',
        description: 'Debt from Student Loan at XYZ University',
        amount: -100233
    },
    {
        id: 4,
        date: '07-02-2020',
        transaction_name: 'Property 2',
        transaction_type: 'Assets',
        description: 'Value of Property 2',
        amount: 1003232
    },
    {
        id: 5,
        date: '07-02-2020',
        transaction_name: 'Property 1',
        transaction_type: 'Assets',
        description: 'Value of Property 1',
        amount: 100112
    },
    {
        id:6,
        date: '07-02-2020',
        transaction_name: 'Stocks',
        transaction_type: 'Assets',
        description: 'Value of Stocks',
        amount: 100000
    },
    {
        id:7,
        date: '07-02-2020',
        transaction_name: 'Job',
        transaction_type: 'Income',
        description: 'paycheck from work',
        amount: 10002
    },
    {
        id:8,
        date: '07-02-2020',
        transaction_name: 'Job',
        transaction_type: 'Income',
        description: 'paycheck from work',
        amount: 10004
    },
    {
        id:9,
        date: '07-02-2020',
        transaction_name: 'Job',
        transaction_type: 'Income',
        description: 'paycheck from work',
        amount: 1002
    },
    {
        id:10,
        date: '07-02-2020',
        transaction_name: 'Job',
        transaction_type: 'Income',
        description: 'paycheck from work',
        amount: 1000
    },
    {
        id:11,
        date: '07-02-2020',
        transaction_name: 'Job',
        transaction_type: 'Income',
        description: 'paycheck from work',
        amount: 10003
    },
    {
        id:12,
        date: '07-02-2020',
        transaction_name: 'Job',
        transaction_type: 'Income',
        description: 'paycheck from work',
        amount: 10002
    },
    {
        id:13,
        date: '07-02-2020',
        transaction_name: 'Job',
        transaction_type: 'Income',
        description: 'paycheck from work',
        amount: 10001
    }
   ]);

    return( 
        <div className='dashboard-root'>
        <CssBaseline/>

        <nav className='app-bar'>
         <AppBar position='fixed'>
           <Typography variant='h4'>Dashboard</Typography>
         </AppBar>
        </nav>

        <div className='content-page-container'>

        <div className='dashboard-drawer'>
        <Route {...rest} render={props => (
            isSignedIn === true ?
            <Component {...props}/> :
            <Redirect to='/signin'/>
         )}/>
         </div>
        
        <main className='content-page'>
        <Route exact path='/dashboard' render={props => (<Summary {...props} transactionList={transactionList}/>)}/>
        <Route exact path='/dashboard/income' render={props => (<Income {...props} transactionList={transactionList}/>)}/>
        <Route exact path='/dashboard/assets' render={props => (<Assets {...props} transactionList={transactionList}/>)}/>
        <Route exact path='/dashboard/liabilities' render={props => (<Liabilities {...props} transactionList={transactionList}/>)}/>
        <Route exact path='/dashboard/expenses' render={props => (<Expenses {...props} transactionList={transactionList}/>)}/>
        </main> 

        </div>

        </div>
    );
}

export default ProtectedRoute;