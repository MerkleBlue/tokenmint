import React, { Component } from 'react';
import './App.css';
import TokenInfo from './app/components/TokenInfo';
import TokenType from './app/components/TokenType';
import TokenOwner from './app/components/TokenOwner';
import Footer from './app/components/Footer';
import Header from './app/components/Header';
import InfoPanel from './app/components/InfoPanel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import appStates from './app/reducers/appStates';

class App extends Component {

  render() {
    let content = this.props.appState === appStates.INIT ?
      (
        <div>
          <TokenInfo />
          <TokenType />
          <TokenOwner />
          <Footer />
        </div>
      ) : (
        <InfoPanel />
      );
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
