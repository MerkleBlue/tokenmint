import cc from 'cryptocompare';
import ERC20TokenJSON from '../contracts/TokenMintERC20Token.json';
import ERC223TokenJSON from '../contracts/TokenMintERC223Token.json';
import TCACrowdsaleJSON from '../contracts/TCACrowdsale.json';
import CARPDCrowdsaleJSON from '../contracts/CARPDCrowdsale.json';
import Web3 from 'web3';
import { BigNumber } from 'bignumber.js';

const feeInUsd = 29.99;
const TCACrowdsaleServiceFeeUSD = 0;
const CARPDCrowdsaleServiceFeeUSD = 0;
let tokenMintAccount = "0x6603cb70464ca51481d4edBb3B927F66F53F4f42";
let web3;

export const NO_NETWORK = "NO_NETWORK";

export function initWeb3() {
  let walletNeedsToBeUnlocked = false;
  return new Promise((accept) => {
    if (typeof global.window !== 'undefined') {
      // Modern dapp browsers...
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        walletNeedsToBeUnlocked = true;
      }
      // Legacy dapp browsers...
      else if (typeof global.window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3 = new Web3(window.web3.currentProvider);
      } else {
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }
    } else {
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    accept(walletNeedsToBeUnlocked);
    return;
  });
}

export function getNetwork() {
  return new Promise((accept, reject) => {
    web3.eth.net.getNetworkType().then(networkType => {
      accept(networkType);
      return;
    }).catch((e) => {
      reject(e);
      return;
    });
  });
}

export function unlockWallet() {
  return new Promise((accept, reject) => {
    window.ethereum.enable().then(() => {
      accept();
      return;
    }).catch(e => {
      reject(e);
      return;
    });
  });
}

export function loadAccounts() {
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
    contractInstance.methods.decimals().call().then((decimals) => {
      contractInstance.methods.balanceOf(account).call().then((balance) => {
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

export function checkAccountFunds(account) {
  return new Promise((accept, reject) => {
    getFee().then(fee => {
      getEthBalance(account).then(balance => {
        // TODO: 0.01 ETH is just an estimation of gas costs for deploying a contract and paying a fee
        //accept(balance - fee - 0.01 > 0);
        accept({
          accountBalance: parseFloat(balance),
          serviceFee: fee
        });
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


function instantiateContract(tokenContract, name, symbol, decimals, totalSupply, tokenOwnerAccount, feeInETH, payingAccount) {
  return new Promise((accept, reject) => {
    // used for converting big number to string without scientific notation
    BigNumber.config({ EXPONENTIAL_AT: 100 });
    let myContract = new web3.eth.Contract(tokenContract.abi, {
      from: payingAccount
    });
    myContract.deploy({
      data: tokenContract.bytecode,
      arguments: [name, symbol, decimals, new BigNumber(totalSupply * 10 ** decimals).toString(), tokenMintAccount, tokenOwnerAccount],
    }).send({
      from: payingAccount,
      gas: 4712388,
      value: web3.utils.toWei(feeInETH.toFixed(8).toString(), 'ether')
    }).on('error', (error) => {
      reject(error);
      return;
    }).on('transactionHash', (txHash) => {
      accept(txHash);
      return;
    });
  });
}

export function mintTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner, serviceFee, payingAccount) {
  return new Promise((accept, reject) => {
    getEthBalance(tokenOwner).then(accountBalance => {
      if (accountBalance - serviceFee - 0.02 > 0) {
        let tokenContract = tokenType === "erc20" ? ERC20TokenJSON : ERC223TokenJSON;
        instantiateContract(tokenContract, tokenName, tokenSymbol, decimals, totalSupply, tokenOwner, serviceFee, payingAccount).then(txHash => {
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

function instantiateCrowdsaleContracts(contractJSON, constructorArguments, contractCreator, serviceFeeETH) {
  return new Promise((accept, reject) => {
    let myContract = new web3.eth.Contract(contractJSON.abi, {
      from: contractCreator,
      //gasPrice: '1000'
    });
    myContract.deploy({
      data: contractJSON.bytecode,
      arguments: [...constructorArguments],
    }).send({
      from: contractCreator,
      gas: 6721975, // was 4712388 // max gas willing to pay, should not exceed block gas limit
      //gasPrice: '1',
      value: web3.utils.toWei(serviceFeeETH.toFixed(8).toString(), 'ether')
    }).on('error', (error) => {
      reject(error);
      return;
    }).on('transactionHash', (txHash) => {
      web3.eth.getTransactionReceipt(txHash).then(receipt => {
        accept(receipt);
        return;
      });
    });
  });
}

// initial supply is in full tokens, not weis, (1000 tokens with 18 decimals would make initialSupply = 1000)
export function deployCrowdsaleToken(contractCreator, name, symbol, decimals, initialSupply, feeReceiver, tokenOwner, serviceFeeETH) {
  return new Promise((accept, reject) => {
    getEthBalance(tokenOwner).then(accountBalance => {
      if (accountBalance - serviceFeeETH - 0.02 > 0) {
        // used for converting big number to string without scientific notation
        BigNumber.config({ EXPONENTIAL_AT: 100 });
        instantiateCrowdsaleContracts(ERC20TokenJSON, [name, symbol, decimals, new BigNumber(initialSupply * 10 ** decimals).toString(), feeReceiver, tokenOwner], contractCreator, serviceFeeETH).then(receipt => {
          accept(receipt);
          return;
        }).catch((e) => {
          console.log(e)
          reject(new Error("Could not create TokenMintERC20Token contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + contractCreator + " doesn't have enough funds to pay for crowdsale token deployment service."));
        return;
      }
    }).catch((e) => {
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function deployTCACrowdsale(owner, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH) {
  return new Promise((accept, reject) => {
    getEthBalance(owner).then(accountBalanceETH => {
      if (accountBalanceETH - tokenServiceFeeETH - crowdsaleServiceFeeETH - 0.02 > 0) {
        deployCrowdsaleToken(owner, ...tokenArgs, tokenServiceFeeETH).then(tokenReceipt => {
          crowdsaleArgs[4] = tokenReceipt.contractAddress;
          instantiateCrowdsaleContracts(TCACrowdsaleJSON, crowdsaleArgs, owner, crowdsaleServiceFeeETH).then(crowdsaleReceipt => {
            accept({
              tokenReceipt: tokenReceipt,
              crowdsaleReceipt: crowdsaleReceipt,
            });
            return;
          }).catch((e) => {
            console.log(e)
            reject(new Error("Could not deploy TCACrowdsale contract."));
            return;
          });
        }).catch((e) => {
          console.log(e)
          reject(new Error("Could not deploy TokenMintERC20Token contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + tokenArgs[0] + " doesn't have enough funds to pay for TCACrowdsale deployment service."));
        return;
      }
    }).catch((e) => {
      console.log(e)
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function deployCARPDCrowdsale(owner, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH) {
  return new Promise((accept, reject) => {
    getEthBalance(owner).then(accountBalanceETH => {
      if (accountBalanceETH - tokenServiceFeeETH - crowdsaleServiceFeeETH - 0.02 > 0) {
        deployCrowdsaleToken(owner, ...tokenArgs, tokenServiceFeeETH).then(tokenReceipt => {
          crowdsaleArgs[4] = tokenReceipt.contractAddress;
          instantiateCrowdsaleContracts(CARPDCrowdsaleJSON, crowdsaleArgs, owner, crowdsaleServiceFeeETH).then(crowdsaleReceipt => {
            accept({
              tokenReceipt: tokenReceipt,
              crowdsaleReceipt: crowdsaleReceipt,
            });
            return;
          }).catch((e) => {
            reject(new Error("Could not deploy CARPDCrowdsale contract."));
            return;
          });
        }).catch((e) => {
          reject(new Error("Could not deploy TokenMintERC20Token contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + tokenArgs[0] + " doesn't have enough funds to pay for CARPDCrowdsale deployment service."));
        return;
      }
    }).catch((e) => {
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}
