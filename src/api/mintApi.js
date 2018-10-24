import cc from 'cryptocompare';
import ERC20TokenJSON from '../contracts/TokenMintERC20Token.json';
import ERC223TokenJSON from '../contracts/TokenMintERC223Token.json';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3';

const feeInUsd = 0.05;
let tokenMintAccount = "0x6603cb70464ca51481d4edBb3B927F66F53F4f42";
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

export function getFee() {
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

export function getEthBalance(account) {
  return new Promise((accept, reject) => {
    web3.eth.getBalance(account).then(wei => {
      let balance = web3.utils.fromWei(wei, 'ether');
      accept(balance);
      return;
    }).catch(e => {
      reject(e);
      return;
    });
  });
}

export function getTokenBalance(contractInstance, account) {
  return new Promise((accept, reject) => {
    contractInstance.decimals().then((decimals) => {
      contractInstance.balanceOf(account).then((balance) => {
        accept(balance / 10 ** decimals);
        return;
      }).catch(e => {
        reject(e);
        return;
      });
    }).catch(e => {
      reject(e);
      return;
    });
  });
}

function instantiateContract(tokenContract, name, symbol, decimals, totalSupply, account, feeInETH) {
  return new Promise((accept, reject) => {
    tokenContract.new(name, symbol, decimals, totalSupply * 10 ** decimals, tokenMintAccount, {
      from: account,
      gas: 4712388,
      //gasPrice: 1000000000, // 1 Gwei, wallet estimates gasPrice and sets it
      value: web3.utils.toWei(feeInETH.toFixed(8).toString(), 'ether')
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

function isMainNet() {
  initWeb3();
  return new Promise((accept, reject) => {
    web3.eth.net.getNetworkType().then(networkType => {
      accept(networkType === "main");
      return;
    }).catch((e) => {
      reject(e);
      return;
    });
  });
}

// NOTE: mining fees are estimated in a wallet based on gasPrice. This function can corectly
// estimate mining fees if gas price is set here.
function estimateMiningFee(tokenContract, name, symbol, decimals, totalSupply, tokenOwner) {
  return new Promise((accept, reject) => {
    // create new contract instance using web3, not truffle contract
    let myContract = new web3.eth.Contract(tokenContract.abi, {
      from: tokenOwner,
      //gasPrice: '1000000000',  // default gas price in wei
      data: tokenContract.bytecode
    });

    // estimate gas
    myContract.deploy({
      data: tokenContract.bytecode,
      arguments: [name, symbol, decimals, totalSupply /** 10**decimals*/, tokenOwner]
    }).estimateGas(function (err, gas) {
      //console.log("Estimated mining fee: " + gas * 1000000000 / 10 ** 18);
      accept(gas * 1000000000 / 10 ** 18);
      return;
    });
  });
}

export function checkTokenOwnerFunds(tokenOwner) {
  initWeb3();
  return new Promise((accept, reject) => {
    getFee().then(fee => {
      getEthBalance(tokenOwner).then(balance => {
        // TODO: 0.01 ETH is just an estimation of gas costs for deploying a contract and paying a fee
        accept(balance - fee - 0.01 > 0);
        return;
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

export function mintTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner, serviceFee) {
  initWeb3();
  setupContracts();
  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(tokenOwner).then(hasFunds => {
      if (hasFunds) {
        let tokenContract = tokenType === "erc20" ? ERC20TokenContract : ERC223TokenContract;
        instantiateContract(tokenContract, tokenName, tokenSymbol, decimals, totalSupply, tokenOwner, serviceFee).then(contractInstance => {
          // getEthBalance(tokenOwner).then(balance => {
          //   console.log("Customer ETH balance: " + balance);
          // });

          // getTokenBalance(contractInstance, tokenOwner).then(balance => {
          //   console.log("Customer " + tokenSymbol + " balance: " + balance);
          // });

          // getEthBalance(tokenMintAccount).then(balance => {
          //   console.log("TokenMint ETH balance: " + balance);
          // });

          accept(contractInstance.address);
          return;
        }).catch((e) => {
          reject(new Error("Could not create contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + tokenOwner + " doesn't have enough funds to pay for service."));
        return;
      }
    }).catch((e) => {
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function loadAccounts() {
  initWeb3();
  return new Promise((accept, reject) => {
    web3.eth.getAccounts().then(allAccounts => {
      accept(allAccounts);
      return;
    }).catch((e) => {
      reject();
      return;
    });
  });
}
