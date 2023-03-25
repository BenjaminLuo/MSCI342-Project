import { createTheme } from '@material-ui/core';

// Site-wide styling constants
export const theme = createTheme({
    palette: {
        primary: {
            main: '#99A1A6',
            light: '#99A1A6',
            dark: '#99A1A6'
        },
        secondary: {
            main: '#99A1A6',
            light: '#99A1A6',
            dark: '#99A1A6'
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
        ].join(','),
        h5: {
            color: '#FFFFFF',
            fontWeight: '20',
            fontSize: '16px'
        },
        h6: {
            fontWeight: '10',
            fontSize: '14px'
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*': {
                    'scrollbar-width': 'thin',
                },
                '*::-webkit-scrollbar': {
                    width: '4px',
                    height: '4px',
                }
            }
        }
    }
});
