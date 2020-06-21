
import {createMuiTheme} from '@material-ui/core/styles';


const signUpTheme = createMuiTheme({
    typography: {
        fontFamily: 'Alice', 
        h1:{
            fontSize:'4.5vh',
            fontWeight: 'bold'
        }
    },
    palette: {
        primary:{
            main: '#6b63ff'
        },
        secondary:{
            main: '#FFD0D0'
        }
    }, 

    overrides: {
        MuiFormControl:{
            marginNormal:{
                marginTop: '2.75vh',
                marginBottom: '1.5vh'
            },
            fullWidth:{
                width: '86%'
            }
        },
        MuiButton:{
            root:{
                fontWeight: 'bold',
                margin: '5vh 3vw',
                fontFamily: 'Source Sans Pro, sans-serif',
                letterSpacing: '0.15vw'
            },
            containedSizeLarge:{
                padding: '1.5vh 2.25vw'
            }
        }, 
        MuiTypography:{
            gutterBottom:{
                marginBottom: '3vh'
            },

        },
        MuiInputBase:{
            root:{
                fontSize: '1.25rem'
            }
        },
        MuiInputAdornment:{
            positionStart: {
                marginRight: '0vw'
            }
        },
        MuiOutlinedInput:{
            adornedStart:{
                paddingLeft: '0.25vw'
            },
            adornedEnd: {
                paddingRight: '0vw'
            }
        },
        MuiSvgIcon:{
            root:{
                width: '4vw',
                height: '4vh'
            }
        },
        MuiFormLabel:{
            root:{
                fontSize: '2.2vh'
            }
        },
        MuiIconButton:{
            root:{
                
            }
        }
    },
});

export default signUpTheme;