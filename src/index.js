import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './app/store/configureStore';
import Web3 from 'web3';
import { setAccounts } from './app/actions/accountsActions';

const store = configureStore();

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  let web3;
  if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }
  web3.eth.getAccounts().then(allAccounts => {
    store.dispatch(setAccounts(allAccounts));
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
