import React from 'react';
import InputValidator from '../../tools/InputValidator';
import * as decimalsActions from '../actions/decimalsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './css/TokenInfo.css';
import {
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class TokenDecimals extends React.Component {
  constructor(props) {
    super(props);
    this.handleDecimalsChange = this.handleDecimalsChange.bind(this);
    this.isDecimalsValid = this.isDecimalsValid.bind(this);
  }

  isDecimalsValid(decimals) {
    return InputValidator.isDecimalsValid(decimals);
  }

  handleDecimalsChange(e) {
    this.props.decimalsActions.setDecimals(e.target.value);
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
              label="Decimals"
              className="text_field_decimals"
              margin="normal"
              variant="outlined"
              inputProps={{ maxLength: 2, style: { textAlign: "center" } }}
              value={this.props.decimals}
              onChange={this.handleDecimalsChange}
              error={!InputValidator.isDecimalsValid(this.props.decimals)}
            />
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            align="left"
            variant="body1"
            className={InputValidator.isDecimalsValid(this.props.decimals) ? "typography_token_info" : "typography_token_info_error"}
          >
            Defines the number of decimals for the token. 0-18 numerals are accepted. 18 is common practice.
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

TokenDecimals.propTypes = {
  decimalsActions: PropTypes.object.isRequired,
  decimals: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    decimals: state.decimals
  };
}

function mapDispatchToProps(dispatch) {
  return {
    decimalsActions: bindActionCreators(decimalsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenDecimals);
