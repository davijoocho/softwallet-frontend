import React, {useState, useEffect} from 'react'; 
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, TableFooter, TablePagination} from '@material-ui/core';


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

    );
}

export default Income;