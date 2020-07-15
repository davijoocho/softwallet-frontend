import React, {useState, useEffect} from 'react'; 
import {TableContainer, Table, TableHead, TableRow, TableBody,
 TableCell, Paper, TableFooter, TablePagination, IconButton, TextField, Typography} from '@material-ui/core';
import {AddCircle, DeleteForever} from '@material-ui/icons';
import './liabilities-style.css';

const Liabilities = ({transactionList, setTransactionList, userProfile}) => {

    const [liabilitiesList, setLiabilitiesList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [liabilityInformation, setLiabilityInformation] = useState({
        transactionName: '', 
        description: '', 
        amount: 0,
        date: ''
    })

    const {transactionName, description, amount, date} = liabilityInformation;

    useEffect(() => {
        const liabilitiesObjects = transactionList.filter(transaction => (
            transaction.transaction_type === 'Liabilities'
    ));
        setLiabilitiesList(liabilitiesObjects);
    }, [transactionList]);
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, liabilitiesList.length - page * rowsPerPage);

    const handleChangePage = (event, selectedPage) => {
        setPage(selectedPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleInputChange = (prop) => (event) => {
        setLiabilityInformation({...liabilityInformation, [prop]: event.target.value})
    }
    const handlePostRequest = async () => {

        try {
             
                let response = await fetch('http://localhost:3000/dashboard/liabilities', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: userProfile.email, 
                        transaction_type: 'Liabilities',
                        transaction_name: transactionName, 
                        description: description,
                        amount: -amount, 
                        date: date
                    })
                })

                let postedLiability = await response.json();

                setTransactionList([...transactionList, {
                    id: postedLiability.id,
                    transaction_name: postedLiability.transaction_name, 
                    transaction_type: postedLiability.transaction_type, 
                    description: postedLiability.description,
                    date: postedLiability.date,
                    amount: postedLiability.amount
                 }])

              } catch (err) {
               console.log(err)
           }
        }
        

     const handleDeleteRequest = async (transactionId) =>  {

        try{
            let response = await fetch('http://localhost:3000/dashboard/liabilities', {
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

    return(

        <React.Fragment>
        <Paper elevation={2}>
        <Typography variant='h5'>Add Liabilities</Typography>
        <form className='liabilities-form'> 
            <TextField 
            onChange={handleInputChange('transactionName')}
            variant='outlined' 
            placeholder='Enter Liability' 
            label='Liability'/>
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
                    <TableCell align='left'>Liabilities</TableCell>
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
                    liabilitiesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                    liabilitiesList
                ).map(liabilities => (
                <TableRow key={liabilities.id}>
                     <TableCell component='th' scope='row'>{liabilities.transaction_name}</TableCell>
                     <TableCell align='left'>{liabilities.description} </TableCell>
                     <TableCell align='left'>{liabilities.date} </TableCell>
                     <TableCell align='left'>{liabilities.amount} </TableCell>
                     <TableCell>
                        <IconButton onClick={() => handleDeleteRequest(liabilities.id)}>
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
                     count={liabilitiesList.length}
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

export default Liabilities;