import React from 'react';
import './css/InfoPanel.css';
import { Typography, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import appStates from '../reducers/appStates';
import * as decimalsActions from '../actions/decimalsActions';
import * as tokenNameActions from '../actions/tokenNameActions';
import * as tokenSymbolActions from '../actions/tokenSymbolActions';
import * as totalSupplyActions from '../actions/totalSupplyActions';
import * as tokenTypeActions from '../actions/tokenTypeActions';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import * as createTokensActions from '../actions/createTokensActions';
import * as appStateActions from '../actions/appStateActions';
import * as tokenOwnerFundsActions from '../actions/tokenOwnerFundsActions';
import * as infoMessageActions from '../actions/infoMessageActions';
import initialState from '../reducers/initialState';

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleBackClick(e) {
    this.props.decimalsActions.setDecimals(initialState.decimals);
    this.props.tokenNameActions.setTokenName(initialState.tokenName);
    this.props.tokenSymbolActions.setTokenSymbol(initialState.tokenSymbol);
    this.props.totalSupplyActions.setTotalSupply(initialState.totalSupply);
    this.props.tokenTypeActions.setTokenType(initialState.tokenType);
    this.props.tokenOwnerActions.setTokenOwner(initialState.tokenOwner);
    this.props.appStateActions.setAppState(initialState.appState);
    this.props.tokenOwnerFundsActions.setCheckingTokenOwnerFunds(initialState.checkingTokenOwnerFunds);
    this.props.tokenOwnerFundsActions.setTokenOwnerHasEnoughFunds(initialState.tokenOwnerHasEnoughFunds);
    this.props.infoMessageActions.setInfoMessage(initialState.infoMessage);
  }

  render() {
    let footer;
    let typographyColor = "default";
    if (this.props.appState === appStates.MINING_IN_PROGRESS) {
      footer = <LinearProgress className="linear_progress" />;
    } else if (this.props.appState === appStates.MINING_FINISHED) {
      footer = (
        <span
          className="btn-basic btn-back wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleBackClick}
        >
          Back
        </span>
      );
    } else if (this.props.appState === appStates.MINING_FAILED) {
      typographyColor = "error";
      footer = (
        <span
          className="btn-basic btn-back wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleBackClick}
        >
          Back
        </span>
      );
    } else {
      footer = "";
    }

    return (
      <form className="main_form">
        <Typography
          align="center"
          color={typographyColor}
          variant="headline"
          className="typography"
        >
          {this.props.infoMessage}
        </Typography>
        {footer}
      </form>
    );
  }
}

InfoPanel.propTypes = {
  appState: PropTypes.number.isRequired,
  infoMessage: PropTypes.string.isRequired,
  decimalsActions: PropTypes.object.isRequired,
  tokenNameActions: PropTypes.object.isRequired,
  tokenSymbolActions: PropTypes.object.isRequired,
  totalSupplyActions: PropTypes.object.isRequired,
  tokenTypeActions: PropTypes.object.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  createTokensActions: PropTypes.object.isRequired,
  appStateActions: PropTypes.object.isRequired,
  tokenOwnerFundsActions: PropTypes.object.isRequired,
  infoMessageActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    appState: state.appState,
    infoMessage: state.infoMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    decimalsActions: bindActionCreators(decimalsActions, dispatch),
    tokenNameActions: bindActionCreators(tokenNameActions, dispatch),
    tokenSymbolActions: bindActionCreators(tokenSymbolActions, dispatch),
    totalSupplyActions: bindActionCreators(totalSupplyActions, dispatch),
    tokenTypeActions: bindActionCreators(tokenTypeActions, dispatch),
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch),
    createTokensActions: bindActionCreators(createTokensActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    tokenOwnerFundsActions: bindActionCreators(tokenOwnerFundsActions, dispatch),
    infoMessageActions: bindActionCreators(infoMessageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);

