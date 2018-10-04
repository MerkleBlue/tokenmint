import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './app/store/configureStore';

import cc from 'cryptocompare';
const Web3 = require('web3');
let web3;

function getFee() {
    return new Promise((accept, reject) => {
        cc.price('ETH', 'USD').then(prices => {
            console.log("Service fee is $100 which is: " + 1/prices.USD + "ETH");
            accept(1/prices.USD);
            return;
        }).catch(e => {
            console.error(e);
            reject();
            return;
        });
    });
}

getFee().then(fee => {
    console.log(fee);
});




window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(window.web3.currentProvider);
    console.log('Found web3 injected by the browser. Version: ' + web3.version);
  } else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    console.log('Using http://localhost:7545 as web3 provider. Version: ' + web3.version); 

    web3.eth.getAccounts().then(accounts => {
        for(let account of accounts) {
            web3.eth.getBalance(account).then(balance => {
                console.log(account + ": " + balance);
            });
        }
    });
  }
})


const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
