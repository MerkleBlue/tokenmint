import React, { Component } from 'react';
import './App.css';
import TokenInfo from './app/components/TokenInfo';
import TokenType from './app/components/TokenType'; //eslint-disable-line import/no-named-as-default
import TokenOwner from './app/components/TokenOwner';
import Footer from './app/components/Footer';
import Header from './app/components/Header';
import InfoPanel from './app/components/InfoPanel';
import ConfirmationPanel from './app/components/ConfirmationPanel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import appStates from './app/reducers/appStates';

class App extends Component {

  render() {
    let content;
    if (this.props.appState === appStates.INIT) {
      content = (
        <div>
          <TokenOwner />
          <TokenInfo />
          <TokenType />
          <Footer />
        </div>
      );
    } else if (this.props.appState === appStates.PENDING_CONFIRMATION) {
      content = (<ConfirmationPanel />);
    } else {
      content = (<InfoPanel />);
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
