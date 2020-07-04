import {createMuiTheme} from '@material-ui/core/styles';

const dashboardTheme = createMuiTheme({

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
            }
        }

    }
})

export default dashboardTheme;