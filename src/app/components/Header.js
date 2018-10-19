import React from 'react';
import './css/Header.css';
import logo from '../img/logo.png';
import { Typography } from '@material-ui/core';
import ethereum from '../img/ethereum.png';

const Header = () => {
  return (
    <div className="header_div">
      <div className="logo_div">
        <a href="../index.html"><img className="logo_header" src={logo} alt="" /></a>
      </div>
      <div className="caption_div">
        <div className="ethereum_div">
          <img src={ethereum} alt="" />
        </div>
        <div className="typography_div">
          <Typography
            color="textSecondary"
            variant="headline"
            gutterBottom
            className="typography_header"
          >
            Your own Token powered by
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Header;
