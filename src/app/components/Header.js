import React from 'react';
import './css/Header.css';
import logo from '../img/logo.png';
import { Typography } from '@material-ui/core';

const Header = () => {
  return (
      <div className="header_div">
        <a href="../index.html"><img className="logo_header" src={logo} alt="" /></a>
        <Typography
          align="center"
          color="textSecondary"
          variant="headline"
          gutterBottom
          className="typography_header"
        >
          Generate your own Ethereum Token!
        </Typography>
      </div>
  );
};

export default Header;
