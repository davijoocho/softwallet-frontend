import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {CssBaseline, TextField, Button, Typography, InputAdornment, IconButton} from '@material-ui/core';
import {AccountCircleOutlined, EmailOutlined, LockOutlined, VisibilityOffOutlined, VisibilityOutlined} from '@material-ui/icons';
import './signup-style.css';



const SignUp = ({signIn, isSignedIn, history}) => {

    const [inputValues, setInputValues] = useState({
        name: '', 
        email: '',
        password: '',
        confirmedPassword: '',
        showPassword: false,
        showConfirmedPassword: false
    });


    useEffect(() => {
        console.log(isSignedIn);
    })
   const handleInputChange = (prop) => (event) => {
       setInputValues({...inputValues, [prop]: event.target.value});
   }

   const handleShowPassword = (event) => {
       setInputValues({...inputValues, showPassword: !inputValues.showPassword});
   }

   const handleShowConfirmedPassword = (event) => {
       setInputValues({...inputValues, showConfirmedPassword: !inputValues.showConfirmedPassword});
   }

   const handleCreateAccount = async () => {

    try{

       let response = await fetch('http://localhost:3000/signup', {
           method: 'post',
           headers: {'Content-Type': 'application/json'}, 
           body: JSON.stringify({
               name: inputValues.name,
               email: inputValues.email,
               password: inputValues.password
           })
       });

       let user = await response.json();

       console.log(user);

       if(user.name === inputValues.name) {
            signIn(true);
            history.push('./dashboard');
       }

    } catch (err) {
        console.log(err); 
    }

   }


    return (
     <div className='signup-root'> 
     <CssBaseline/>
      
         <div className='sidebar'>
            <div className='sidebar-container'>
               <div> 
                <Link to='/' className='softwallet-logo'> 
                 SoftWallet
                </Link>
               </div>
               <div> 
                <div className='motto'>
                  Take control of your personal finance today.
                </div>
               </div>
               <div className='sidebar-top-image'></div> 
               <div className='sidebar-bottom-image'></div>
            </div> 
         </div>     


         <main className='signup-form-container'> 

         
             
           <div className='redirect-to-signin'> 
           <Typography variant='h6'>Already a member? <Link to='/signin'>Sign-In</Link></Typography>
           </div>

           <form className='signup-form'> 

            <Typography 
            variant='h1' 
            gutterBottom={true}
            noWrap={true}>
            Sign Up with SoftWallet
            </Typography>

            <TextField 
            margin='normal'
            color='primary' 
            label='Name' 
            required={true}
            fullWidth={true}
            variant='outlined' 
            placeholder='Enter Your Name'
            onChange={handleInputChange('name')}
            InputProps={{
                startAdornment:
                <InputAdornment position='start'>
                    <AccountCircleOutlined/>
                </InputAdornment>
            }}
            />

            <TextField 
            margin='normal'
            color='primary' 
            label='Email' 
            required={true}
            fullWidth={true}
            variant='outlined' 
            placeholder='Enter Your Email'
            onChange={handleInputChange('email')}
            InputProps={{
                startAdornment: 
                <InputAdornment position='start'>
                    <EmailOutlined/>
                </InputAdornment>
            }}
            />

            <TextField 
            error={
                inputValues.confirmedPassword !== inputValues.password ?
                true :
                false
            }
            helperText={
                inputValues.confirmedPassword !== inputValues.password ?
                'Passwords Do Not Match' :
                ''
            }
            margin='normal'
            color='primary' 
            label='Password' 
            required={true}
            fullWidth={true} 
            variant='outlined' 
            placeholder='Enter Your Password'
            type={inputValues.showPassword ? 'text' : 'password'}
            onChange={handleInputChange('password')}
            InputProps={{
                startAdornment:
                <InputAdornment position='start'>
                    <LockOutlined/>
                </InputAdornment>,
                endAdornment: 
                <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                      {inputValues.showPassword ? <VisibilityOutlined/> : <VisibilityOffOutlined/> }
                    </IconButton>
                </InputAdornment>
            }}
            />

            <TextField 
            error={
                inputValues.confirmedPassword !== inputValues.password ?
                true :
                false
            }
            helperText={
                inputValues.confirmedPassword !== inputValues.password ?
                'Passwords Do Not Match' :
                ''
            }
            margin='normal'
            color='primary' 
            label='Confirm Password' 
            required={true}
            fullWidth={true} 
            variant='outlined' 
            placeholder='Confirm Your Password'
            type={inputValues.showConfirmedPassword ? 'text' : 'password'}
            onChange={handleInputChange('confirmedPassword')}
            InputProps={{
                startAdornment:
                <InputAdornment position='start'>
                    <LockOutlined/>
                </InputAdornment>,
                endAdornment: 
                <InputAdornment position='end'>
                    <IconButton onClick={handleShowConfirmedPassword}>
                        {inputValues.showConfirmedPassword ? <VisibilityOutlined/> : <VisibilityOffOutlined/>} 
                    </IconButton>
                </InputAdornment>
            }}
            />


            <Button 
            color='secondary' 
            size='large' 
            variant='contained'
            onClick={handleCreateAccount}
            >
            Create Account
            </Button>

           </form>

        

         </main>
      </div>
      
    );


 }

 export default SignUp;

