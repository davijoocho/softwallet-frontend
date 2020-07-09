import React, {useState} from 'react';
import {CssBaseline, TextField, Typography, Button, InputAdornment, IconButton} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import {EmailOutlined, LockOutlined, VisibilityOffOutlined, VisibilityOutlined} from '@material-ui/icons'; 
import './signin-style.css';




const SignIn = ({history, signIn, setUserProfile}) => {

    const [inputValues, setInputValues] = useState({
        email:'',
        password:'',
        showPassword: false
    });

    const [signInStatus, setSignInStatus] = useState(null);

    const {email, password, showPassword} = inputValues;
    
    const handleShowPassword = (event) => {
        setInputValues({...inputValues, showPassword: !showPassword})
    }

    const handleInputChange = (prop) => (event) => {
        setInputValues({...inputValues, [prop]: event.target.value});

    }

    const handleSignIn = async () => {

      try {
        let response = await fetch('http://localhost:3000/signin', {
          method: 'post', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        const verification = await response.json()

        if(verification.name) {

          signIn(true);
          history.push('/dashboard');
          setUserProfile({name: verification.name, email: email}); 

        } else {
          
          setSignInStatus(false);

        }
        
      } catch (err) {

        console.log(err);
        setSignInStatus(false);

      }
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
            ake control of your personal finance today.
            </div>
            <div className='signin-sidebar-top-image'></div>
            <div className='signin-sidebar-bottom-image'></div>
            </div>
            </div>

                <main className='signin-form-container'>

                <div className='redirect-to-signup'> 
                <Typography variant='h6'>Not a member? <NavLink to='/signup'>Sign-Up</NavLink></Typography>
                </div>
                
                <form className='signin-form'> 
                   
                 <Typography
                  variant='h1' 
                  gutterBottom={true}
                  >
                  Sign In to SoftWallet
                 </Typography>

                  <TextField 
                    error={
                      signInStatus === false ?
                      true :
                      false
                    }
                    helperText={
                      signInStatus === false ?
                      'Sign In Unsuccessful. Try Again.' :
                      ''
                    }
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
                    error={
                      signInStatus === false ?
                      true :
                      false
                    }
                    helperText={
                      signInStatus === false ?
                      'Sign In Unsuccessful. Try Again' :
                      ''
                    }
                    variant='outlined'
                    margin='normal'
                    color='primary' 
                    label='Password' 
                    required={true}
                    fullWidth={true}
                    placeholder='Enter Your Password Here'
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
                              {showPassword ? <VisibilityOutlined/> : <VisibilityOffOutlined/>}
                            </IconButton>
                          </InputAdornment>
                    }}
                     > 
                    </TextField>
                    <Button
                    color='secondary'
                    size='large'
                    variant='contained'
                    onClick={handleSignIn}
                    >
                    Sign In
                    </Button>
                    </form>
                 </main>
                 </div>
    );
    
}

export default SignIn; 