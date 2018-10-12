import cc from 'cryptocompare';
import ERC20TokenJSON from '../contracts/TokenMintERC20Token.json';
import ERC223TokenJSON from '../contracts/TokenMintERC223Token.json';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3';

const feeInUsd = 99.99;
let web3, ERC20TokenContract, ERC223TokenContract;

function initWeb3() {
  if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }
}

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

export function checkTokenOwnerFunds(tokenOwner) {
  initWeb3();
  return new Promise((accept, reject) => {
    getFee().then(fee => {
      hasFunds(tokenOwner, fee).then(hasFunds => {
        accept(hasFunds);
      }).catch((e) => {
        reject(e);
        return;
      });
    }).catch((e) => {
      reject(e);
      return;
    });
  });
}

export function mintTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner) {
  initWeb3();
  setupContracts();
  return new Promise((accept, reject) => {
    getFee().then(fee => {
      hasFunds(tokenOwner, fee).then(hasFunds => {
        if (hasFunds) {
          let tokenContract = tokenType === "erc20" ? ERC20TokenContract : ERC223TokenContract;
          instantiateContract(tokenContract, tokenName, tokenSymbol, decimals, totalSupply, tokenOwner).then(contractInstance => {
            let infoMessage = (
              "Your tokens have been successfully mined, and are ready to be used. Contract is deployed at: " +
              contractInstance.address +
              ". Thank You for using TokenMint!"
            );
            sendServiceFee(tokenOwner, "0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE", fee).then(() => {
              accept(infoMessage);
              return;
            }).catch((e) => {
              reject("Oops, something went wrong. Could not send service fee.");
              return;
            });
          });
        } else {
          reject("Oops, something went wrong. Account: " + tokenOwner + " doesn't have enough funds to pay for service.");
          return;
        }
      }).catch((e) => {
        reject("Oops, something went wrong. Could not get balance.");
        return;
      });
    }).catch((e) => {
      reject("Oops, something went wrong. Could not get eth price from CryptoCompare api.");
      return;
    });
  });
}
