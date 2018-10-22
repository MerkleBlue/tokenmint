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
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as createTokensActions from '../actions/createTokensActions';
import * as appStateActions from '../actions/appStateActions';
import * as infoMessageActions from '../actions/infoMessageActions';
import initialState from '../reducers/initialState';
import InputValidator from '../../tools/InputValidator';

class ConfirmationPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.isCreationEnabled = this.isCreationEnabled(this);
  }

  isCreationEnabled() {
    return InputValidator.isInputValid(
      this.props.tokenName,
      this.props.tokenSymbol,
      this.props.decimals,
      this.props.totalSupply,
      this.props.tokenOwner
    ) && !this.props.checkingTokenOwnerFunds
      && this.props.tokenOwnerHasEnoughFunds
      && !this.props.loadingAccounts;
  }

  handleCancel(e) {
    this.props.appStateActions.setAppState(initialState.appState);
    this.props.infoMessageActions.setInfoMessage(initialState.infoMessage);
    //this.props.accountsActions.loadAllAccounts();
  }

  // a hack that creates an element outside the screen and uses it to copy its content to clipboard
  handleConfirm(e) {
    this.props.createTokensActions.createTokens(
      this.props.tokenName.trim(),
      this.props.tokenSymbol,
      this.props.decimals,
      this.props.totalSupply,
      this.props.tokenType,
      this.props.tokenOwner
    );
  }

  render() {
    return (
      <div>
        <Card className="card">
          <CardHeader
            title="Please Confirm Token Creation Parameters"
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
            <Grid className="grid_container" container wrap="nowrap" spacing={8}>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_left"
                >
                  Token Owner:
              </Typography>
              </Grid>
              <Grid item xs className="grid_cell">
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_right"
                  gutterBottom
                >
                  {this.props.tokenOwner}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container wrap="nowrap" spacing={8}>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_left"
                >
                  Token Name:
              </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_right"
                >
                  {this.props.tokenName}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container wrap="nowrap" spacing={8}>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_left"
                >
                  Token Symbol:
              </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_right"
                >
                  {this.props.tokenSymbol}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container wrap="nowrap" spacing={8}>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_left"
                >
                  Decimals:
              </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_right"
                >
                  {this.props.decimals}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container wrap="nowrap" spacing={8}>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_left"
                >
                  Total Supply:
              </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_right"
                >
                  {this.props.totalSupply}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container wrap="nowrap" spacing={8}>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_left"
                >
                  Token Type:
              </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_right"
                >
                  {this.props.tokenType}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container wrap="nowrap" spacing={8}>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_left"
                >
                  Service Fee:
              </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  align="left"
                  variant="subtitle1"
                  className="typography_right"
                >
                  100$ (mining fee excluded)
              </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <form className="footer_main_form">
          <Grid container wrap="nowrap" spacing={8}>
            <Grid item xs className="grid_cell">
              <span
                className="btn btn-cancel wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleCancel}
              >
                <FontAwesomeIcon className="fa_icons" icon={faTimes} />
                Back
              </span>
            </Grid>
            <Grid item xs className="grid_cell">
              <span
                className="btn btn-common wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleConfirm}
              >
                <FontAwesomeIcon className="fa_icons" icon={faCheck} />
                Confirm
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

ConfirmationPanel.propTypes = {
  createTokensActions: PropTypes.object.isRequired,
  appStateActions: PropTypes.object.isRequired,
  infoMessageActions: PropTypes.object.isRequired,
  tokenName: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  totalSupply: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  checkingTokenOwnerFunds: PropTypes.bool.isRequired,
  tokenOwnerHasEnoughFunds: PropTypes.bool.isRequired,
  loadingAccounts: PropTypes.bool.isRequired
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
    tokenOwnerHasEnoughFunds: state.tokenOwnerHasEnoughFunds,
    loadingAccounts: state.loadingAccounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createTokensActions: bindActionCreators(createTokensActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    infoMessageActions: bindActionCreators(infoMessageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPanel);
