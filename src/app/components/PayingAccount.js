import React from 'react';
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './css/PayingAccount.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import * as payingAccountActions from '../actions/payingAccountActions';
import { bindActionCreators } from 'redux';
import ReactGA from 'react-ga';
import initialState from '../reducers/initialState';
import * as payingAccountFundsActions from '../actions/payingAccountFundsActions';

export class PayingAccount extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/');
  }

  handleChange(e) {
    this.props.payingAccountActions.setPayingAccount(e.target.value);
    // if selected specific account
    if (e.target.value !== initialState.payingAccount) {
      this.props.payingAccountFundsActions.checkFunds(e.target.value);
    } else {
      this.props.payingAccountFundsActions.setPayingAccountHasInsufficientFunds(false);
    }
    this.props.tokenOwnerActions.initTokenOwner(e.target.value);
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

    let error = (this.props.accounts.length === 0 || this.props.payingAccountHasInsufficientFunds) &&
      !this.props.loadingAccounts &&
      !this.props.checkingPayingAccountFunds;

    ////////////// SELECT ITEMS
    let menuItems;
    if (this.props.loadingAccounts) {
      menuItems = (
        <MenuItem
          value={initialState.payingAccount}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          Loading accounts...
        </MenuItem>
      );
    } else if (this.props.accounts.length > 0) {
      menuItems = this.props.accounts.map((account) => (
        <MenuItem
          key={account}
          value={account}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          {account}
        </MenuItem>
      ));
    } else {
      menuItems = (
        <MenuItem
          value={initialState.payingAccount}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          No available accounts
        </MenuItem>
      );
    }

    ////////////// DESCRIPTION TEXT
    let description;
    if (!this.props.loadingAccounts && this.props.payingAccountHasInsufficientFunds) {
      description = (
        <div>
          <Typography
            align="left"
            variant="body1"
            className={error ? "typography_payment_error" : "typography_payment"}
          >
            This account has insufficient funds.
          </Typography>
          <Typography
            align="left"
            variant="body1"
            className="typography_error_secondary"
          >
            Please top your account up with at least <strong>{(this.props.serviceFee + 0.02 - this.props.payingAccountBalance).toFixed(6)}</strong> ETH,
            and refresh the page!
          </Typography>
        </div>
      );
    } else if (!this.props.loadingAccounts && this.props.accounts.length === 0) {
      description = (
        <Typography
          align="left"
          variant="body1"
          className={error ? "typography_payment_error" : "typography_payment"}
        >
          There are no available accounts.
          Please make sure that you run Metamask or any other Ethereum wallet with at least one UNLOCKED account, and refresh the page.
        </Typography>
      );
    } else {
      description = (
        <Typography
          align="left"
          variant="body1"
          className={error ? "typography_payment_error" : "typography_payment"}
        >
          ETH paying account. This account pays for token creation service.
        </Typography>
      );
    }

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <MuiThemeProvider theme={theme}>
            <FormControl variant="outlined">
              <InputLabel>Paying account</InputLabel>
              <Select
                error={error}
                value={this.props.payingAccount}
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
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          {description}
        </Grid>
      </Grid>
    );
  }
}

PayingAccount.propTypes = {
  payingAccount: PropTypes.string.isRequired,
  accounts: PropTypes.array.isRequired,
  loadingAccounts: PropTypes.bool.isRequired,
  checkingPayingAccountFunds: PropTypes.bool.isRequired,
  payingAccountHasInsufficientFunds: PropTypes.bool.isRequired,
  payingAccountBalance: PropTypes.number.isRequired,
  serviceFee: PropTypes.number.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  payingAccountActions: PropTypes.object.isRequired,
  payingAccountFundsActions: PropTypes.object.isRequired,

};

function mapStateToProps(state) {
  return {
    payingAccount: state.payingAccount,
    accounts: state.accounts,
    loadingAccounts: state.loadingAccounts,
    checkingPayingAccountFunds: state.checkingPayingAccountFunds,
    payingAccountHasInsufficientFunds: state.payingAccountHasInsufficientFunds,
    payingAccountBalance: state.payingAccountBalance,
    serviceFee: state.serviceFee
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch),
    payingAccountActions: bindActionCreators(payingAccountActions, dispatch),
    payingAccountFundsActions: bindActionCreators(payingAccountFundsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PayingAccount);
