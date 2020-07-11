import React, {useState, useEffect} from 'react'; 
import {TableContainer, Table, TableHead, TableRow, TableBody, 
    TableCell, Paper, TableFooter, TablePagination,
    Typography, TextField, IconButton} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';
import './income-style.css';

const Income = ({transactionList, setTransactionList, userProfile}) => {

    const [incomeList, setIncomeList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [incomeInformation, setIncomeInformation] = useState({
        transactionName: '', 
        description: '', 
        amount: 0,
        date: ''
    })

    const {transactionName, description, amount, date} = incomeInformation;

    useEffect(() => {
        const incomeObjects = transactionList.filter(transaction => (
            transaction.transaction_type === 'Income'
    ));
        setIncomeList(incomeObjects);
    }, [transactionList])
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, incomeList.length - page * rowsPerPage);

    const handleChangePage = (event, selectedPage) => {
        setPage(selectedPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleInputChange = (prop) => (event) => {
        setIncomeInformation({...incomeInformation, [prop]: event.target.value})
    }

    const handlePostRequest = async () => {

        try{

           if(transactionName && description && date && amount > 0){
            let response = await fetch('http://localhost:3000/dashboard/income', {
               method: 'post',
               headers: {'Content-Type': 'application/json'}, 
               body: JSON.stringify({
                   email: userProfile.email, 
                   transaction_type: 'Income',
                   transaction_name: transactionName, 
                   description: description,
                   amount: amount, 
                   date: date
               })
             });

             let postedIncome = await response.json();

             setTransactionList([...transactionList, {
                 id: postedIncome.id,
                 transaction_name: postedIncome.transaction_name, 
                 transaction_type: postedIncome.transaction_type, 
                 description: postedIncome.description,
                 date: postedIncome.date,
                 amount: postedIncome.amount
             }])
             
            }

           } catch (err) {
               console.log(err)
           }


    } 

    return(
        <React.Fragment>
        <Paper elevation={2}>
        <Typography variant='h5'>Add Income</Typography>
        <form className='income-form'> 
            <TextField 
            onChange={handleInputChange('transactionName')}
            variant='outlined' 
            placeholder='Enter Income Source' 
            label='Income Source'/>
            <TextField 
            onChange={handleInputChange('description')}
            variant='outlined' 
            placeholder='Enter Description' 
            label='Description'/>
            <TextField 
            onChange={handleInputChange('date')}
            variant='outlined' 
            placeholder='MM/DD/Y-Y' 
            label='Date'/>
            <TextField 
            onChange={handleInputChange('amount')}
            variant='outlined' 
            placeholder='Enter Amount' 
            label='Amount'/>
            <IconButton onClick={handlePostRequest}>
                <AddCircle/>
            </IconButton>
        </form>
        </Paper>

        <TableContainer elevation={2} component={Paper}>
            <Table> 
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Income Source</TableCell>
                        <TableCell align='left'>Description</TableCell>
                        <TableCell align='left'>Date</TableCell>
                        <TableCell align='left'>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    (
                        rowsPerPage > 0 ?
                        incomeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                        incomeList
                    ).map(income => (
                    <TableRow key={income.id}>
                         <TableCell component='th' scope='row'>{income.transaction_name}</TableCell>
                         <TableCell align='left'>{income.description} </TableCell>
                         <TableCell align='left'>{income.date} </TableCell>
                         <TableCell align='left'>{income.amount} </TableCell>
                    </TableRow>
                    ))
                    }
                    
                    {
                        emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell/>
                            </TableRow>
                        )
                    }
                
                </TableBody>
                <TableFooter>
                    <TableRow> 
                        <TablePagination
                         rowsPerPageOptions={[5, 10, 15, {label: 'All', value: -1}]}
                         rowsPerPage={rowsPerPage}
                         count={incomeList.length}
                         page={page}
                         onChangePage={handleChangePage}
                         onChangeRowsPerPage={handleChangeRowsPerPage}
                        /> 
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        </React.Fragment>
    );
}

export default Income;