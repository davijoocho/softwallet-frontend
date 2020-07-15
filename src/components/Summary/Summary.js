import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2'; 
import {Card, makeStyles} from '@material-ui/core';
import './summary-style.css';

const useStyles = makeStyles({

    chartRoot: {
        width: '77.5vw',
        height: '45vh'
    },
    categoriesRoot: {
        width: '17.2vw',
        height: '20vh',
        marginRight: '2vw',
        marginTop: '5vh',
        marginBottom: '1vh'
    }

})

const Summary = ({transactionList, bankBalance, setBankBalance, userProfile}) => {

    const classes = useStyles();

    const [barChartData, setBarChartData] = useState([0,0,0,0])


    useEffect(() => {

        let updatedData = [0,0,0,0]

        for(let i = 0; i < transactionList.length; i++) {

            switch (transactionList[i].transaction_type) {
                case 'Income':
                    updatedData[0] += parseFloat(transactionList[i].amount.replace(/\$|,/g, ''))
                    break;
                case 'Assets':
                    updatedData[1] += parseFloat(transactionList[i].amount.replace(/\$|,/g, ''))
                    break;
                case 'Liabilities':
                    updatedData[2] += parseFloat(transactionList[i].amount.replace(/\$|,/g, ''))
                    break;
                case 'Expenses':
                    updatedData[3] += parseFloat(transactionList[i].amount.replace(/\$|,/g, '')) 
                    break;
                default:
                    console.log('unknown transaction type');
                
            }
        }

        setBarChartData(updatedData)
       
    }, [transactionList])

    useEffect(() => {
        const {email} = userProfile

        const getBalance = async() => {
            try{
                let response = await fetch(`http://localhost:3000/get_balance?user=${email}`, {
                    method: 'get',
                    headers: {'Content-Type': 'application/json'}
                })
                let accountBalance = await response.json()
                console.log(accountBalance)
                setBankBalance(accountBalance.current)

            } catch (err) {
                console.log(err)
            }
        }

      getBalance()
    }, [userProfile])

   

    return(

        <React.Fragment> 

            <Card variant='elevation' classes={{root: classes.chartRoot}}>
                <Bar
                data={{
                 labels: ['Income', 'Assets', 'Liabilities', 'Expenses'],
                 datasets: [{
                    data: barChartData,
                    label: 'Financial Data Chart',
                    backgroundColor: ['rgba(202, 255, 194, 0.65)', 'rgba(202, 255, 194, 0.65)', 'rgba(255, 194, 194, 0.65)', 'rgba(255, 194, 194, 0.65)']
                  }]
                }}
                options={{maintainAspectRatio: false}}
                />
            </Card>

            <Card classes={{root: classes.categoriesRoot}}>
            <h1>Income</h1>
            <p className='categories-pos'>{`$${barChartData[0]}`}</p>
            </Card>

            <Card classes={{root: classes.categoriesRoot}}>
            <h1>Assets</h1>
            <p className='categories-pos'>{`$${barChartData[1]}`}</p>
            </Card>

            <Card classes={{root: classes.categoriesRoot}}>
            <h1>Liabilities</h1>
            <p className='categories-neg'>{`-$${-barChartData[2]}`}</p>
            </Card>

            <Card classes={{root: classes.categoriesRoot}}> 
            <h1>Expenses</h1>
            <p className='categories-neg'>{`-$${-barChartData[3]}`}</p>
            </Card>

            <Card classes={{root: classes.categoriesRoot}}> 
            <h1>Balance in Bank</h1>
            <p>{`$${ bankBalance}`}</p>
            </Card>




        </React.Fragment>

    );
}


export default Summary;



