
import React from 'react';
import ICOAttributesPanel from './app/components/ICOAttributesPanel'; //eslint-disable-line import/no-named-as-default
import ICOTokenAttributesPanel from './app/components/ICOTokenAttributesPanel'; //eslint-disable-line import/no-named-as-default
import Header from './app/components/Header'; //eslint-disable-line import/no-named-as-default
import ICOFooter from './app/components/ICOFooter'; //eslint-disable-line import/no-named-as-default
import InstallMetaMaskPanel from './app/components/InstallMetaMaskPanel'; //eslint-disable-line import/no-named-as-default
import InstallCoinbasePanel from './app/components/InstallCoinbasePanel'; //eslint-disable-line import/no-named-as-default
import HandlePaymentPanel from './app/components/HandlePaymentPanel'; //eslint-disable-line import/no-named-as-default
import ErrorPanel from './app/components/ErrorPanel'; //eslint-disable-line import/no-named-as-default
import LoadingPanel from './app/components/LoadingPanel'; //eslint-disable-line import/no-named-as-default
import ICOSuccessMessagePanel from './app/components/ICOSuccessMessagePanel'; //eslint-disable-line import/no-named-as-default
import ICOConfirmationPanel from './app/components/ICOConfirmationPanel'; //eslint-disable-line import/no-named-as-default
import ICOInfoPanel from './app/components/ICOInfoPanel'; //eslint-disable-line import/no-named-as-default
import './App.css';
import FullStory from 'react-fullstory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import appStates from './app/reducers/appStates';
import { CSSTransitionGroup } from 'react-transition-group';
import pack from '../package.json';

class IcoApp extends React.Component {

  componentDidMount() {
    document.title = "TokenMint - An ICO Generator";
  }

  render() {
    let content;
    if (this.props.icoAppState === appStates.INSTALL_WALLET) {
      content = !this.props.isMobileDevice ?
        (
          <CSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            <InstallMetaMaskPanel isIco />
          </CSSTransitionGroup>
        ) : (
          <CSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            <InstallCoinbasePanel isIco />
          </CSSTransitionGroup>
        );
    } else if (this.props.icoAppState === appStates.PENDING_CONFIRMATION) {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <ICOConfirmationPanel />
        </CSSTransitionGroup>
      );
    } else if (this.props.icoAppState === appStates.MINING_FAILED) {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <ErrorPanel isIco />
        </CSSTransitionGroup>
      );
    } else if (this.props.icoAppState === appStates.MINING_IN_PROGRESS) {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <LoadingPanel isIco />
        </CSSTransitionGroup>
      );
    } else if (this.props.icoAppState === appStates.MINING_CONFIRMED) {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <ICOSuccessMessagePanel />
        </CSSTransitionGroup>
      );
    } else if (this.props.icoAppState === appStates.HANDLE_PAYMENT) {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <HandlePaymentPanel isIco />
        </CSSTransitionGroup>
      );
    } else {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <ICOInfoPanel />
          <ICOTokenAttributesPanel />
          <ICOAttributesPanel />
          <ICOFooter />
        </CSSTransitionGroup>
      );
    }

    return (
      <div className="App">
        <FullStory org="G18A4" />
        <Header isIco />
        {content}
        {!this.props.isMobileDevice &&
          <div className="copyright">Copyright {new Date().getFullYear()} © TokenMint.io. All rights reserved. Version {pack.version}</div>
        }
      </div>
    );
  }
}

IcoApp.propTypes = {
  icoAppState: PropTypes.number.isRequired,
  network: PropTypes.string.isRequired,
  checkingNetwork: PropTypes.bool.isRequired,
  isMobileDevice: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    icoAppState: state.icoAppState,
    network: state.network,
    checkingNetwork: state.checkingNetwork,
    isMobileDevice: state.isMobileDevice
  };
}

export default connect(mapStateToProps)(IcoApp);
