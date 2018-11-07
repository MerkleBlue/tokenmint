import React from 'react';
import './css/Footer.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputValidator from '../../tools/InputValidator';
import { bindActionCreators } from 'redux';
import * as appStateActions from '../actions/appStateActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import appStates from '../reducers/appStates';
import { Tooltip } from '@material-ui/core';
import { NO_NETWORK } from '../../api/mintApi';


export class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.handleTokenCreation = this.handleTokenCreation.bind(this);
    this.isCreationEnabled = this.isCreationEnabled.bind(this);
  }

  isCreationEnabled() {
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

  handleTokenCreation(e) {
    this.props.appStateActions.setAppState(appStates.PENDING_CONFIRMATION);
  }

  render() {
    const tooltipTitle = this.props.tokenOwnerHasInsufficientFunds ?
      "The selected account has insufficient funds" :
      "Please fill in all the parameters above to enable token creation";
    let createBtn = this.isCreationEnabled() ?
      (
        <span
          className="btn btn-common wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleTokenCreation}
        >
          <FontAwesomeIcon className="fa_coins" icon={faCoins} />
          Mint tokens
        </span>
      ) : (
        <Tooltip
          classes={{
            tooltip: "tooltip_disabled"
          }}
          title={tooltipTitle}
        >
          <span
            className="btn btn-disabled wow fadeInUp"
            data-wow-duration="1000ms"
            data-wow-delay="400ms"
          >
            <FontAwesomeIcon className="fa_coins" icon={faCoins} />
            Mint tokens
          </span>
        </Tooltip>
      );

    return (
      <form className="footer_main_form">
        {createBtn}
      </form>
    );
  }
}

Footer.propTypes = {
  appStateActions: PropTypes.object.isRequired,
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
    network: state.network
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appStateActions: bindActionCreators(appStateActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

