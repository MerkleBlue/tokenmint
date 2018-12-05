import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  OutlinedInput,
  Card,
  CardHeader,
  CardContent,
  TextField
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './css/TokenOwner.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import * as tokenOwnerFundsActions from '../actions/tokenOwnerFundsActions';
import * as walletActions from '../actions/walletActions';
import * as appStateActions from '../actions/appStateActions';
import { bindActionCreators } from 'redux';
import initialState from '../reducers/initialState';
import ReactGA from 'react-ga';
import { NO_NETWORK } from '../../api/mintApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import InputValidator from '../../tools/InputValidator';
import appStates from '../reducers/appStates';

export class TokenOwner extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUnlockWallet = this.handleUnlockWallet.bind(this);
    this.backToHome = this.backToHome.bind(this);
  }


  componentDidMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/');
  }

  componentDidUpdate(prevProps) {
    // after finishing all checks, send ga
    if (!this.props.checkingNetwork && !this.props.checkingTokenOwnerFunds && !this.props.loadingAccounts) {
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
          if (!this.props.tokenOwnerHasInsufficientFunds && this.props.tokenOwnerBalance > 0.0000001) {
            ReactGA.event({
              category: 'User',
              action: 'has web3 and main net and has funds'
            });
          }
        }
      }
    }
  }

  backToHome(e) {
    this.props.appStateActions.setAppState(appStates.INIT);
  }

  handleChange(e) {
    this.props.tokenOwnerActions.setTokenOwner(e.target.value);
    // if selected specific account
    if (e.target.value !== initialState.tokenOwner) {
      this.props.tokenOwnerFundsActions.checkFunds(e.target.value);
    } else {
      this.props.tokenOwnerFundsActions.setTokenOwnerHasInsufficientFunds(false);
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

    let error = (this.props.accounts.length === 0 || this.props.tokenOwnerHasInsufficientFunds) && !this.props.loadingAccounts && !this.props.checkingTokenOwnerFunds;

    let menuItems;
    let contentRight = "";
    if (this.props.loadingAccounts) {
      menuItems = (
        <MenuItem
          value={initialState.tokenOwner}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          Loading accounts...
        </MenuItem>
      );
      contentRight = (
        <Typography
          align="left"
          variant="body1"
          className={error ? "typography_error" : "typography"}
        >
          ETH account. This account will be owner of the token!
        </Typography>
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
      let descriptionText;
      if (this.props.tokenOwnerHasInsufficientFunds) {
        descriptionText = "This account has insufficient funds.";
      } else {
        descriptionText = "ETH account. This account will be owner of the token!";
      }
      contentRight = (
        <Typography
          align="left"
          variant="body1"
          className={error ? "typography_error" : "typography"}
        >
          {descriptionText}
        </Typography>
      );
    } else {
      menuItems = (
        <MenuItem
          value={initialState.tokenOwner}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          No available accounts
        </MenuItem>
      );
      if (this.props.network === NO_NETWORK) {
        contentRight = (
          <Typography
            align="left"
            variant="body1"
            className={error ? "typography_error" : "typography"}
          >
            There are no available accounts.
            Please make sure that you run Metamask or any other Ethereum wallet with at least one UNLOCKED account, and refresh the page.
          </Typography>
        );
      } else {
        if (this.props.walletNeedsToBeUnlocked) {
          contentRight = (
            <span
              className="btn btn-unlock-wallet wow fadeInUp"
              data-wow-duration="1000ms"
              data-wow-delay="400ms"
              onClick={this.handleUnlockWallet}
            >
              <FontAwesomeIcon className="fa_coins" icon={faWallet} />
              Connect to Wallet
            </span>
          );
        } else {
          contentRight = (
            <Typography
              align="left"
              variant="body1"
              className={error ? "typography_error" : "typography"}
            >
              Ethereum wallet is detected, but there are no accounts available. If you are using Metamask, please LOG IN to it!
              Otherwise you should UNLOCK your wallet or CREATE an account in your wallet.
            </Typography>
          );
        }
      }
    }

    return (
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
          <p onClick={this.backToHome}>Payment Panel</p>
        </CardContent>
      </Card>
    );
  }
}

TokenOwner.propTypes = {
  network: PropTypes.string.isRequired,
  tokenOwnerHasInsufficientFunds: PropTypes.bool.isRequired,
  checkingTokenOwnerFunds: PropTypes.bool.isRequired,
  checkingNetwork: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  tokenOwnerBalance: PropTypes.number.isRequired,
  serviceFee: PropTypes.number.isRequired,
  loadingAccounts: PropTypes.bool.isRequired,
  walletNeedsToBeUnlocked: PropTypes.bool.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  tokenOwnerFundsActions: PropTypes.object.isRequired,
  walletActions: PropTypes.object.isRequired,
  appStateActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    loadingAccounts: state.loadingAccounts,
    tokenOwner: state.tokenOwner,
    tokenOwnerBalance: state.tokenOwnerBalance,
    serviceFee: state.serviceFee,
    checkingNetwork: state.checkingNetwork,
    checkingTokenOwnerFunds: state.checkingTokenOwnerFunds,
    tokenOwnerHasInsufficientFunds: state.tokenOwnerHasInsufficientFunds,
    network: state.network,
    walletNeedsToBeUnlocked: state.walletNeedsToBeUnlocked
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch),
    tokenOwnerFundsActions: bindActionCreators(tokenOwnerFundsActions, dispatch),
    walletActions: bindActionCreators(walletActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenOwner);
