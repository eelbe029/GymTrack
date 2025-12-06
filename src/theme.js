import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#f5f5dc', // Beige/Whitish
            paper: '#ffffff',
        },
        primary: {
            main: '#333333', // Dark text for "developer" look
        },
        secondary: {
            main: '#555555',
        },
        text: {
            primary: '#333333',
            secondary: '#555555',
        },
    },
    typography: {
        fontFamily: '"Roboto Mono", "Courier New", monospace',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0, // Square/Sharp edges for dev look
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                }
            }
        }
    },
});

export default theme;
