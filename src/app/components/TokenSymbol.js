import React from 'react';
import InputValidator from '../../tools/InputValidator';
import * as tokenSymbolActions from '../actions/tokenSymbolActions';
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

export class TokenSymbol extends React.Component {

  constructor(props) {
    super(props);
    this.handleTokenSymbolChange = this.handleTokenSymbolChange.bind(this);
    this.isTokenSymbolValid = this.isTokenSymbolValid.bind(this);
  }

  isTokenSymbolValid(tokenSymbol) {
    return InputValidator.isTokenSymbolValid(tokenSymbol);
  }

  handleTokenSymbolChange(e) {
    this.props.tokenSymbolActions.setTokenSymbol(e.target.value);
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

    let tokenSymbolDescriptionText = InputValidator.isTokenSymbolUnique(this.props.tokenSymbol) ?
      "3-4 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters." :
      "This token symbol is already in use. We advise using another symbol.";

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <MuiThemeProvider theme={theme}>
            <TextField
              required
              id="outlined-required"
              label="Token symbol"
              className="text_field"
              margin="normal"
              variant="outlined"
              inputProps={{ maxLength: 4 }}
              value={this.props.tokenSymbol}
              error={!InputValidator.isTokenSymbolValid(this.props.tokenSymbol)}
              onChange={this.handleTokenSymbolChange}
            />
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            align="left"
            variant="body1"
            className={InputValidator.isTokenSymbolValid(this.props.tokenSymbol) ? "typography_token_info" : "typography_token_info_error"}
          >
            {tokenSymbolDescriptionText}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

TokenSymbol.propTypes = {
  tokenSymbolActions: PropTypes.object.isRequired,
  tokenSymbol: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    tokenSymbol: state.tokenSymbol
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenSymbolActions: bindActionCreators(tokenSymbolActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenSymbol);
