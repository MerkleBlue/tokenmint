import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, Typography, OutlinedInput } from '@material-ui/core';
import './css/TokenOwner.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import * as tokenOwnerFundsActions from '../actions/tokenOwnerFundsActions';
import { bindActionCreators } from 'redux';
import initialState from '../reducers/initialState';

class TokenOwner extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.tokenOwnerActions.setTokenOwner(e.target.value);
    // if selected specific account
    if (e.target.value !== initialState.tokenOwner) {
      this.props.tokenOwnerFundsActions.checkFunds(e.target.value);
    }
  }

  render() {
    let menuItems;
    let descriptionText;
    let typographyColor;
    if (this.props.accounts.length > 0) {
      menuItems = this.props.accounts.map((account) => <MenuItem key={account} value={account}>{account}</MenuItem>);
      if (this.props.tokenOwnerHasEnoughFunds) {
        descriptionText = "ETH address (not exchange address). This address will be owner of the token. Please make sure that the selected address is main-net Ethereum address!";
        typographyColor = "textSecondary";
      } else {
        descriptionText = "This account has insufficient funds. Please top this account up, or select another one.";
        typographyColor = "error";
      }
    } else {
      menuItems = <MenuItem value={initialState.tokenOwner}>No available accounts</MenuItem>;
      descriptionText = "There are no available accounts. Please make sure that you provide at least one account using MetaMask or any available Ethereum wallet.";
      typographyColor = "error";
    }
    return (
      <form className="main_form">
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
            <FormControl variant="outlined">
              <InputLabel>Accounts</InputLabel>
              <Select
                error={this.props.accounts.length === 0 || !this.props.tokenOwnerHasEnoughFunds}
                value={this.props.tokenOwner}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    className="select_field"
                  />
                }
              >
                {menuItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <Typography
              align="left"
              color={typographyColor}
              variant="caption"
              className="typography"
            >
              {descriptionText}
            </Typography>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TokenOwner.propTypes = {
  accounts: PropTypes.array.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  tokenOwnerHasEnoughFunds: PropTypes.bool.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  tokenOwnerFundsActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    tokenOwner: state.tokenOwner,
    tokenOwnerHasEnoughFunds: state.tokenOwnerHasEnoughFunds
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch),
    tokenOwnerFundsActions: bindActionCreators(tokenOwnerFundsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenOwner);
