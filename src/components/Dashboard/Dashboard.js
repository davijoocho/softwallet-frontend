import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, AppBar, Typography, Button} from '@material-ui/core';
import {AccountBalance, AttachMoney, HomeWork, CreditCard, AccountBalanceWallet} from '@material-ui/icons';
import {PlaidLink} from 'react-plaid-link';
import Summary from '../Summary/Summary.js';
import Income from '../Income/Income.js';
import Assets from '../Assets/Assets.js';
import Liabilities from '../Liabilities/Liabilities.js';
import Expenses from '../Expenses/Expenses.js';
import './dashboard.css';
require('dotenv').config()




const Dashboard = ({history, signIn, userProfile, setUserProfile}) => {

    const [selectedTab, setSelectedTab] = useState('Summary');
    const [transactionList, setTransactionList] = useState([]);

    useEffect(() => {
        console.log(transactionList)
    })

    useEffect(() => {
        const {email} = userProfile;

        const getTransactionList = async() => {
            try{
            let response = await fetch(`http://localhost:3000/dashboard?user=${email}`, {
               method: 'get',
               headers: {'Content-Type': 'application/json'}
            })

            let resultingList = await response.json()
            setTransactionList(resultingList)

        } catch (err) {

         console.log(err)

    }}

    getTransactionList()

    }, [userProfile])

    const categoriesList = [
        {
            text: 'Summary',
            icon: <AccountBalance/>,
            onClick: () => {
                history.push('/dashboard')
                setSelectedTab('Summary')
            }
        },
        {
            text: 'Income',
            icon: <AttachMoney/>,
            onClick: () => {
                history.push('/dashboard/income')
                setSelectedTab('Income')
            }
        },
        {
            text: 'Assets',
            icon: <HomeWork/>,
            onClick: () => {
                history.push('/dashboard/assets')
                setSelectedTab('Assets')
            }
        },
        {
            text: 'Liabilities',
            icon: <CreditCard/>,
            onClick: () => {
                history.push('/dashboard/liabilities')
                setSelectedTab('Liabilities')
            }
        },
        {
            text: 'Expenses',
            icon: <AccountBalanceWallet/>,
            onClick: () => {
                history.push('/dashboard/expenses')
                setSelectedTab('Expenses')
            }
        }
    ]

    const handleOnSuccess = async (public_token, metadata) => {
        try {
            let response = await fetch('http://localhost:3000/get_access_token', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    public_token: public_token,
                    email: userProfile.email
                })
            })

            let postedBalance = await response.json()

            setTransactionList([...transactionList, {
                id: postedBalance.id,
                transaction_name: postedBalance.transaction_name, 
                transaction_type: postedBalance.transaction_type, 
                description: postedBalance.description,
                date: postedBalance.date,
                amount: postedBalance.amount
            }])

        } catch (err) {
            console.log(err)
        }
    }



    return (

            <div className='dashboard-root'>
            <CssBaseline/>

            <nav className='app-bar'>
            <AppBar position='fixed'>
            <Typography variant='h4'>Dashboard</Typography>
            <Button
                color='secondary'
                size='medium'
                variant='contained'
                onClick={() => {
                    signIn(false);
                    history.push('/signin');
                    setUserProfile({...userProfile,
                        name:'',
                        email:''
                    })
                  }}
            >
             Sign Out
            </Button>
            </AppBar>
            </nav>

            <div className='content-page-container'>
            <div className='dashboard-drawer'>
            <Drawer variant='permanent'>
            <List> 
                {
                   categoriesList.map(item => {

                    const {text, icon, onClick} = item;

                    return (
                        <ListItem selected={ text === selectedTab ? true : false } onClick={onClick} button={true} key={text}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    );
                })
                }

                <ListItem>
                <PlaidLink 
                clientName='SoftWallet'
                env='development'
                product={['auth']}
                publicKey='93c1157fad4ffb730b54df5c36ac83'
                onSuccess={handleOnSuccess}
                countryCodes={['US']}
                className='plaid-connect'
                >
                Link Your Bank Account
                </PlaidLink>
                </ListItem>

            </List>
            </Drawer>
            </div>

           <main className='content-page'>
           <Route exact path='/dashboard' render={props => (<Summary {...props} transactionList={transactionList}/>)}/>
           <Route exact path='/dashboard/income' render={props => (<Income {...props} transactionList={transactionList} 
           userProfile={userProfile} setTransactionList={setTransactionList}/>)}/>
           <Route exact path='/dashboard/assets' render={props => (<Assets {...props} transactionList={transactionList}
           userProfile={userProfile} setTransactionList={setTransactionList}/>)}/>
           <Route exact path='/dashboard/liabilities' render={props => (<Liabilities {...props} transactionList={transactionList}
           userProfile={userProfile} setTransactionList={setTransactionList}/>)}/>
           <Route exact path='/dashboard/expenses' render={props => (<Expenses {...props} transactionList={transactionList}
           userProfile={userProfile} setTransactionList={setTransactionList}/>)}/>
           </main> 
           
           </div>
           </div> 
    );
    
}


export default Dashboard;