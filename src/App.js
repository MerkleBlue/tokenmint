import React, { Component } from 'react';
import './App.css';
import TokenInfo from './app/components/TokenInfo'; //eslint-disable-line import/no-named-as-default
import TokenType from './app/components/TokenType'; //eslint-disable-line import/no-named-as-default
import TokenOwner from './app/components/TokenOwner'; //eslint-disable-line import/no-named-as-default
import Footer from './app/components/Footer'; //eslint-disable-line import/no-named-as-default
import Header from './app/components/Header';
import ConfirmationPanel from './app/components/ConfirmationPanel'; //eslint-disable-line import/no-named-as-default
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import appStates from './app/reducers/appStates';
import ErrorPanel from './app/components/ErrorPanel'; //eslint-disable-line import/no-named-as-default
import MiningInProgressPanel from './app/components/MiningInProgressPanel'; //eslint-disable-line import/no-named-as-default
import SuccessMessagePanel from './app/components/SuccessMessagePanel'; //eslint-disable-line import/no-named-as-default
import { CSSTransitionGroup } from 'react-transition-group';
import FullStory from 'react-fullstory';
import pack from '../package.json';
import NetworkWarning from './app/components/NetworkWarning';

class App extends Component {

  componentWillMount(nextProps) {
    document.title = "TokenMint - An ERC20 & ERC223 Token Generator";
  }

  render() {
    console.log(this.props.network);
    let content;
    if (this.props.appState === appStates.PENDING_CONFIRMATION) {
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
          <MiningInProgressPanel />
        </CSSTransitionGroup>
      );
    } else if (this.props.appState === appStates.MINING_CONFIRMED) {
      content = (<SuccessMessagePanel />);
    } else {
      content = (
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {(!this.props.checkingNetwork && this.props.network !== "main") && <NetworkWarning />}
          <TokenOwner />
          <TokenType />
          <TokenInfo />
          <Footer />
        </CSSTransitionGroup>
      );
    }

    return (
      <div className="App">
        <FullStory org="G18A4" />
        <Header />
        {content}
        <div className="copyright">Copyright {new Date().getFullYear()} © TokenMint.io. All rights reserved. Version {pack.version}</div>
      </div>
    );
  }
}

App.propTypes = {
  appState: PropTypes.number.isRequired,
  network: PropTypes.string.isRequired,
  checkingNetwork: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    appState: state.appState,
    network: state.network,
    checkingNetwork: state.checkingNetwork
  };
}

export default connect(mapStateToProps)(App);
