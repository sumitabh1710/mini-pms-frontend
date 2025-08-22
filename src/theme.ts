import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
  typography: {
    h1: { fontSize: '2rem' },
    h2: { fontSize: '1.5rem' },
  },
});
