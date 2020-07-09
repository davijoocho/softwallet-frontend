import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {CssBaseline, TextField, Button, Typography, InputAdornment, IconButton} from '@material-ui/core';
import {AccountCircleOutlined, EmailOutlined, LockOutlined, VisibilityOffOutlined, VisibilityOutlined} from '@material-ui/icons';
import './signup-style.css';

const SignUp = ({signIn, history, setUserProfile}) => {

   const [inputValues, setInputValues] = useState({
        name: '', 
        email: '',
        password: '',
        confirmedPassword: '',
        showPassword: false,
        showConfirmedPassword: false
    });

   const [signUpStatus, setSignUpStatus] = useState(null);

   const {name, email, password, confirmedPassword, showPassword, showConfirmedPassword} = inputValues;

    
   const handleInputChange = (prop) => (event) => {
       setInputValues({...inputValues, [prop]: event.target.value});
   }

   const handleShowPassword = (event) => {
       setInputValues({...inputValues, showPassword: !showPassword});
   }

   const handleShowConfirmedPassword = (event) => {
       setInputValues({...inputValues, showConfirmedPassword: !showConfirmedPassword});
   }

   const handleCreateAccount = async () => {

    try{
        if (password === confirmedPassword) {
           let response = await fetch('http://localhost:3000/signup', {
           method: 'post',
           headers: {'Content-Type': 'application/json'}, 
           body: JSON.stringify({
               name: name,
               email: email,
               password: password 
           })
       });

       let user = await response.json();

       if(user.name === name) {
            signIn(true);
            history.push('./dashboard');
            setUserProfile({name: name, email: email});

       } else {
           setSignUpStatus(false);
       }
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
            >
            Sign Up with SoftWallet
            </Typography>

            <TextField 
            error={
                signUpStatus === false ? 
                true :
                false
            }
            helperText={
                signUpStatus === false ?
                'Unsuccessful Attempt. Try Again.':
                ''
            }
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
            error={
                signUpStatus === false ?
                true :
                false
            }
            helperText={
                signUpStatus === false ?
                'Unsuccessful Attempt. Try Again.':
                ''
            }
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
             signUpStatus === false || confirmedPassword !== password ?
             true :
             false
            }
            helperText={
            confirmedPassword !== password ? 
             'Passwords Do Not Match' :
            signUpStatus === false ?
             'Unsuccessful Attempt. Try Again.':
             ''
            }
            margin='normal'
            color='primary' 
            label='Password' 
            required={true}
            fullWidth={true} 
            variant='outlined' 
            placeholder='Enter Your Password'
            type={showPassword ? 'text' : 'password'}
            onChange={handleInputChange('password')}
            InputProps={{
                startAdornment:
                <InputAdornment position='start'>
                    <LockOutlined/>
                </InputAdornment>,
                endAdornment: 
                <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOutlined/> : <VisibilityOffOutlined/> }
                    </IconButton>
                </InputAdornment>
            }}
            />

            <TextField 
            error={
                confirmedPassword !== password ?
                true :
                false
            }
            helperText={
                confirmedPassword !== password ?
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
            type={showConfirmedPassword ? 'text' : 'password'}
            onChange={handleInputChange('confirmedPassword')}
            InputProps={{
                startAdornment:
                <InputAdornment position='start'>
                    <LockOutlined/>
                </InputAdornment>,
                endAdornment: 
                <InputAdornment position='end'>
                    <IconButton onClick={handleShowConfirmedPassword}>
                        {showConfirmedPassword ? <VisibilityOutlined/> : <VisibilityOffOutlined/>} 
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

