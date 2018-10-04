import React, { Component } from 'react';
import './App.css';
import TokenInfo from './app/components/TokenInfo';
import TokenType from './app/components/TokenType';
import TokenOwner from './app/components/TokenOwner';
import MintTokens from './app/components/MintTokens';
import Footer from './app/components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Work in progress!</h1>
        </header>
        <div>
          <TokenInfo />
          <TokenType />
          <TokenOwner />
          <MintTokens />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
