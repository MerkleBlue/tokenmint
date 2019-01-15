import cc from 'cryptocompare';
import TokenMintERC20TokenJSON from '../contracts/TokenMintERC20Token.json';
import TokenMintERC223TokenJSON from '../contracts/TokenMintERC223Token.json';
import TokenMintERC20MintableTokenJSON from '../contracts/TokenMintERC20MintableToken.json';
import TCACrowdsaleJSON from '../contracts/TCACrowdsale.json';
import CARPDCrowdsaleJSON from '../contracts/CARPDCrowdsale.json';
import CMRPDCrowdsaleJSON from '../contracts/CMRPDCrowdsale.json';
import Web3 from 'web3';
import { BigNumber } from 'bignumber.js';

let feeInUsd = 29.99;
const mintTokensFeeUSD = 29.99;
const TCACrowdsaleServiceFeeUSD = 0;
const CARPDCrowdsaleServiceFeeUSD = 0;
const CMRPDCrowdsaleServiceFeeUSD = 499.99;
let tokenMintAccount = "0x6603cb70464ca51481d4edBb3B927F66F53F4f42";
let web3;

export const serviceTypeEnum = {
  MINT_TOKENS: 1,
  TCA_CROWDSALE: 2,
  CARPD_CROWDSALE: 3,
  CMRPD_CROWDSALE: 4
}

export function setServiceFeeInUsd(serviceType) {
  switch (serviceType) {
    case serviceTypeEnum.MINT_TOKENS:
      feeInUsd = mintTokensFeeUSD;
      break;
    case serviceTypeEnum.TCA_CROWDSALE:
      feeInUsd = TCACrowdsaleServiceFeeUSD;
      break;
    case serviceTypeEnum.CARPD_CROWDSALE:
      feeInUsd = CARPDCrowdsaleServiceFeeUSD;
      break;
    case serviceTypeEnum.CMRPD_CROWDSALE:
      feeInUsd = CMRPDCrowdsaleServiceFeeUSD;
      break;
    default:
      feeInUsd = mintTokensFeeUSD;
  }
}

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

/**
 * Deploys TokenMintERC20Token or TokenMintERC223Token contract.
 *
 * @param {string}   tokenName                token name
 * @param {string}   tokenSymbol              token symbol, 3-4 chars
 * @param {Number}   decimals                 number of decimals token will have, 18 is common
 * @param {Number}   totalSupply              total supply of tokens (in full tokens). tokenOwner will own totalSupply after deployment.
 * @param {string}   tokenType                token type, if "erc20" deploys TokenMintERC20Token, otherwise TokenMintERC223Token contract
 * @param {string}   tokenOwner               address that is initial token owner
 * @param {Number}   serviceFee               service fee in ETH for contract deployment
 * @param {string}   payingAccount            address used for deployments, pays mining and service fees
 * @return {string}                           contract deployment transaction hash
 */
export function mintTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner, serviceFee, payingAccount) {
  return new Promise((accept, reject) => {
    getEthBalance(tokenOwner).then(accountBalance => {
      if (accountBalance - serviceFee - 0.02 > 0) {
        let tokenContract = tokenType === "erc20" ? TokenMintERC20TokenJSON : TokenMintERC223TokenJSON;
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
function deployCrowdsaleToken(contractJSON, contractCreator, name, symbol, decimals, initialSupply, feeReceiver, tokenOwner, serviceFeeETH) {
  return new Promise((accept, reject) => {
    getEthBalance(tokenOwner).then(accountBalance => {
      if (accountBalance - serviceFeeETH - 0.02 > 0) {
        // used for converting big number to string without scientific notation
        BigNumber.config({ EXPONENTIAL_AT: 100 });
        instantiateCrowdsaleContracts(contractJSON, [name, symbol, decimals, new BigNumber(initialSupply * 10 ** decimals).toString(), feeReceiver, tokenOwner], contractCreator, serviceFeeETH).then(receipt => {
          accept(receipt);
          return;
        }).catch((e) => {
          console.log(e);
          reject(new Error("Could not create crowdsale token contract."));
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

/**
 * Deploys TCACrowdsale contracts. First it deploys TokenMintERC20Token,
 * and then TCACrowdsale.
 *
 * @param {string}   owner                    address used for deployments, contract creator
 * @param {Object[]} tokenArgs                array containing arguments for TokenMintERC20Token deployment
 * @param {Object[]} crowdsaleArgs            array containing arguments for TCACrowdsale deployment
 * @param {Number}   tokenServiceFeeETH       service fee in ETH for TokenMintERC20Token deployment
 * @param {Number}   crowdsaleServiceFeeETH   service fee in ETH for TCACrowdsale deployment
 * @return {Object}                           object containing token and crowdsale receipts
 */
export function deployTCACrowdsale(owner, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH) {
  return new Promise((accept, reject) => {
    getEthBalance(owner).then(accountBalanceETH => {
      if (accountBalanceETH - tokenServiceFeeETH - crowdsaleServiceFeeETH - 0.02 > 0) {
        deployCrowdsaleToken(TokenMintERC20TokenJSON, owner, ...tokenArgs, tokenServiceFeeETH).then(tokenReceipt => {
          crowdsaleArgs[4] = tokenReceipt.contractAddress;
          instantiateCrowdsaleContracts(TCACrowdsaleJSON, crowdsaleArgs, owner, crowdsaleServiceFeeETH).then(crowdsaleReceipt => {
            accept({
              tokenReceipt: tokenReceipt,
              crowdsaleReceipt: crowdsaleReceipt,
            });
            return;
          }).catch(() => {
            reject(new Error("Could not deploy TCACrowdsale contract."));
            return;
          });
        }).catch(() => {
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

/**
 * Deploys CARPDCrowdsale contracts. First it deploys TokenMintERC20Token,
 * and then CARPDCrowdsale.
 *
 * @param {string}   owner                    address used for deployments, contract creator
 * @param {Object[]} tokenArgs                array containing arguments for TokenMintERC20Token deployment
 * @param {Object[]} crowdsaleArgs            array containing arguments for CARPDCrowdsale deployment
 * @param {Number}   tokenServiceFeeETH       service fee in ETH for TokenMintERC20Token deployment
 * @param {Number}   crowdsaleServiceFeeETH   service fee in ETH for CARPDCrowdsale deployment
 * @return {Object}                           object containing token and crowdsale receipts
 */
export function deployCARPDCrowdsale(owner, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH) {
  return new Promise((accept, reject) => {
    getEthBalance(owner).then(accountBalanceETH => {
      if (accountBalanceETH - tokenServiceFeeETH - crowdsaleServiceFeeETH - 0.02 > 0) {
        deployCrowdsaleToken(TokenMintERC20TokenJSON, owner, ...tokenArgs, tokenServiceFeeETH).then(tokenReceipt => {
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

/**
 * Adds minter role to the new minter address, and renounces the minter role of the current minter.
 *
 * @param {string} tokenContractAddress       address of the deployed TokenMintERC20MintableToken contract
 * @param {string} currentMinterAddress       address of the current minter, to be renounced
 * @param {string} newMinterAddress           address that gets the minter role
 */
function transferMinterRole(tokenContractAddress, currentMinterAddress, newMinterAddress) {
  return new Promise((accept, reject) => {
    let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, tokenContractAddress);
    tokenInstance.methods.addMinter(newMinterAddress).send({ from: currentMinterAddress }).then(() => {
      tokenInstance.methods.renounceMinter().send({ from: currentMinterAddress }).then(() => {
        accept();
        return;
      }).catch(() => {
        reject(new Error("Could not renounce minter role. Minter role address: " + currentMinterAddress));
        return;
      });
    }).catch(() => {
      reject(new Error("Could not add minter role. New minter role address: " + newMinterAddress));
      return;
    });
  });
}

/**
 * Deploys CMRPDCrowdsale contracts. First it deploys TokenMintERC20MintableToken,
 * and then CMRPDCrowdsale.
 *
 * @param {string}   owner                    address used for deployments, contract creator
 * @param {Object[]} tokenArgs                array containing arguments for TokenMintERC20MintableToken deployment
 * @param {Object[]} crowdsaleArgs            array containing arguments for CMRPDCrowdsale deployment
 * @param {Number}   tokenServiceFeeETH       service fee in ETH for TokenMintERC20MintableToken deployment
 * @param {Number}   crowdsaleServiceFeeETH   service fee in ETH for CMRPDCrowdsale deployment
 * @return {Object}                           object containing token and crowdsale receipts
 */
export function deployCMRPDCrowdsale(owner, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH) {
  return new Promise((accept, reject) => {
    getEthBalance(owner).then(accountBalanceETH => {
      if (accountBalanceETH - tokenServiceFeeETH - crowdsaleServiceFeeETH - 0.02 > 0) {
        deployCrowdsaleToken(TokenMintERC20MintableTokenJSON, owner, ...tokenArgs, tokenServiceFeeETH).then(tokenReceipt => {
          crowdsaleArgs[4] = tokenReceipt.contractAddress;
          instantiateCrowdsaleContracts(CMRPDCrowdsaleJSON, crowdsaleArgs, owner, crowdsaleServiceFeeETH).then(crowdsaleReceipt => {
            transferMinterRole(tokenReceipt.contractAddress, owner, crowdsaleReceipt.contractAddress).then(() => {
              accept({
                tokenReceipt: tokenReceipt,
                crowdsaleReceipt: crowdsaleReceipt,
              });
              return;
            }).catch(() => {
              reject(new Error("Could not transfer minter role."));
              return;
            });
          }).catch(() => {
            reject(new Error("Could not deploy CMRPDCrowdsale contract."));
            return;
          });
        }).catch(() => {
          reject(new Error("Could not deploy TokenMintERC20MintableToken contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + tokenArgs[0] + " doesn't have enough funds to pay for CMRPDCrowdsale deployment service."));
        return;
      }
    }).catch((e) => {
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}
