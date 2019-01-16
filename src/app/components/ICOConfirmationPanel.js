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
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as appStateActions from '../actions/appStateActions';
import * as launchICOActions from '../actions/launchICOActions';
import InputValidator from '../../tools/InputValidator';
import ReactGA from 'react-ga';
import appStates from '../reducers/appStates';
import initialState from '../reducers/initialState';
import moment from 'moment';

export class ICOConfirmationPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.isConfirmationEnabled = this.isConfirmationEnabled.bind(this);
  }

  componentDidMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/confirm"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/confirm');
  }

  isConfirmationEnabled() {
    return InputValidator.areICOAttributesValid(
      this.props.tokenName,
      this.props.tokenSymbol,
      this.props.decimals,
      this.props.icoRate,
      this.props.icoCap,
      this.props.icoGoal,
      this.props.icoWallet,
      this.props.icoOpeningTime,
      this.props.icoClosingTime
    ) && this.props.payingAccount !== initialState.payingAccount;
  }

  handleBack(e) {
    this.props.appStateActions.setIcoAppState(appStates.HANDLE_PAYMENT);
  }

  handleConfirm(e) {
    const owner = this.props.payingAccount;
    const tokenArgs = [
      this.props.tokenName,
      this.props.tokenSymbol,
      this.props.decimals,
      0,
      this.props.payingAccount
    ];
    const crowdsaleArgs = [
      Math.round((new Date(this.props.icoOpeningTime).getTime()) / 1000),
      Math.round((new Date(this.props.icoClosingTime).getTime()) / 1000),
      Number(this.props.icoRate),
      this.props.icoWallet,
      "",
      Number(this.props.icoCap),
      Number(this.props.icoGoal),
      ""
    ];
    // TODO: this is a hack. Consider changing in the future
    const tokenServiceFeeETH = Number(this.props.serviceFee)/17;
    const crowdsaleServiceFeeETH = Number(this.props.serviceFee) - tokenServiceFeeETH;
    this.props.launchICOActions.launchICO(owner, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH);
  }

  render() {
    let nextButton = this.isConfirmationEnabled() ?
      (
        <span
          className="btn btn-confirm wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleConfirm}
        >
          <FontAwesomeIcon className="fa_confirm_icon" icon={faCheck} />
          {!this.props.isMobileDevice && " Finish"}
        </span>
      ) : (
        <span
          className="btn btn-confirm-disabled wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
        >
          <FontAwesomeIcon className="fa_confirm_icon" icon={faCheck} />
          {!this.props.isMobileDevice && " Finish"}
        </span>
      );

    const cardHeaderTitle = this.props.isMobileDevice ? "Confirm parameters" : "Please Confirm ICO Creation Parameters!";

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
                  Token rate:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.icoRate} ETH
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
                  ICO goal:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.icoGoal} ETH
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
                  ICO cap:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.icoCap} ETH
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
                  ICO wallet:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.icoWallet}
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
                  ICO opening time:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {moment(this.props.icoOpeningTime).format('MMMM Do YYYY, h:mm:ss a')}
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
                  ICO closing time:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {moment(this.props.icoClosingTime).format('MMMM Do YYYY, h:mm:ss a')}
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
                  Paying Account:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} className="grid_cell">
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                  gutterBottom
                >
                  {this.props.payingAccount}
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
              <Grid item xs={12} md={6} className="grid_cell">
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                  gutterBottom
                >
                  {this.props.serviceFee} ETH (plus mining fee)
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

ICOConfirmationPanel.propTypes = {
  appStateActions: PropTypes.object.isRequired,
  launchICOActions: PropTypes.object.isRequired,
  tokenName: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  icoRate: PropTypes.string.isRequired,
  icoGoal: PropTypes.string.isRequired,
  icoCap: PropTypes.string.isRequired,
  icoWallet: PropTypes.string.isRequired,
  icoOpeningTime: PropTypes.string.isRequired,
  icoClosingTime: PropTypes.string.isRequired,
  payingAccount: PropTypes.string.isRequired,
  isMobileDevice: PropTypes.bool.isRequired,
  serviceFee: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    tokenName: state.tokenName,
    tokenSymbol: state.tokenSymbol,
    decimals: state.decimals,
    icoRate: state.icoRate,
    icoGoal: state.icoGoal,
    icoCap: state.icoCap,
    icoWallet: state.icoWallet,
    icoOpeningTime: state.icoOpeningTime,
    icoClosingTime: state.icoClosingTime,
    payingAccount: state.payingAccount,
    isMobileDevice: state.isMobileDevice,
    serviceFee: state.serviceFee
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    launchICOActions: bindActionCreators(launchICOActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ICOConfirmationPanel);
