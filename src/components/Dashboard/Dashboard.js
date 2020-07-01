import React, {useState} from 'react';
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {AccountBalance, AttachMoney, HomeWork, CreditCard, AccountBalanceWallet} from '@material-ui/icons';

const Dashboard = ({history}) => {

    const [selectedText, setSelectedText] = useState('Summary');


    const categoriesList = [
        {
            text: 'Summary',
            icon: <AccountBalance/>,
            onClick: () => {
                history.push('/dashboard')
                setSelectedText('Summary')
            }
        },
        {
            text: 'Income',
            icon: <AttachMoney/>,
            onClick: () => {
                history.push('/dashboard/income')
                setSelectedText('Income')
            }
        },
        {
            text: 'Assets',
            icon: <HomeWork/>,
            onClick: () => {
                history.push('/dashboard/assets')
                setSelectedText('Assets')
            }
        },
        {
            text: 'Liabilities',
            icon: <CreditCard/>,
            onClick: () => {
                history.push('/dashboard/liabilities')
                setSelectedText('Liabilities')
            }
        },
        {
            text: 'Expenses',
            icon: <AccountBalanceWallet/>,
            onClick: () => {
                history.push('/dashboard/expenses')
                setSelectedText('Expenses')
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
                        <ListItem selected={ text === selectedText ? true : false } onClick={onClick} button={true}>
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