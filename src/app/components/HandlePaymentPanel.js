import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid
} from '@material-ui/core';
import './css/HandlePaymentPanel.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as appStateActions from '../actions/appStateActions';
import { bindActionCreators } from 'redux';
import initialState from '../reducers/initialState';
import ReactGA from 'react-ga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import NetworkWarning from './NetworkWarning'; //eslint-disable-line import/no-named-as-default
import InputValidator from '../../tools/InputValidator';
import appStates from '../reducers/appStates';
import ConnectToWallet from './ConnectToWallet'; //eslint-disable-line import/no-named-as-default
import TokenOwner from './TokenOwner'; //eslint-disable-line import/no-named-as-default
import PayingAccount from './PayingAccount'; //eslint-disable-line import/no-named-as-default

export class HandlePaymentPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.isNextButtonEnabled = this.isNextButtonEnabled.bind(this);
    this.handleBack = this.handleBack.bind(this);
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

  handleBack(e) {
    if (this.props.isIco) {
      this.props.appStateActions.setIcoAppState(appStates.INIT);
    } else {
      this.props.appStateActions.setAppState(appStates.INIT);
    }
  }

  isNextButtonEnabled() {
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

  handleNextClick(e) {
    if (this.props.isIco) {
      this.props.appStateActions.setIcoAppState(appStates.PENDING_CONFIRMATION);
    } else {
      this.props.appStateActions.setAppState(appStates.PENDING_CONFIRMATION);
    }
  }

  render() {
    let nextButton = this.isNextButtonEnabled() ?
      (
        <span
          className="btn btn-payment-next wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleNextClick}
        >
          {!this.props.isMobileDevice && "Next "}
          <FontAwesomeIcon className="fa_next_icon" icon={faChevronRight} />
        </span>
      ) : (
        <span
          className="btn btn-payment-disabled wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
        >
          {!this.props.isMobileDevice && "Next "}
          <FontAwesomeIcon className="fa_next_icon" icon={faChevronRight} />
        </span>
      );

    let content;
    if (this.props.walletNeedsToBeUnlocked && this.props.accounts.length === 0) {
      content = <ConnectToWallet />;
    } else {
      content = (
        <div>
          <PayingAccount isIco={this.props.isIco} />
          {!this.props.isIco && <TokenOwner />}
        </div>
      );
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
          </CardContent>
        </Card>
        <form className="footer_main_form">
          <Grid container spacing={8}>
            <Grid item xs={6} md={6} className="grid_cell">
              <span
                className="btn btn-cancel wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleBack}
              >
                <FontAwesomeIcon className="fa_back_icon" icon={faChevronLeft} />
                {!this.props.isMobileDevice && " Back"}
              </span>
            </Grid>
            <Grid item xs={6} md={6} className="grid_cell">
              {nextButton}
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

HandlePaymentPanel.propTypes = {
  isIco: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
  payingAccountHasInsufficientFunds: PropTypes.bool.isRequired,
  payingAccountBalance: PropTypes.number.isRequired,
  loadingAccounts: PropTypes.bool.isRequired,
  checkingPayingAccountFunds: PropTypes.bool.isRequired,
  network: PropTypes.string.isRequired,
  checkingNetwork: PropTypes.bool.isRequired,
  isMobileDevice: PropTypes.bool.isRequired,
  payingAccount: PropTypes.string.isRequired,
  walletNeedsToBeUnlocked: PropTypes.bool.isRequired,
  tokenName: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  totalSupply: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  appStateActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    payingAccount: state.payingAccount,
    checkingNetwork: state.checkingNetwork,
    network: state.network,
    walletNeedsToBeUnlocked: state.walletNeedsToBeUnlocked,
    tokenName: state.tokenName,
    tokenSymbol: state.tokenSymbol,
    decimals: state.decimals,
    totalSupply: state.totalSupply,
    tokenOwner: state.tokenOwner,
    tokenType: state.tokenType,
    isMobileDevice: state.isMobileDevice,
    loadingAccounts: state.loadingAccounts,
    checkingPayingAccountFunds: state.checkingPayingAccountFunds,
    payingAccountHasInsufficientFunds: state.payingAccountHasInsufficientFunds,
    payingAccountBalance: state.payingAccountBalance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appStateActions: bindActionCreators(appStateActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HandlePaymentPanel);
