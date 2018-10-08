import React from 'react';
import { TextField, Typography, Grid } from '@material-ui/core';
import './css/TokenInfo.css';
import ethereum from '../img/ethereum.png';

const TokenInfo = () => {
  return (
    <form className="main_form">
      <div className="token_info_header">
        <img className="ethereum_symbol" src={ethereum} alt="" />
      </div>
      <Grid container wrap="nowrap" spacing={8}>
        <Grid item xs>
          <TextField
            required
            id="outlined-required"
            label="Token name"
            className="text_field"
            margin="normal"
            variant="outlined"
            inputProps={{ maxLength: 25 }}
          />
        </Grid>
        <Grid item xs>
          <Typography
            align="left"
            color="textSecondary"
            variant="caption"
            className="typography"
          >
            The name of the project. No spaces, 5-25 symbols. Only alphanumerical characters.
          </Typography>
        </Grid>
      </Grid>
      <Grid container wrap="nowrap" spacing={8}>
        <Grid item xs>
          <TextField
            required
            id="outlined-required"
            label="Token symbol"
            className="text_field"
            margin="normal"
            variant="outlined"
            inputProps={{ maxLength: 4 }}
          />
        </Grid>
        <Grid item xs>
          <Typography
            align="left"
            color="textSecondary"
            variant="caption"
            className="typography"
          >
            3-4 letters (example ETH, BTC, BAT, etc.)
          </Typography>
        </Grid>
      </Grid>
      <Grid container wrap="nowrap" spacing={8}>
        <Grid item xs>
          <TextField
            required
            id="outlined-required"
            label="Decimals"
            className="text_field_decimals"
            margin="normal"
            variant="outlined"
            inputProps={{ maxLength: 2, style: { textAlign: "center" } }}
          />
        </Grid>
        <Grid item xs>
          <Typography
            align="left"
            color="textSecondary"
            variant="caption"
            className="typography"
          >
            Defines the number of decimals for the token. 0-50 numerals are accepted. 18 as common practice
          </Typography>
        </Grid>
      </Grid>
      <Grid container wrap="nowrap" spacing={8}>
        <Grid item xs>
          <TextField
            required
            id="outlined-required"
            label="Total supply"
            className="text_field"
            margin="normal"
            variant="outlined"
            inputProps={{ maxLength: 10, style: { textAlign: "center" } }}
          />
        </Grid>
        <Grid item xs>
          <Typography
            align="left"
            color="textSecondary"
            variant="caption"
            className="typography"
          >
            Total amount of tokens to be generated. Minimum value is 1, and maximum 9 999 999 999
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default TokenInfo;
