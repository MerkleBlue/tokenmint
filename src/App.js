import React, { Component } from 'react';
import './App.css';
import TokenInfo from './app/components/TokenInfo';
import TokenType from './app/components/TokenType';
import TokenOwner from './app/components/TokenOwner';
import MintTokens from './app/components/MintTokens';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Work in progress!</h1>
        </header>
        <body>
          <TokenInfo />
          <TokenType />
          <TokenOwner />
          <MintTokens />
        </body>
      </div>
    );
  }
}

export default App;
