import React, {useState, useEffect} from 'react'; 
import {TableContainer, Table, TableHead, TableRow, 
TableBody, TableCell, Paper, TableFooter, 
TablePagination, Typography, IconButton, TextField} from '@material-ui/core';
import {AddCircle, DeleteForever} from '@material-ui/icons';
import './assets-style.css';

const Assets = ({transactionList, userProfile, setTransactionList}) => {

    const [assetsList, setAssetsList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [assetInformation, setAssetInformation] = useState({
        transactionName: '',
        description: '',
        date: '',
        amount: 0
    })

    useEffect(() => {
        const assetObjects = transactionList.filter(transaction => (
            transaction.transaction_type === 'Assets'
    ));
        setAssetsList(assetObjects);
    }, [transactionList]);

    const {transactionName, description, date, amount} = assetInformation;
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, assetsList.length - page * rowsPerPage);

    const handleChangePage = (event, selectedPage) => {
        setPage(selectedPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleInputChange = (prop) => (event) => {
        setAssetInformation({...assetInformation, [prop]: event.target.value})
    }

    const handlePostRequest = async () => {
        try {
            if(transactionName && description && date && amount > 0) {
                let response = await fetch('http://localhost:3000/dashboard/assets', {
                    method: 'post', 
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({
                        email: userProfile.email, 
                        transaction_type: 'Assets',
                        transaction_name: transactionName, 
                        description: description,
                        amount: amount, 
                        date: date
                    })
                });

                let postedAssets = await response.json()

                setTransactionList([...transactionList, {
                    id: postedAssets.id,
                    transaction_name: postedAssets.transaction_name, 
                    transaction_type: postedAssets.transaction_type, 
                    description: postedAssets.description,
                    date: postedAssets.date,
                    amount: postedAssets.amount
                }])

            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteRequest = async (transactionId) =>  {

        try{
            let response = await fetch('http://localhost:3000/dashboard/assets', {
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
        <Typography variant='h5'>Add Assets</Typography>
        <form className='assets-form'> 
            <TextField 
            onChange={handleInputChange('transactionName')}
            variant='outlined'
            placeholder='Enter Asset' 
            label='Asset'/>
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
                    <TableCell align='left'>Assets</TableCell>
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
                    assetsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                    assetsList
                ).map(assets => (
                <TableRow key={assets.id}>
                     <TableCell component='th' scope='row'>{assets.transaction_name}</TableCell>
                     <TableCell align='left'>{assets.description} </TableCell>
                     <TableCell align='left'>{assets.date} </TableCell>
                     <TableCell align='left'>{assets.amount} </TableCell>
                     <TableCell>
                        <IconButton onClick={() => handleDeleteRequest(assets.id)}>
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
                     count={assetsList.length}
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

export default Assets;