import React from 'react';
import './css/Footer.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputValidator from '../../tools/InputValidator';
import { bindActionCreators } from 'redux';
import * as createTokensActions from '../actions/createTokensActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

class Footer extends React.Component {

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
      && this.props.tokenOwnerHasEnoughFunds
      && !this.props.loadingAccounts;
  }

  handleTokenCreation(e) {
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
        <span
          className="btn btn-disabled wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
        >
          <FontAwesomeIcon className="fa_coins" icon={faCoins} />
          Mint tokens
        </span>
      );

    return (
      <form className="footer_main_form">
        {createBtn}
      </form>
    );
  }
}

Footer.propTypes = {
  createTokensActions: PropTypes.object.isRequired,
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
    createTokensActions: bindActionCreators(createTokensActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

