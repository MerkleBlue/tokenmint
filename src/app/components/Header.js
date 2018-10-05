import React from 'react';
import './css/Header.css';
import logo from '../img/logo.png';

const Header = () => {
  return (
      <div>
        <a href="../index.html"><img className="logo_header" src={logo} alt="" /></a>
      </div>
  );
};

export default Header;
