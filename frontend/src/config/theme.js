import { createTheme } from '@mui/material';

// Allow to use breakpoints
const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: { main: '#b9cd00', contrastText: '#fff' },
    secondary: { main: '#5a696b' },
    grey: { main: '#e0e0e0' }
  },
  typography: {
    h3: {
        lineHeight: 1
    },
    h6: {
        fontSize : 24,
        lineHeight : 1.1
    },
    details: {
      fontSize: 8
    }
  },
  overrides: {
    RaChipField: {
      chip: {
        marginLeft: 0,
        marginTop: 0,
        marginRight: 8,
        marginBottom: 8
      }
    },
    RaShow: {
      card: {
        padding: 25,
        [defaultTheme.breakpoints.down('xs')]: {
          padding: 15
        }
      }
    },
    RaList: {
      content: {
        padding: 25,
        [defaultTheme.breakpoints.down('xs')]: {
          padding: 15,
          paddingTop: 0,
          marginTop: -8
        }
      }
    },
    RaListToolbar: {
      toolbar: {
        paddingLeft: '0 !important'
      }
    },
    RaSingleFieldList: {
      root: {
        marginTop: 0,
        marginBottom: 0
      }
    },
    RaAutocompleteArrayInput: {
      chipContainerFilled: {
        '& .serverName': {
          display: 'none'
        }
      }
    },
    MuiTab: {
      labelIcon: {
        paddingTop: 0
        // minHeight: 0
      }
      // wrapper: {
      //   alignItems: null,
      //   flexDirection: null
      // }
    },
    MuiCard: {
      root: {
        '@media print': {
          boxShadow: 'none !important'
        }
      }
    }
  }
});

export default theme;
