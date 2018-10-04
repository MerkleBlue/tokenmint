import React from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';

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
            ETH address (not exchange address). This address will be owner of the token (after sale end date). Double check the address (and access to it) before submission
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default TokenOwner;
