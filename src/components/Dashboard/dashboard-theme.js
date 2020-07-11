import {createMuiTheme} from '@material-ui/core/styles';

const dashboardTheme = createMuiTheme({

    typography: {
        h5: {
            marginLeft: '2vw'
        }
    },

    overrides: {

        MuiAppBar: {
            root: {
                height: '7vh',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: '2vw',
                paddingRight: '2vw'
            }
        },
        MuiDrawer: {
            paper: {
                height: '93.5vh',
                top: '7vh',
                width: '20vw',
                zIndex: '0'
            }
        },
        MuiListItem: {
            root: {
                marginTop: '2vh',
                marginBottom: '2vh'
            },
            gutters:{
                paddingLeft: '2vw',
                paddingRight: '2vw'
            }
        },
        Mui: {
            root: {
                $selected: {
                backgroundColor: '#D6D6D6'
            }
        }
        },
        MuiTableContainer: {
            root: {
                width: '100%',
                height: 'fit-content',
                marginBottom: '20vh',
                marginTop:'2vh'
            }
        },
        MuiFormControl: {
            root: {
                margin: '2vh 1.75vw',
                height:'8vh'
            }
        }, 
        MuiPaper: {
            root: {
                height: 'fit-content',
                width: 'fit-content',
                padding: '1vh',
                paddingTop: '1.5vh'
            }
        },
        MuiTypography: {
            root: {
                marginLeft: '1vw'
            }
        }

    }
})

export default dashboardTheme;