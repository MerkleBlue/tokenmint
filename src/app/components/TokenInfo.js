import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import './css/TokenInfo.css';

const TokenInfo = () => {
  return (
    <form className="main_form">
      <TextField
        required
        id="outlined-required"
        label="Token name"
        className="text_field"
        margin="normal"
        variant="outlined"
      />
      <Typography>
        The name of the project. No spaces, 5-25 symbols. Only alphanumerical characters.
      </Typography>
      <TextField
        required
        id="outlined-required"
        label="Token symbol"
        className="text_field"
        margin="normal"
        variant="outlined"
      />
      <Typography>
        3-4 letters (example ETH, BTC, BAT, etc.)
      </Typography>
      <TextField
        required
        id="outlined-required"
        label="Decimals"
        className="text_field"
        margin="normal"
        variant="outlined"
      />
      <Typography>
        Defines the number of decimals for the token. 0-50 numerals are accepted. 18 as common practice
      </Typography>
    </form>
  );
};

export default TokenInfo;
