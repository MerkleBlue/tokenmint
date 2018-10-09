import React from 'react';
import { TextField, Typography, Grid } from '@material-ui/core';
import './css/TokenInfo.css';
import ethereum from '../img/ethereum.png';
import initialState from '../reducers/initialState';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as decimalsActions from '../actions/decimalsActions';
import * as tokenNameActions from '../actions/tokenNameActions';
import * as tokenSymbolActions from '../actions/tokenSymbolActions';
import * as totalSupplyActions from '../actions/totalSupplyActions';

class TokenInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tokenName: initialState.tokenName,
      isTokenNameValid: true,
      tokenSymbol: initialState.tokenSymbol,
      isTokenSymbolValid: true,
      decimals: initialState.decimals,
      isDecimalsValid: true,
      totalSupply: initialState.totalSupply,
      isTotalSupplyValid: true
    };
    this.handleTokenNameChange = this.handleTokenNameChange.bind(this);
    this.isTokenNameValid = this.isTokenNameValid.bind(this);
    this.handleTokenSymbolChange = this.handleTokenSymbolChange.bind(this);
    this.isTokenSymbolValid = this.isTokenSymbolValid.bind(this);
    this.handleDecimalsChange = this.handleDecimalsChange.bind(this);
    this.isDecimalsValid = this.isDecimalsValid.bind(this);
    this.handleTotalSupplyChange = this.handleTotalSupplyChange.bind(this);
    this.isTotalSupplyValid = this.isTotalSupplyValid.bind(this);
  }

  isTokenNameValid(val) {
    if (val === "") {
      return true;
    }
    return /^[a-z0-9]+$/i.test(val) && val.length >= 3;
  }

  handleTokenNameChange(e) {
    let isTokenNameValid = this.isTokenNameValid(e.target.value);
    this.setState({
      tokenName: e.target.value,
      isTokenNameValid: isTokenNameValid
    });
    if (isTokenNameValid) {
      tokenNameActions.setTokenName(this.state.tokenName);
    }
  }

  isTokenSymbolValid(val) {
    if (val === "") {
      return true;
    }
    return /^[a-z0-9]+$/i.test(val) && val.length >= 3;
  }

  handleTokenSymbolChange(e) {
    let isTokenSymbolValid = this.isTokenSymbolValid(e.target.value);
    this.setState({
      tokenSymbol: e.target.value,
      isTokenSymbolValid: isTokenSymbolValid
    });
    if (isTokenSymbolValid) {
      tokenSymbolActions.setTokenSymbol(this.state.tokenSymbol);
    }
  }

  isDecimalsValid(val) {
    if (val === "") {
      return true;
    }
    let n = Math.floor(Number(val));
    return n !== Infinity && String(n) === val && n > 0 && n <= 50;
  }

  handleDecimalsChange(e) {
    let isDecimalsValid = this.isDecimalsValid(e.target.value);
    this.setState({
      decimals: e.target.value,
      isDecimalsValid: isDecimalsValid
    });
    if (isDecimalsValid) {
      decimalsActions.setDecimals(this.state.decimals);
    }
  }

  isTotalSupplyValid(val) {
    if (val === "") {
      return true;
    }
    let n = Math.floor(Number(val));
    return n !== Infinity && String(n) === val && n > 0 && n <= 9999999999;
  }

  handleTotalSupplyChange(e) {
    let isTotalSupplyValid = this.isTotalSupplyValid(e.target.value);
    this.setState({
      totalSupply: e.target.value,
      isTotalSupplyValid: isTotalSupplyValid
    });
    if (isTotalSupplyValid) {
      totalSupplyActions.setTotalSupply(this.state.totalSupply);
    }
  }

  render() {
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
              value={this.state.tokenName}
              error={!this.state.isTokenNameValid}
              onChange={this.handleTokenNameChange}
            />
          </Grid>
          <Grid item xs>
            <Typography
              align="left"
              color="textSecondary"
              variant="caption"
              className="typography"
            >
              The name of the project. No spaces, 3-25 symbols. Only alphanumerical characters.
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
              value={this.state.tokenSymbol}
              error={!this.state.isTokenSymbolValid}
              onChange={this.handleTokenSymbolChange}
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
              value={this.state.decimals}
              onChange={this.handleDecimalsChange}
              error={!this.state.isDecimalsValid}
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
              value={this.state.totalSupply}
              onChange={this.handleTotalSupplyChange}
              error={!this.state.isTotalSupplyValid}
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    decimalsActions: bindActionCreators(decimalsActions, dispatch),
    tokenNameActions: bindActionCreators(tokenNameActions, dispatch),
    tokenSymbolActions: bindActionCreators(tokenSymbolActions, dispatch),
    totalSupplyActions: bindActionCreators(totalSupplyActions, dispatch)
  };
}

export default connect(() => {}, mapDispatchToProps)(TokenInfo);
