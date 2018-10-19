import React from 'react';
import './css/InfoPanel.css';
import { Typography, LinearProgress, Divider, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle, faClipboard } from '@fortawesome/free-solid-svg-icons';
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
import * as accountsActions from '../actions/accountsActions';
import initialState from '../reducers/initialState';

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleCopyToClipboard = this.handleCopyToClipboard.bind(this);
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
    this.props.accountsActions.loadAllAccounts();
  }

  // a hack that creates an element outside the screen and uses it to copy its content to clipboard
  handleCopyToClipboard(e) {
    const el = document.createElement('textarea');
    el.value = this.props.infoMessage;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  render() {
    let info;
    let footer;
    if (this.props.appState === appStates.MINING_IN_PROGRESS) {
      info = (
        <div>
          <Typography
            align="center"
            color="default"
            variant="headline"
            className="typography_header"
          >
            {this.props.infoMessage}
          </Typography>
          <Divider />
          <Typography
            align="center"
            color="default"
            variant="subheading"
            className="typography"
          >
            Please do not leave this page...
          </Typography>
        </div>
      );
      footer = <LinearProgress className="linear_progress" />;
    } else if (this.props.appState === appStates.MINING_FINISHED) {
      info = (
        <div>
          <Typography
            align="center"
            color="default"
            variant="headline"
            className="typography_header"
          >
            <FontAwesomeIcon icon={faCheckCircle} size="lg" color="green" /> Your tokens have been successfully created!
          </Typography>
          <Divider />
          <Typography
            align="center"
            color="default"
            variant="subheading"
            className="typography"
          >
            Contract is deployed at address:
          </Typography>
          <Typography
            align="center"
            color="default"
            variant="subheading"
            className="typography"
          >
            [{this.props.infoMessage}]
            <Tooltip title="Copy to clipboard">
              <FontAwesomeIcon className="fa_clipboard" icon={faClipboard} onClick={this.handleCopyToClipboard} />
            </Tooltip>
          </Typography>
          <Typography
            align="center"
            color="default"
            variant="subheading"
            className="typography"
          >
            Thank You for using TokenMint!
          </Typography>
        </div>
      );
      footer = (
        <span
          className="btn-basic btn-back wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleBackClick}
        >
          Create new token
        </span>
      );
    } else if (this.props.appState === appStates.MINING_FAILED) {
      info = info = (
        <div>
          <Typography
            align="center"
            color="error"
            variant="headline"
            className="typography_header"
          >
            <FontAwesomeIcon icon={faTimesCircle} size="lg" /> Oops, something went wrong!
          </Typography>
          <Divider />
          <Typography
            align="center"
            color="error"
            variant="subheading"
            className="typography"
          >
            {this.props.infoMessage}
          </Typography>
        </div>
      );
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
      info = "";
      footer = "";
    }

    return (
      <form className="main_form">
        {info}
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
  infoMessageActions: PropTypes.object.isRequired,
  accountsActions: PropTypes.object.isRequired
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
    infoMessageActions: bindActionCreators(infoMessageActions, dispatch),
    accountsActions: bindActionCreators(accountsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);

