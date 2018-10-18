import React from 'react';
import './css/Header.css';
import logo from '../img/logo.png';
import { Typography } from '@material-ui/core';
import ethereum from '../img/ethereum.png';

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
          Your own Token powered by<img className="ethereum_symbol" src={ethereum} alt="" />
        </Typography>
      </div>
  );
};

export default Header;
