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
import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as createTokensActions from '../actions/createTokensActions';
import * as appStateActions from '../actions/appStateActions';
import * as infoMessageActions from '../actions/infoMessageActions';
import * as networkActions from '../actions/networkActions';
import * as tokenOwnerFundsActions from '../actions/tokenOwnerFundsActions';
import initialState from '../reducers/initialState';
import InputValidator from '../../tools/InputValidator';
import ReactGA from 'react-ga';
import { NO_NETWORK } from '../../api/mintApi';

export class ConfirmationPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.isConfirmationEnabled = this.isConfirmationEnabled.bind(this);
  }

  componentWillMount() {
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
    ) && !this.props.checkingTokenOwnerFunds
      && !this.props.tokenOwnerHasInsufficientFunds
      && !this.props.loadingAccounts
      && this.props.serviceFee > 0
      && this.props.network !== NO_NETWORK;
  }

  handleCancel(e) {
    this.props.infoMessageActions.setInfoMessage(initialState.infoMessage);
    this.props.appStateActions.setAppState(initialState.appState);
    this.props.networkActions.getNetworkType();
    this.props.tokenOwnerFundsActions.checkFunds(this.props.tokenOwner);
  }

  handleConfirm(e) {
    this.props.createTokensActions.createTokens(
      this.props.tokenName.trim(),
      this.props.tokenSymbol,
      this.props.decimals,
      this.props.totalSupply,
      this.props.tokenType,
      this.props.tokenOwner,
      this.props.serviceFee
    );
  }

  render() {
    let confirmButton = this.isConfirmationEnabled() ?
      (
        <span
          className="btn btn-confirm wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleConfirm}
        >
          <FontAwesomeIcon className="fa_confirm_icon" icon={faCheck} />
          {!this.props.isMobileDevice && "Confirm"}
        </span>
      ) : (
        <span
          className="btn btn-confirm-disabled wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
        >
          <FontAwesomeIcon className="fa_confirm_icon" icon={faCheck} />
          {!this.props.isMobileDevice && "Confirm"}
        </span>
      );

    let serviceFeeText;
    let serviceFeeTypographyClass;
    if (this.props.serviceFee === 0) {
      serviceFeeText = "Calculating...";
      serviceFeeTypographyClass = "typography_right";
    } else if (this.props.serviceFee === -1) {
      serviceFeeText = "Unavailable. Please make sure you are connected to the wallet and refresh the page.";
      serviceFeeTypographyClass = "typography_right_err";
    } else {
      serviceFeeText = "29.99$ (" + this.props.serviceFee.toFixed(8) + " ETH)";
      serviceFeeTypographyClass = "typography_right";
    }

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
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Service Fee:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className={serviceFeeTypographyClass}
                >
                  {serviceFeeText}
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
                  Mining Fee:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className={serviceFeeTypographyClass}
                >
                  Should be set in wallet app
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
                onClick={this.handleCancel}
              >
                <FontAwesomeIcon className="fa_back_icon" icon={faChevronLeft} />
                {!this.props.isMobileDevice && " Back"}
                </span>
            </Grid>
            <Grid item xs={6} md={6} className="grid_cell">
              {confirmButton}
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

ConfirmationPanel.propTypes = {
  tokenOwnerFundsActions: PropTypes.object.isRequired,
  createTokensActions: PropTypes.object.isRequired,
  appStateActions: PropTypes.object.isRequired,
  infoMessageActions: PropTypes.object.isRequired,
  networkActions: PropTypes.object.isRequired,
  tokenName: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  totalSupply: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  checkingTokenOwnerFunds: PropTypes.bool.isRequired,
  tokenOwnerHasInsufficientFunds: PropTypes.bool.isRequired,
  loadingAccounts: PropTypes.bool.isRequired,
  serviceFee: PropTypes.number.isRequired,
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
    checkingTokenOwnerFunds: state.checkingTokenOwnerFunds,
    tokenOwnerHasInsufficientFunds: state.tokenOwnerHasInsufficientFunds,
    loadingAccounts: state.loadingAccounts,
    serviceFee: state.serviceFee,
    network: state.network,
    isMobileDevice: state.isMobileDevice
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createTokensActions: bindActionCreators(createTokensActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    infoMessageActions: bindActionCreators(infoMessageActions, dispatch),
    networkActions: bindActionCreators(networkActions, dispatch),
    tokenOwnerFundsActions: bindActionCreators(tokenOwnerFundsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPanel);
