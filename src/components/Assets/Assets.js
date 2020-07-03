import React, {useState, useEffect} from 'react'; 
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, TableFooter, TablePagination} from '@material-ui/core';

const Assets = ({transactionList}) => {

    const [assetsList, setAssetsList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, assetsList.length - page * rowsPerPage);

    const handleChangePage = (event, selectedPage) => {

        setPage(selectedPage);

    }
    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);

    }

    useEffect(() => {

        const assetObjects = transactionList.filter(transaction => (
            transaction.transaction_type === 'Assets'
    ));

        setAssetsList(assetObjects);

    }, [transactionList]);

    return ( 

        <TableContainer component={Paper}>
        <Table> 
            <TableHead>
                <TableRow>
                    <TableCell align='left'>Assets</TableCell>
                    <TableCell align='left'>Description</TableCell>
                    <TableCell align='left'>Date</TableCell>
                    <TableCell align='left'>Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                (
                    rowsPerPage > 0 ?
                    assetsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                    assetsList
                ).map(assets => (
                <TableRow key={assets.id}>
                     <TableCell component='th' scope='row'>{assets.transaction_name}</TableCell>
                     <TableCell align='left'>{assets.description} </TableCell>
                     <TableCell align='left'>{assets.date} </TableCell>
                     <TableCell align='left'>{assets.amount} </TableCell>
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
                     count={assetsList.length}
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

export default Assets;