import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './app/store/configureStore';
import cc from 'cryptocompare';
import ERC20TokenJSON from './contracts/TokenMintERC20Token.json';
import ERC223TokenJSON from './contracts/TokenMintERC223Token.json';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3';
import { setAccounts } from './app/actions/accountsActions';

let web3, ERC20TokenContract, ERC223TokenContract, accounts;
let feeInUsd = 100;

function getFee() {
  return new Promise((accept, reject) => {
    cc.price('ETH', 'USD').then(prices => {
      accept(feeInUsd / prices.USD);
      return;
    }).catch(e => {
      reject(e);
      return;
    });
  });
}

function setupContracts() {
  // instantiate it with truffle-contract
  ERC20TokenContract = TruffleContract(ERC20TokenJSON);
  ERC223TokenContract = TruffleContract(ERC223TokenJSON);

  // set the provider for our contracts
  ERC20TokenContract.setProvider(web3.currentProvider);
  ERC223TokenContract.setProvider(web3.currentProvider);

  // TODO: there's a bug with web3 1.0.
  //dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
  if (typeof ERC20TokenContract.currentProvider.sendAsync !== "function") {
    ERC20TokenContract.currentProvider.sendAsync = function () {
      return ERC20TokenContract.currentProvider.send.apply(
        ERC20TokenContract.currentProvider, arguments
      );
    };
  }
}

function instantiateContract(tokenContract, name, symbol, decimals, totalSupply, account) {
  return new Promise((accept, reject) => {
    tokenContract.new(name, symbol, decimals, totalSupply, {
      from: account,
      gas: 4712388,
      gasPrice: 100000000000
    }).then(instance => {
      let contractInstance = instance;
      accept(contractInstance);
      return;
    }).catch(e => {
      reject(e);
      return;
    });
  });
}

function sendServiceFee(senderAccount, receiverAccount, fee) {
  return new Promise((accept, reject) => {
    web3.eth.sendTransaction({
      from: senderAccount,
      to: receiverAccount,
      value: web3.utils.toWei(fee.toString(), 'ether')
    }).then(receipt => {
      accept(receipt);
      return;
    }).catch(e => {
      reject(e);
      return;
    });
  });
}

function getBalance(account) {
  return new Promise((accept, reject) => {
    web3.eth.getBalance(account).then(wei => {
      let balance = web3.utils.fromWei(wei, 'ether');
      accept(parseFloat(balance));
      return;
    }).catch(e => {
      reject(e);
      return;
    });
  });
}

function hasFunds(account, fee) {
  return new Promise((accept, reject) => {
    web3.eth.getBalance(account).then(wei => {
      let balance = web3.utils.fromWei(wei, 'ether');
      // TODO: 0.01 ETH is just an estimation of gas costs for deloying a contract and paying a fee
      accept((balance - fee - 0.01) > 0);
      return;
    }).catch(e => {
      reject(e);
      return;
    });
  });
}

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(window.web3.currentProvider);
    console.log('Found web3 injected by the browser. Version: ' + web3.version);
  } else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    console.log('Using http://localhost:7545 as web3 provider. Version: ' + web3.version);
  }
  web3.eth.getAccounts().then(allAccounts => {
    accounts = allAccounts;
    store.dispatch(setAccounts(accounts));

    let userAccount = accounts[0];

    setupContracts();

    getFee().then(fee => {
      hasFunds(userAccount, fee).then(hasFunds => {
        if(hasFunds) {
          instantiateContract(ERC223TokenContract, "Token Mint ERC20 token", "TM20", 18, 1000, userAccount).then(contractInstance => {
            console.log("Contract deployed at: " + contractInstance.address);

            sendServiceFee(userAccount, accounts[9], fee).then(() => {
              console.log('Service fee ' + fee.toFixed(4) + ' paid.');
              getBalance(accounts[9]).then(balance => {
                console.log(balance.toFixed(4) + " ETH in TokenMint account after a purchase.");
              });
            }).catch((e) => {
              console.error('Could not send service fee.')
            });
          });
        } else {
          console.error('Account: ' + userAccount + ' doesn\'t have enough funds to pay for service.');
        }
      }).catch((e) => {
        console.error('Could not get balance.');
      });
    }).catch((e) => {
      console.error('Could not get eth price from CryptoCompare api.')
    });
  });
});


const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
