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

class App extends Component {

  componentWillMount(nextProps) {
    document.title = "TokenMint - An ERC20 & ERC223 Token Generator";
  }

  render() {
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
          <TokenOwner />
          <TokenType />
          <TokenInfo />
          <Footer />
        </CSSTransitionGroup>
      );
    }

    return (
      <div className="App">
        <Header />
        {content}
      </div>
    );
  }
}

App.propTypes = {
  appState: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    appState: state.appState
  };
}

export default connect(mapStateToProps)(App);
