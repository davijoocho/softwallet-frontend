import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, AppBar, Typography} from '@material-ui/core';
import {AccountBalance, AttachMoney, HomeWork, CreditCard, AccountBalanceWallet} from '@material-ui/icons';
import Summary from '../Summary/Summary.js';
import Income from '../Income/Income.js';
import Assets from '../Assets/Assets.js';
import Liabilities from '../Liabilities/Liabilities.js';
import Expenses from '../Expenses/Expenses.js';
import '../ProtectedRoute/dashboard.css';

const Dashboard = ({history, transactionList}) => {

    const [selectedTab, setSelectedTab] = useState('Summary');


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


    return (

            <div className='dashboard-root'>
            <CssBaseline/>

            <nav className='app-bar'>
            <AppBar position='fixed'>
            <Typography variant='h4'>Dashboard</Typography>
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
            </List>
            </Drawer>
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


export default Dashboard;