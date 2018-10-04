import React from 'react';
import './css/Footer.css';
import { Grid } from '@material-ui/core';

const Footer = () => {
  return (
    <form className="footer_main_form">
      <Grid container wrap="nowrap" spacing={8}>
        <Grid item xs>
          <a href="#" rel="noopener" className="btn btn-common wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms" >Create</a>
        </Grid>
        <Grid item xs>
          <a href="#" rel="noopener" className="btn btn-clean wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="400ms" >Clean</a>
        </Grid>
      </Grid>
    </form>
  );
};

export default Footer;
