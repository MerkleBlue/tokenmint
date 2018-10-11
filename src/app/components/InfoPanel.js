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
  }

  render() {
    let infoMessage;
    let footer;
    if (this.props.appState === appStates.MINING_IN_PROGRESS) {
      infoMessage = "Your tokens are being mined. This might take a few minutes.";
      footer = <LinearProgress className="linear_progress" />;
    } else if (this.props.appState === appStates.MINING_FINISHED) {
      infoMessage = "Your tokens have been successfully mined, and are ready to be used. Thank You for using TokenMint!";
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
      infoMessage = "";
      footer = "";
    }

    return (
      <form className="main_form">
        <Typography
          align="center"
          color="default"
          variant="headline"
          className="typography"
        >
          {infoMessage}
        </Typography>
        {footer}
      </form>
    );
  }
}

InfoPanel.propTypes = {
  appState: PropTypes.number.isRequired,
  decimalsActions: PropTypes.object.isRequired,
  tokenNameActions: PropTypes.object.isRequired,
  tokenSymbolActions: PropTypes.object.isRequired,
  totalSupplyActions: PropTypes.object.isRequired,
  tokenTypeActions: PropTypes.object.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  createTokensActions: PropTypes.object.isRequired,
  appStateActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    appState: state.appState
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
    appStateActions: bindActionCreators(appStateActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);

