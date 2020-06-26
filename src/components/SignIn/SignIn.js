import React, {useState} from 'react';
import {CssBaseline, TextField, Typography, Button, InputAdornment, IconButton} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import {EmailOutlined, LockOutlined, VisibilityOffOutlined, VisibilityOutlined} from '@material-ui/icons'; 
import './signin-style.css';
import signInTheme from './signin-theme.js';

const SignIn = () => {

    const [inputValues, setInputValues] = useState({
        email:'',
        password:'',
        showPassword: false
    });
    
    const handleShowPassword = (event) => {
        setInputValues({...inputValues, showPassword: !inputValues.showPassword})
        console.log(inputValues.showPassword);
    }

    const handleInputChange = (prop) => (event) => {
        setInputValues({...inputValues, [prop]: event.target.value});

    }


    return( 
            <div className='signin-root'> 
               <CssBaseline/>

                 <div className='signin-sidebar'> 
                   <div className='signin-sidebar-container'>
                      <div> 
                        <NavLink to='/' className='softwallet-logo'>
                         SoftWallet
                        </NavLink>
                      </div>
                      <div className='motto'>
                         Take control of your personal finance today.
                      </div>
                      <div className='signin-sidebar-top-image'></div>
                      <div className='signin-sidebar-bottom-image'></div>
                   </div>
                 </div>

                 <main className='signin-form-container'>
                     <ThemeProvider theme={signInTheme}>

                     <div className='redirect-to-signup'> 
                    <Typography variant='h6'>Not a member? <NavLink to='/signup'>Sign-Up</NavLink></Typography>
                     </div>


                     <form className='signin-form'> 
                      
                      <Typography
                      variant='h1' 
                      gutterBottom={true}
                      noWrap={true}>
                       Sign Up with SoftWallet
                      </Typography>

                      <TextField 
                      variant='outlined'
                      margin='normal'
                      color='primary' 
                      label='Email' 
                      required={true}
                      fullWidth={true} 
                      placeholder='Enter Your Email Here'
                      onChange={handleInputChange('email')}
                      InputProps={{
                        startAdornment: 
                        <InputAdornment position='start'> 
                          <EmailOutlined/>
                        </InputAdornment>
                      }}
                      > 
                      </TextField>

                      <TextField 
                      variant='outlined'
                      margin='normal'
                      color='primary' 
                      label='Password' 
                      required={true}
                      fullWidth={true}
                      placeholder='Enter Your Password Here'
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
                                {inputValues.showPassword ? <VisibilityOutlined/> : <VisibilityOffOutlined/>}
                                </IconButton>
                            </InputAdornment>
                      }}
                      > 
                      </TextField>

                      <Button
                      color='secondary'
                      size='large'
                      variant='contained'>
                       Sign In
                      </Button>
                     </form>
                     </ThemeProvider>
                 </main>
 

            </div>
    );
    
}

export default SignIn; 