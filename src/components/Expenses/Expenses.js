import React, {useState, useEffect} from 'react'; 
import {TableContainer, Table, TableHead, TableRow, TableBody, 
    TableCell, Paper, TableFooter, TablePagination,
    TextField, IconButton, Typography} from '@material-ui/core';
import {AddCircle, DeleteForever} from '@material-ui/icons';
import './expenses-form.css';


const Expenses = ({transactionList, userProfile, setTransactionList}) => {

    const [expensesList, setExpensesList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [expenseInformation, setExpenseInformation] = useState({
        transactionName: '',
        description: '',
        date: '',
        amount: 0
    })

    const {transactionName, description, date, amount} = expenseInformation;

    useEffect(() => {
        const expenseObjects = transactionList.filter(transaction => (
            transaction.transaction_type === 'Expenses'
    ));
        setExpensesList(expenseObjects);
    }, [transactionList])
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, expensesList.length - page * rowsPerPage);

    const handleChangePage = (event, selectedPage) => {
        setPage(selectedPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleInputChange = (prop) => (event) => {
        setExpenseInformation({...expenseInformation, [prop]: event.target.value})
    }

    const handlePostRequest = async () => {

        try {
            if(transactionName && description && amount && date > 0) {
                let response = await fetch('http://localhost:3000/dashboard/expenses', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: userProfile.email, 
                        transaction_type: 'Expenses',
                        transaction_name: transactionName, 
                        description: description,
                        amount: -amount, 
                        date: date
                    })
                })

                let postedExpense = await response.json();

                setTransactionList([...transactionList, {
                    id: postedExpense.id,
                    transaction_name: postedExpense.transaction_name, 
                    transaction_type: postedExpense.transaction_type, 
                    description: postedExpense.description,
                    date: postedExpense.date,
                    amount: postedExpense.amount
                 }])

              }
              
           } catch (err) {
               console.log(err)
           }
     }

     const handleDeleteRequest = async (transactionId) =>  {

        try{
            let response = await fetch('http://localhost:3000/dashboard/expenses', {
                method: 'delete',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: userProfile.email,
                    id: transactionId
                })
            })

            let resultingTransactionList = await response.json()
            setTransactionList(resultingTransactionList)
    
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <React.Fragment>

        <Paper elevation={2}>
        <Typography variant='h5'>Add Expenses</Typography>
        <form className='expenses-form'> 
            <TextField 
            onChange={handleInputChange('transactionName')} 
            variant='outlined' 
            placeholder='Enter Expense' 
            label='Expense'/>
            <TextField 
            onChange={handleInputChange('description')} 
            variant='outlined' 
            placeholder='Enter Description' 
            label='Description'/>
            <TextField 
            onChange={handleInputChange('date')} 
            variant='outlined' 
            placeholder='MM-DD-YYYY' 
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
                    <TableCell align='left'>Expenses</TableCell>
                    <TableCell align='left'>Description</TableCell>
                    <TableCell align='left'>Date</TableCell>
                    <TableCell align='left'>Amount</TableCell>
                    <TableCell/>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                (
                    rowsPerPage > 0 ?
                    expensesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                    expensesList
                ).map(expenses => (
                <TableRow key={expenses.id}>
                     <TableCell component='th' scope='row'>{expenses.transaction_name}</TableCell>
                     <TableCell align='left'>{expenses.description} </TableCell>
                     <TableCell align='left'>{expenses.date} </TableCell>
                     <TableCell align='left'>{expenses.amount} </TableCell>
                     <TableCell>
                        <IconButton onClick={() => handleDeleteRequest(expenses.id)}>
                            <DeleteForever/>
                        </IconButton>
                    </TableCell>
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
                     count={expensesList.length}
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

export default Expenses;