import React from 'react';
import './css/Footer.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputValidator from '../../tools/InputValidator';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import * as appStateActions from '../actions/appStateActions';
import appStates from '../reducers/appStates';
import { Tooltip } from '@material-ui/core';
import { NO_NETWORK } from '../../api/mintApi';

export class ICOFooter extends React.Component {

  constructor(props) {
    super(props);
    this.handleICOCreation = this.handleICOCreation.bind(this);
    this.isICOCreationEnabled = this.isICOCreationEnabled.bind(this);
  }

  isICOCreationEnabled() {
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
    );
  }

  handleICOCreation(e) {
    if (this.props.network === NO_NETWORK) {
      this.props.appStateActions.setAppState(appStates.INSTALL_WALLET);
    } else {
      this.props.appStateActions.setAppState(appStates.HANDLE_PAYMENT);
    }
  }

  render() {
    let createBtn = this.isICOCreationEnabled() ?
      (
        <span
          className="btn btn-common-mint wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleICOCreation}
        >
          <FontAwesomeIcon className="fa_coins" icon={faCoins} />
          Create ICO
        </span>
      ) : (
        <Tooltip
          classes={{
            tooltip: "tooltip_disabled"
          }}
          title="Please fill in all the parameters above to be able to proceed"
        >
          <span
            className="btn btn-disabled-mint wow fadeInUp"
            data-wow-duration="1000ms"
            data-wow-delay="400ms"
          >
            <FontAwesomeIcon className="fa_coins" icon={faCoins} />
            Create ICO
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

ICOFooter.propTypes = {
  appStateActions: PropTypes.object.isRequired,
  tokenName: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  icoRate: PropTypes.string.isRequired,
  icoCap: PropTypes.string.isRequired,
  icoGoal: PropTypes.string.isRequired,
  icoWallet: PropTypes.string.isRequired,
  icoOpeningTime: PropTypes.string.isRequired,
  icoClosingTime: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    tokenName: state.tokenName,
    tokenSymbol: state.tokenSymbol,
    decimals: state.decimals,
    tokenType: state.tokenType,
    network: state.network,
    icoRate: state.icoRate,
    icoCap: state.icoCap,
    icoGoal: state.icoGoal,
    icoWallet: state.icoWallet,
    icoOpeningTime: state.icoOpeningTime,
    icoClosingTime: state.icoClosingTime
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appStateActions: bindActionCreators(appStateActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ICOFooter);
