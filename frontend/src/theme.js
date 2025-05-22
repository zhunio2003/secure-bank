import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD200', // Amarillo banco Pichincha
    },
    secondary: {
      main: '#003366', // Azul oscuro
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
