import React from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import './css/TokenOwner.css';

const TokenOwner = () => {
  return (
    <form className="main_form">
      <Grid container wrap="nowrap" spacing={8}>
        <Grid item xs>
          <TextField
            required
            id="outlined-required"
            label="Token owner"
            className="text_field"
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs>
          <Typography
            align="left"
            color="textSecondary"
            variant="caption"
            className="typography"
          >
            ETH address (not exchange address). This address will be owner of the token (after sale end date). <strong>Double check the address (and access to it) before submission!</strong>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default TokenOwner;
