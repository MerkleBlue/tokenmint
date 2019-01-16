import React from 'react';
import InputValidator from '../../tools/InputValidator';
import {
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as icoRateActions from '../actions/icoRateActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './css/ICOAttributesPanel.css';

export class TokenRate extends React.Component {

  constructor(props) {
    super(props);
    this.handleRateChange = this.handleRateChange.bind(this);
  }

  handleRateChange(e) {
    this.props.icoRateActions.setIcoRate(e.target.value);
  }

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: { 500: "#31bfdf" }
      }
    });

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <MuiThemeProvider theme={theme}>
            <TextField
              required
              id="outlined-required"
              label="Rate"
              className="ico_text_field"
              margin="normal"
              variant="outlined"
              inputProps={{ maxLength: 25 }}
              value={this.props.icoRate}
              error={!InputValidator.isIcoRateValid(this.props.icoRate)}
              onChange={this.handleRateChange}
            />
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            align="left"
            variant="body1"
            className={InputValidator.isIcoRateValid(this.props.icoRate) ? "typography_ico_info" : "typography_ico_info_error"}
          >
            Token rate. The price in ETH at which the tokens will be sold.
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

TokenRate.propTypes = {
  icoRateActions: PropTypes.object.isRequired,
  icoRate: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    icoRate: state.icoRate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    icoRateActions: bindActionCreators(icoRateActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenRate);
