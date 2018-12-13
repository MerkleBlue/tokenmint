import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  OutlinedInput,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './css/HandlePaymentPanel.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as payingAccountActions from '../actions/payingAccountActions';
import * as payingAccountFundsActions from '../actions/payingAccountFundsActions';
import * as walletActions from '../actions/walletActions';
import * as createTokensActions from '../actions/createTokensActions';
import { bindActionCreators } from 'redux';
import initialState from '../reducers/initialState';
import ReactGA from 'react-ga';
import { NO_NETWORK } from '../../api/mintApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCheck } from '@fortawesome/free-solid-svg-icons';
import NetworkWarning from './NetworkWarning'; //eslint-disable-line import/no-named-as-default
import InputValidator from '../../tools/InputValidator';

export class HandlePaymentPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUnlockWallet = this.handleUnlockWallet.bind(this);
    this.createTokens = this.createTokens.bind(this);
    this.isTokenCreationEnabled = this.isTokenCreationEnabled.bind(this);
  }


  componentDidMount() {
    console.log("Navigate to: /mint/payment"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/payment');
  }

  componentDidUpdate(prevProps) {
    // after finishing all checks, send ga
    if (!this.props.checkingNetwork && !this.props.checkingPayingAccountFunds && !this.props.loadingAccounts) {
      if (this.props.network !== "NO_NETWORK") {
        ReactGA.event({
          category: 'User',
          action: 'has web3'
        });
        if (this.props.network === "main") {
          ReactGA.event({
            category: 'User',
            action: 'has web3 and main net'
          });
          if (!this.props.payingAccountHasInsufficientFunds && this.props.payingAccountBalance > 0.0000001) {
            ReactGA.event({
              category: 'User',
              action: 'has web3 and main net and has funds'
            });
          }
        }
      }
    }
  }

  isTokenCreationEnabled() {
    return InputValidator.isInputValid(
      this.props.tokenName,
      this.props.tokenSymbol,
      this.props.decimals,
      this.props.totalSupply,
      this.props.tokenOwner
    ) && this.props.payingAccount !== initialState.payingAccount
      && !this.props.payingAccountHasInsufficientFunds
      && !this.props.loadingAccounts
      && !this.props.checkingPayingAccountFunds
      && (!this.props.walletNeedsToBeUnlocked || this.props.accounts.length > 0);
  }

  createTokens(e) {
    this.props.createTokensActions.createTokens(
      this.props.tokenName,
      this.props.tokenSymbol,
      this.props.decimals,
      this.props.totalSupply,
      this.props.tokenType,
      this.props.tokenOwner,
      this.props.serviceFee,
      this.props.payingAccount
    );
  }

  handleChange(e) {
    this.props.payingAccountActions.setPayingAccount(e.target.value);
    // if selected specific account
    if (e.target.value !== initialState.payingAccount) {
      this.props.payingAccountFundsActions.checkFunds(e.target.value);
    } else {
      this.props.payingAccountFundsActions.setPayingAccountHasInsufficientFunds(false);
    }
  }

  handleUnlockWallet(e) {
    this.props.walletActions.unlockWallet();
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

    let finishButton = this.isTokenCreationEnabled() ?
      (
        <span
          className="btn btn-confirm wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.createTokens}
        >
          <FontAwesomeIcon className="fa_check" icon={faCheck} />
          Finish
        </span>
      ) : (
        <span
          className="btn btn-disabled wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
        >
          <FontAwesomeIcon className="fa_check" icon={faCheck} />
          Finish
        </span>
      );

    let error = (this.props.accounts.length === 0 || this.props.payingAccountHasInsufficientFunds) && !this.props.loadingAccounts && !this.props.checkingPayingAccountFunds;

    //let menuItems;
    let content;
    let description;
    if (this.props.loadingAccounts) {
      content = (
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
              <MenuItem
                value={initialState.payingAccount}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                Loading accounts...
              </MenuItem>
            </Select>
          </FormControl>
        </MuiThemeProvider>
      );
      description = (
        <Typography
          align="left"
          variant="h6"
          className={error ? "typography_payment_error" : "typography_payment"}
        >
          ETH paying account.
        </Typography>
      );
    } else if (this.props.accounts.length > 0) {
      let menuItems = this.props.accounts.map((account) => (
        <MenuItem
          key={account}
          value={account}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          {account}
        </MenuItem>
      ));
      let descriptionText;
      if (this.props.payingAccountHasInsufficientFunds) {
        descriptionText = "This account has insufficient funds.";
      } else {
        descriptionText = "ETH paying account.";
      }
      description = (
        <Typography
          align="left"
          variant="h6"
          className={error ? "typography_payment_error" : "typography_payment"}
        >
          {descriptionText}
        </Typography>
      );
      content = (
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
      );
    } else {
      let menuItems = (
        <MenuItem
          value={initialState.payingAccount}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          No available accounts
        </MenuItem>
      );
      if (this.props.network === NO_NETWORK) {
        content = (
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
        );
        description = (
          <Typography
            align="left"
            variant="h6"
            className={error ? "typography_payment_error" : "typography_payment"}
          >
            There are no available accounts.
            Please make sure that you run Metamask or any other Ethereum wallet with at least one UNLOCKED account, and refresh the page.
          </Typography>
        );
      } else {
        if (this.props.walletNeedsToBeUnlocked) {
          content = (
            <span
              className="btn btn-unlock-wallet wow fadeInUp"
              data-wow-duration="1000ms"
              data-wow-delay="400ms"
              onClick={this.handleUnlockWallet}
            >
              <FontAwesomeIcon className="fa_check" icon={faWallet} />
              Connect to Wallet
            </span>
          );
          description = (
            <Typography
              align="left"
              variant="h6"
              className="typography_payment"
            >
              Please connect to Ethereum wallet.
            </Typography>
          );
        } else {
          content = (
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
          );
          description = (
            <Typography
              align="left"
              variant="h6"
              className={error ? "typography_payment_error" : "typography_payment"}
            >
              Ethereum wallet is detected, but there are no accounts available. If you are using Metamask, please LOG IN to it!
              Otherwise you should UNLOCK your wallet or CREATE an account in your wallet.
            </Typography>
          );
        }
      }
    }

    return (
      <div>
        {(!this.props.checkingNetwork && this.props.network !== "main") && <NetworkWarning />}
        <Card
          className="card"
        >
          <CardHeader
            title="Payment Details"
            classes={{
              root: "card_header",
              title: "card_header_text"
            }}
          />
          <CardContent
            classes={{
              root: "card_content"
            }}
          >
            {content}
            {description}
            {this.props.payingAccountHasInsufficientFunds && (this.props.accounts.length !== 0) &&
              <Typography
                align="left"
                variant="h6"
                className="typography_error_secondary"
              >
                Please top your account up with at least <strong>{(this.props.serviceFee + 0.02 - this.props.payingAccountBalance).toFixed(6)}</strong> ETH,
                and refresh the page!
              </Typography>
            }
          </CardContent>
        </Card>
        <form className="footer_main_form">
          {finishButton}
        </form>
      </div>
    );
  }
}

HandlePaymentPanel.propTypes = {
  network: PropTypes.string.isRequired,
  payingAccountHasInsufficientFunds: PropTypes.bool.isRequired,
  checkingPayingAccountFunds: PropTypes.bool.isRequired,
  checkingNetwork: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
  payingAccount: PropTypes.string.isRequired,
  payingAccountBalance: PropTypes.number.isRequired,
  serviceFee: PropTypes.number.isRequired,
  loadingAccounts: PropTypes.bool.isRequired,
  walletNeedsToBeUnlocked: PropTypes.bool.isRequired,
  tokenName: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  totalSupply: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  payingAccountActions: PropTypes.object.isRequired,
  payingAccountFundsActions: PropTypes.object.isRequired,
  walletActions: PropTypes.object.isRequired,
  createTokensActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    loadingAccounts: state.loadingAccounts,
    payingAccount: state.payingAccount,
    payingAccountBalance: state.payingAccountBalance,
    serviceFee: state.serviceFee,
    checkingNetwork: state.checkingNetwork,
    checkingPayingAccountFunds: state.checkingPayingAccountFunds,
    payingAccountHasInsufficientFunds: state.payingAccountHasInsufficientFunds,
    network: state.network,
    walletNeedsToBeUnlocked: state.walletNeedsToBeUnlocked,
    tokenName: state.tokenName,
    tokenSymbol: state.tokenSymbol,
    decimals: state.decimals,
    totalSupply: state.totalSupply,
    tokenOwner: state.tokenOwner,
    tokenType: state.tokenType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    payingAccountActions: bindActionCreators(payingAccountActions, dispatch),
    payingAccountFundsActions: bindActionCreators(payingAccountFundsActions, dispatch),
    walletActions: bindActionCreators(walletActions, dispatch),
    createTokensActions: bindActionCreators(createTokensActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HandlePaymentPanel);
