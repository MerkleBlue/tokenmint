import React from 'react';
import './css/MintTokens.css';
import { Grid, Typography } from '@material-ui/core';

const MintTokens = () => {
  return (
    <form className="main_form">
      <Grid container wrap="nowrap" spacing={8}>
        <Grid item xs>
          <span className="btn btn-common wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms" >Distribute tokens</span>
        </Grid>
        <Grid item xs>
          <Typography
            align="left"
            color="textSecondary"
            variant="caption"
            className="typography"
          >
            Optional.
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default MintTokens;

