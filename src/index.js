import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './app/store/configureStore';

import cc from 'cryptocompare';
import ERC20TokenJSON from './contracts/TokenMintERC20Token.json'; 
import TruffleContract from 'truffle-contract';

let ERC20TokenContract, accounts;


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


function setupContracts() {
    // instantiate it with truffle-contract
    ERC20TokenContract = TruffleContract(ERC20TokenJSON);
  
    // Set the provider for our contracts
    ERC20TokenContract.setProvider(web3.currentProvider);

    // TODO: there's a bug with web3 1.0.
    //dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
    if (typeof ERC20TokenContract.currentProvider.sendAsync !== "function") {
        ERC20TokenContract.currentProvider.sendAsync = function() {
            return ERC20TokenContract.currentProvider.send.apply(
                ERC20TokenContract.currentProvider, arguments
            );
        };
    }
}

function instantiateERC20Contract(name, symbol, decimals, totalSupply, account) {
    // try to instantiate new contract
    ERC20TokenContract.new(name, symbol, decimals, totalSupply, {
        from: account,
        gas: 4712388,
        gasPrice: 100000000000
        }).then(function (instance) {
        let contractInstance = instance;
        //console.log(contractInstance);
        contractInstance.name().then((name) => {
            console.log(name);
        }).catch((e) => {
            console.error(e);
        });
    }).catch((e) => {
        console.error(e);
    });
}

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

        web3.eth.getAccounts().then(allAccounts => {
            accounts = allAccounts;
            setupContracts();
            instantiateERC20Contract("My new token", "MNT", 18, 1000, accounts[0]);
        });
    }
});


const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
