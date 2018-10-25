import React, { Component } from 'react';
import './App.css';
import TokenInfo from './app/components/TokenInfo';
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

class App extends Component {

  render() {
    let content;
    if (this.props.appState === appStates.PENDING_CONFIRMATION) {
      content = (<ConfirmationPanel />);
    } else if (this.props.appState === appStates.MINING_FAILED) {
      content = (<ErrorPanel />);
    } else if (this.props.appState === appStates.MINING_IN_PROGRESS) {
      content = (<MiningInProgressPanel />);
    }else if (this.props.appState === appStates.MINING_FINISHED) {
      content = (<SuccessMessagePanel />);
    } else {
      content = (
        <div>
          <TokenOwner />
          <TokenInfo />
          <TokenType />
          <Footer />
        </div>
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
