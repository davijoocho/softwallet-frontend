import React, {useState} from 'react';
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {AccountBalance, AttachMoney, HomeWork, CreditCard, AccountBalanceWallet} from '@material-ui/icons';

const Dashboard = ({history}) => {

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
    );
    
}


export default Dashboard;