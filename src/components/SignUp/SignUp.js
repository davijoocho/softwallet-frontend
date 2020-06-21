import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {CssBaseline, TextField, Button, Typography, InputAdornment, IconButton} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles'; 
import {AccountCircleOutlined, EmailOutlined, LockOutlined, VisibilityOffOutlined, VisibilityOutlined} from '@material-ui/icons';
import signUpTheme from './signup-theme.js';
import './signup-style.css';



const SignUp = () => {

    const [inputValues, setInputValues] = useState({
        name: '', 
        email: '',
        password: '',
        confirmedPassword: '',
        showPassword: false,
        showConfirmedPassword: false
    });
    

   const handleInputChange = (prop) => (event) => {
       setInputValues({...inputValues, [prop]: event.target.value});
   }

   const handleShowPassword = (event) => {
       setInputValues({... inputValues, showPassword: !inputValues.showPassword});
   }

   const handleShowConfirmedPassword = (event) => {
       setInputValues({...inputValues, showConfirmedPassword: !inputValues.showConfirmedPassword});
   }

    return (
     <div className='signup-root'> 
     <CssBaseline/>
      
         <div className='sidebar'>
            <div className='sidebar-container'>
               <div> 
                <NavLink to="/" className='softwallet-logo'> 
                 SoftWallet
                </NavLink>
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
          <ThemeProvider theme={signUpTheme}> 

           <div className='redirect-to-signin'> 
           <Typography variant='h6'>Already a member? <NavLink to='/signin'>Sign-In</NavLink></Typography>
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
            variant='contained'>
            Create Account
            </Button>

           </form>
          </ThemeProvider>
         </main>
      </div>
     
    );


 }

 export default SignUp;

