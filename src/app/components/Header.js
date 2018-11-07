import React from 'react';
import './css/Header.css';
import logo from '../img/logo.png';
import { Typography } from '@material-ui/core';
import ethereum from '../img/ethereum.png';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const Header = () => {
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    }
  });

  return (
    <div className="header_div">
      <div className="logo_div">
        <a href="../"><img className="logo_header" src={logo} alt="" /></a>
      </div>
      <div className="caption_div">
        <div className="ethereum_div">
          <img src={ethereum} alt="" />
        </div>
        <div className="typography_div">
          <MuiThemeProvider theme={theme}>
            <Typography
              color="textSecondary"
              variant="h5"
              gutterBottom
              className="typography_header"
            >
              Your own Token powered by
            </Typography>
          </MuiThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default Header;
