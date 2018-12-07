import React from 'react';
import './css/ConfirmationPanel.css';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as appStateActions from '../actions/appStateActions';
import * as infoMessageActions from '../actions/infoMessageActions';
import * as networkActions from '../actions/networkActions';
import * as payingAccountFundsActions from '../actions/payingAccountFundsActions';
import initialState from '../reducers/initialState';
import InputValidator from '../../tools/InputValidator';
import ReactGA from 'react-ga';
import { NO_NETWORK } from '../../api/mintApi';
import appStates from '../reducers/appStates';

export class ConfirmationPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.isConfirmationEnabled = this.isConfirmationEnabled.bind(this);
  }

  componentDidMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/confirm"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/confirm');
  }

  isConfirmationEnabled() {
    return InputValidator.isInputValid(
      this.props.tokenName,
      this.props.tokenSymbol,
      this.props.decimals,
      this.props.totalSupply,
      this.props.tokenOwner
    );
  }

  handleBack(e) {
    this.props.infoMessageActions.setInfoMessage(initialState.infoMessage);
    this.props.appStateActions.setAppState(initialState.appState);
    this.props.networkActions.getNetworkType();
    this.props.payingAccountFundsActions.checkFunds(this.props.payingAccount);
  }

  handleNext(e) {
    if (this.props.network === NO_NETWORK) {
      this.props.appStateActions.setAppState(appStates.INSTALL_WALLET);
    } else {
      this.props.appStateActions.setAppState(appStates.HANDLE_PAYMENT);
    }
  }

  render() {
    let nextButton = this.isConfirmationEnabled() ?
      (
        <span
          className="btn btn-confirm wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleNext}
        >
        {!this.props.isMobileDevice && "Next "}
        <FontAwesomeIcon className="fa_confirm_icon" icon={faChevronRight} />
        </span>
      ) : (
        <span
          className="btn btn-confirm-disabled wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
        >
        {!this.props.isMobileDevice && "Next "}
        <FontAwesomeIcon className="fa_confirm_icon" icon={faChevronRight} />
        </span>
      );

    const cardHeaderTitle = this.props.isMobileDevice ? "Confirm parameters" : "Please Confirm Token Creation Parameters!";

    return (
      <div>
        <Card className="card">
          <CardHeader
            title={cardHeaderTitle}
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
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Token Owner:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6} className="grid_cell">
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                  gutterBottom
                >
                  {this.props.tokenOwner}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Token Name:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.tokenName}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Token Symbol:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.tokenSymbol}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Decimals:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.decimals}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Total Supply:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.totalSupply}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Token Type:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.tokenType}
                </Typography>
              </Grid>
            </Grid>
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

ConfirmationPanel.propTypes = {
  payingAccountFundsActions: PropTypes.object.isRequired,
  appStateActions: PropTypes.object.isRequired,
  infoMessageActions: PropTypes.object.isRequired,
  networkActions: PropTypes.object.isRequired,
  tokenName: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  totalSupply: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  payingAccount: PropTypes.string.isRequired,
  walletNeedsToBeUnlocked: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
  network: PropTypes.string.isRequired,
  isMobileDevice: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    tokenName: state.tokenName,
    tokenSymbol: state.tokenSymbol,
    decimals: state.decimals,
    totalSupply: state.totalSupply,
    tokenType: state.tokenType,
    tokenOwner: state.tokenOwner,
    payingAccount: state.payingAccount,
    network: state.network,
    isMobileDevice: state.isMobileDevice,
    walletNeedsToBeUnlocked: state.walletNeedsToBeUnlocked,
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    infoMessageActions: bindActionCreators(infoMessageActions, dispatch),
    networkActions: bindActionCreators(networkActions, dispatch),
    payingAccountFundsActions: bindActionCreators(payingAccountFundsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPanel);
