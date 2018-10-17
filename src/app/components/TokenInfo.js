import React from 'react';
import { TextField, Typography, Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import './css/TokenInfo.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as decimalsActions from '../actions/decimalsActions';
import * as tokenNameActions from '../actions/tokenNameActions';
import * as tokenSymbolActions from '../actions/tokenSymbolActions';
import * as totalSupplyActions from '../actions/totalSupplyActions';
import PropTypes from 'prop-types';
import InputValidator from '../../tools/InputValidator';

class TokenInfo extends React.Component {

  constructor(props) {
    super(props);
    this.handleTokenNameChange = this.handleTokenNameChange.bind(this);
    this.isTokenNameValid = this.isTokenNameValid.bind(this);
    this.handleTokenSymbolChange = this.handleTokenSymbolChange.bind(this);
    this.isTokenSymbolValid = this.isTokenSymbolValid.bind(this);
    this.handleDecimalsChange = this.handleDecimalsChange.bind(this);
    this.isDecimalsValid = this.isDecimalsValid.bind(this);
    this.handleTotalSupplyChange = this.handleTotalSupplyChange.bind(this);
    this.isTotalSupplyValid = this.isTotalSupplyValid.bind(this);
  }

  isTokenNameValid(tokenName) {
    return InputValidator.isTokenNameValid(tokenName);
  }

  handleTokenNameChange(e) {
    this.props.tokenNameActions.setTokenName(e.target.value);
  }

  isTokenSymbolValid(tokenSymbol) {
    return InputValidator.isTokenSymbolValid(tokenSymbol);
  }

  handleTokenSymbolChange(e) {
    this.props.tokenSymbolActions.setTokenSymbol(e.target.value);
  }

  isDecimalsValid(decimals) {
    return InputValidator.isDecimalsValid(decimals);
  }

  handleDecimalsChange(e) {
    this.props.decimalsActions.setDecimals(e.target.value);
  }

  isTotalSupplyValid(totalSupply) {
    return InputValidator.isTotalSupplyValid(totalSupply);
  }

  handleTotalSupplyChange(e) {
    this.props.totalSupplyActions.setTotalSupply(e.target.value);
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: blueGrey,
      },
    });

    let tokenSymbolDescriptionText = InputValidator.isTokenSymbolUnique(this.props.tokenSymbol) ?
    "3-4 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters." :
    "This token symbol is already in use. We advise using another symbol.";
    return (
      <form className="main_form">
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
            <MuiThemeProvider theme={theme}>
              <TextField
                required
                id="outlined-required"
                label="Token name"
                className="text_field"
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 25 }}
                value={this.props.tokenName}
                error={!InputValidator.isTokenNameValid(this.props.tokenName)}
                onChange={this.handleTokenNameChange}
              />
            </MuiThemeProvider>
          </Grid>
          <Grid item xs>
            <Typography
              align="left"
              color={InputValidator.isTokenNameValid(this.props.tokenName) ? "textSecondary" : "error"}
              variant="caption"
              className="typography"
            >
              The name of the token. 3-25 symbols. Alphanumerical characters, space, and hyphen are accepted.
          </Typography>
          </Grid>
        </Grid>
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
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
          <Grid item xs>
            <Typography
              align="left"
              color={InputValidator.isTokenSymbolValid(this.props.tokenSymbol) ? "textSecondary" : "error"}
              variant="caption"
              className="typography"
            >
              {tokenSymbolDescriptionText}
            </Typography>
          </Grid>
        </Grid>
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
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
          <Grid item xs>
            <Typography
              align="left"
              color={InputValidator.isDecimalsValid(this.props.decimals) ? "textSecondary" : "error"}
              variant="caption"
              className="typography"
            >
              Defines the number of decimals for the token. 0-50 numerals are accepted. 18 is common practice.
          </Typography>
          </Grid>
        </Grid>
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
            <MuiThemeProvider theme={theme}>
              <TextField
                required
                id="outlined-required"
                label="Total supply"
                className="text_field"
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 16, style: { textAlign: "center" } }}
                value={this.props.totalSupply}
                onChange={this.handleTotalSupplyChange}
                error={!InputValidator.isTotalSupplyValid(this.props.totalSupply)}
              />
            </MuiThemeProvider>
          </Grid>
          <Grid item xs>
            <Typography
              align="left"
              color={InputValidator.isTotalSupplyValid(this.props.totalSupply) ? "textSecondary" : "error"}
              variant="caption"
              className="typography"
            >
              Total amount of tokens to be generated. Minimum value is 1, and maximum 1000000000000000.
          </Typography>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TokenInfo.propTypes = {
  decimalsActions: PropTypes.object.isRequired,
  tokenNameActions: PropTypes.object.isRequired,
  tokenSymbolActions: PropTypes.object.isRequired,
  totalSupplyActions: PropTypes.object.isRequired,
  tokenName: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  totalSupply: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    tokenName: state.tokenName,
    tokenSymbol: state.tokenSymbol,
    decimals: state.decimals,
    totalSupply: state.totalSupply
  };
}

function mapDispatchToProps(dispatch) {
  return {
    decimalsActions: bindActionCreators(decimalsActions, dispatch),
    tokenNameActions: bindActionCreators(tokenNameActions, dispatch),
    tokenSymbolActions: bindActionCreators(tokenSymbolActions, dispatch),
    totalSupplyActions: bindActionCreators(totalSupplyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenInfo);
