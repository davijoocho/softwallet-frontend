import React, {useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';




 
const ProtectedRoute = ({component: Component, isSignedIn, signIn, userProfile, ...rest}) => {

    useEffect(()=> {
        console.log(isSignedIn);
    })

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
           <Route {...rest} render={props => (
            isSignedIn === true ?
            <Component {...props} transactionList={transactionList} signIn={signIn}/> :
            <Redirect to='/signin'/>
         )}/>
        
    );
}

export default ProtectedRoute;