import cc from 'cryptocompare';
import ERC20TokenJSON from '../contracts/TokenMintERC20Token.json';
import ERC223TokenJSON from '../contracts/TokenMintERC223Token.json';
import Web3 from 'web3';

const feeInUsd = 0.01;
let tokenMintAccount = "0x6603cb70464ca51481d4edBb3B927F66F53F4f42";
let web3;

export function initWeb3() {
  if (typeof global.window !== 'undefined' && typeof global.window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
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
    let myContract = new web3.eth.Contract(tokenContract.abi, {
      from: account
    });
    myContract.deploy({
      data: tokenContract.bytecode,
      arguments: [name, symbol, decimals, totalSupply, tokenMintAccount],
      value: web3.utils.toWei(feeInETH.toFixed(8).toString(), 'ether')
    }).send({
      from: account,
      gas: 4712388,
    }).on('error', (error) => {
      console.log(error);
      reject(error);
      return;
    }).on('transactionHash', (txHash) => {
      accept(txHash);
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
      arguments: [name, symbol, decimals, totalSupply /** 10**decimals*/ , tokenOwner]
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
  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(tokenOwner).then(hasFunds => {
      if (hasFunds) {
        let tokenContract = tokenType === "erc20" ? ERC20TokenJSON : ERC223TokenJSON;
        instantiateContract(tokenContract, tokenName, tokenSymbol, decimals, totalSupply, tokenOwner, serviceFee).then(txHash => {
          // getEthBalance(tokenOwner).then(balance => {
          //   console.log("Customer ETH balance: " + balance);
          // });

          // getTokenBalance(contractInstance, tokenOwner).then(balance => {
          //   console.log("Customer " + tokenSymbol + " balance: " + balance);
          // });

          // getEthBalance(tokenMintAccount).then(balance => {
          //   console.log("TokenMint ETH balance: " + balance);
          // });

          accept(txHash);
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
