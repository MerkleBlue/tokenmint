import React, { Component } from 'react';
import './App.css';

import cc from 'cryptocompare';

cc.price('ETH', 'USD').then(prices => {
  console.log("Eth price is: " + prices.USD);  // eslint-disable-line no-console
}).catch(e => {
  console.error(e);  // eslint-disable-line no-console
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Work in progress!</h1>
        </header>
      </div>
    );
  }
}

export default App;
