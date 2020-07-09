import React, {useState, useEffect} from 'react'; 
import {TableContainer, Table, TableHead, TableRow, TableBody, 
    TableCell, Paper, TableFooter, TablePagination, Checkbox,
    TextField, IconButton, Typography} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';
import './expenses-form.css';


const Expenses = ({transactionList}) => {

    const [expensesList, setExpensesList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, expensesList.length - page * rowsPerPage);

    const handleChangePage = (event, selectedPage) => {

        setPage(selectedPage);

    }
    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);

    }

    useEffect(() => {

        const expenseObjects = transactionList.filter(transaction => (
            transaction.transaction_type === 'Expenses'
    ));

        setExpensesList(expenseObjects);

    }, [transactionList])

    return (
        <React.Fragment>

        <Paper elevation={1}>
        <Typography variant='h5'>Add Expenses</Typography>
        <form className='expenses-form'> 
            <TextField variant='outlined' placeholder='Enter Expense' label='Expense'/>
            <TextField variant='outlined' placeholder='Enter Description' label='Description'/>
            <TextField variant='outlined' placeholder='MM/DD/Y-Y' label='Date'/>
            <TextField variant='outlined' placeholder='Enter Amount' label='Amount'/>
            <IconButton>
                <AddCircle/>
            </IconButton>
        </form>
        </Paper>

        <TableContainer component={Paper}>
        <Table> 
            <TableHead>
                <TableRow>
                    <TableCell align='left'>Expenses</TableCell>
                    <TableCell align='left'>Description</TableCell>
                    <TableCell align='left'>Date</TableCell>
                    <TableCell align='left'>Amount</TableCell>
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