import React, {useState, useEffect} from 'react'; 
import {TableContainer, Table, TableHead, TableRow, TableBody, 
    TableCell, Paper, TableFooter, TablePagination, Checkbox,
    Typography, TextField, IconButton} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';
import './income-style.css';

const Income = ({transactionList}) => {

    const [incomeList, setIncomeList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, incomeList.length - page * rowsPerPage);

    const handleChangePage = (event, selectedPage) => {

        setPage(selectedPage);

    }
    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);

    }

    useEffect(() => {

        const incomeObjects = transactionList.filter(transaction => (
            transaction.transaction_type === 'Income'
    ));

        setIncomeList(incomeObjects);

    }, [transactionList])


    return(
        <React.Fragment>

        <Paper elevation={1}>
        <Typography variant='h5'>Add Income</Typography>
        <form className='income-form'> 
            <TextField variant='outlined' placeholder='Enter Income Source' label='Income Source'/>
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