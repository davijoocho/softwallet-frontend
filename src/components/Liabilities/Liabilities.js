import React, {useState, useEffect} from 'react'; 
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, TableFooter, TablePagination} from '@material-ui/core';


const Liabilities = ({transactionList}) => {

    const [liabilitiesList, setLiabilitiesList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, liabilitiesList.length - page * rowsPerPage);

    const handleChangePage = (event, selectedPage) => {

        setPage(selectedPage);

    }
    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);

    }

    useEffect(() => {

        const liabilitiesObjects = transactionList.filter(transaction => (
            transaction.transaction_type === 'Liabilities'
    ));

        setLiabilitiesList(liabilitiesObjects);

    }, [transactionList]);


    return(
        
        <TableContainer component={Paper}>
        <Table> 
            <TableHead>
                <TableRow>
                    <TableCell align='left'>Liabilities</TableCell>
                    <TableCell align='left'>Description</TableCell>
                    <TableCell align='left'>Date</TableCell>
                    <TableCell align='left'>Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                (
                    rowsPerPage > 0 ?
                    liabilitiesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                    liabilitiesList
                ).map(liabilities => (
                <TableRow key={liabilities.id}>
                     <TableCell component='th' scope='row'>{liabilities.transaction_name}</TableCell>
                     <TableCell align='left'>{liabilities.description} </TableCell>
                     <TableCell align='left'>{liabilities.date} </TableCell>
                     <TableCell align='left'>{liabilities.amount} </TableCell>
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
                     count={liabilitiesList.length}
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

export default Liabilities;