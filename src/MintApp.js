import React, { Component } from 'react';
import './App.css';
import TokenInfo from './app/components/TokenInfo'; //eslint-disable-line import/no-named-as-default
import TokenType from './app/components/TokenType'; //eslint-disable-line import/no-named-as-default
import Footer from './app/components/Footer'; //eslint-disable-line import/no-named-as-default
import Header from './app/components/Header'; //eslint-disable-line import/no-named-as-default
import ConfirmationPanel from './app/components/ConfirmationPanel'; //eslint-disable-line import/no-named-as-default
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import appStates from './app/reducers/appStates';
import ErrorPanel from './app/components/ErrorPanel'; //eslint-disable-line import/no-named-as-default
import LoadingPanel from './app/components/LoadingPanel'; //eslint-disable-line import/no-named-as-default
import SuccessMessagePanel from './app/components/SuccessMessagePanel'; //eslint-disable-line import/no-named-as-default
import { CSSTransitionGroup } from 'react-transition-group';
import FullStory from 'react-fullstory';
import pack from '../package.json';
import InstallMetaMaskPanel from './app/components/InstallMetaMaskPanel'; //eslint-disable-line import/no-named-as-default
import InstallCoinbasePanel from './app/components/InstallCoinbasePanel'; //eslint-disable-line import/no-named-as-default
import HandlePaymentPanel from './app/components/HandlePaymentPanel'; //eslint-disable-line import/no-named-as-default

class MintApp extends Component {

  componentDidMount() {
    document.title = "TokenMint - An ERC20 & ERC223 Token Generator";
  }

  render() {
    let content;
    if (this.props.appState === appStates.INSTALL_WALLET) {
      content = !this.props.isMobileDevice ?
      (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <InstallMetaMaskPanel />
        </CSSTransitionGroup>
      ) : (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <InstallCoinbasePanel />
        </CSSTransitionGroup>
      );
    } else if (this.props.appState === appStates.PENDING_CONFIRMATION) {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <ConfirmationPanel />
        </CSSTransitionGroup>
      );
    } else if (this.props.appState === appStates.MINING_FAILED) {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <ErrorPanel />
        </CSSTransitionGroup>
      );
    } else if (this.props.appState === appStates.MINING_IN_PROGRESS) {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <LoadingPanel />
        </CSSTransitionGroup>
      );
    } else if (this.props.appState === appStates.MINING_CONFIRMED) {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <SuccessMessagePanel />
        </CSSTransitionGroup>
      );
    } else if (this.props.appState === appStates.HANDLE_PAYMENT) {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <HandlePaymentPanel />
        </CSSTransitionGroup>
      );
    } else {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <TokenType />
          <TokenInfo />
          <Footer />
        </CSSTransitionGroup>
      );
    }

    return (
      <div className="App">
        <FullStory org="G18A4" />
        <Header isIco={false} />
        {content}
        {!this.props.isMobileDevice &&
          <div className="copyright">Copyright {new Date().getFullYear()} © TokenMint.io. All rights reserved. Version {pack.version}</div>
        }
      </div>
    );
  }
}

MintApp.propTypes = {
  appState: PropTypes.number.isRequired,
  network: PropTypes.string.isRequired,
  checkingNetwork: PropTypes.bool.isRequired,
  isMobileDevice: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    appState: state.appState,
    network: state.network,
    checkingNetwork: state.checkingNetwork,
    isMobileDevice: state.isMobileDevice
  };
}

export default connect(mapStateToProps)(MintApp);
