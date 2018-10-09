import React, { Component } from 'react';
import './App.css';
import TokenInfo from './app/components/TokenInfo';
import TokenType from './app/components/TokenType';
import TokenOwner from './app/components/TokenOwner';
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
        <Footer />
      </div>
    );
  }
}

export default App;
