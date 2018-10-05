import React, { Component } from 'react';
import './App.css';
import TokenInfo from './app/components/TokenInfo';
import TokenType from './app/components/TokenType';
import TokenOwner from './app/components/TokenOwner';
import MintTokens from './app/components/MintTokens';
import Footer from './app/components/Footer';
import Header from './app/components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TokenInfo />
        <TokenType />
        <TokenOwner />
        <MintTokens />
        <Footer />
      </div>
    );
  }
}

export default App;
