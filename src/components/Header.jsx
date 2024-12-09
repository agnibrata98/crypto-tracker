import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
  },
});

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate('/')} // Replace with proper navigation
              variant="h6"
              sx={{
                flex: 1,
                color: 'gold',
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              id="demo-simple-select"
              value={currency}
              onChange={handleCurrencyChange}
              sx={{
                width: 100,
                height: 40,
                marginLeft: 2,
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
