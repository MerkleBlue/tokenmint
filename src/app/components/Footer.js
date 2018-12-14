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
      this.props.totalSupply
    );
  }

  handleTokenCreation(e) {
    if (this.props.network === NO_NETWORK) {
      this.props.appStateActions.setAppState(appStates.INSTALL_WALLET);
    } else {
      this.props.appStateActions.setAppState(appStates.HANDLE_PAYMENT);
    }
  }

  render() {
    let createBtn = this.isCreationEnabled() ?
      (
        <span
          className="btn btn-common-mint wow fadeInUp"
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
          title="Please fill in all the parameters above to enable token creation"
        >
          <span
            className="btn btn-disabled-mint wow fadeInUp"
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
  network: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    tokenName: state.tokenName,
    tokenSymbol: state.tokenSymbol,
    decimals: state.decimals,
    totalSupply: state.totalSupply,
    tokenType: state.tokenType,
    network: state.network
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appStateActions: bindActionCreators(appStateActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

