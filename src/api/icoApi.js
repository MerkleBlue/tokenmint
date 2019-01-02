import cc from 'cryptocompare';
import Web3 from 'web3';
import { BigNumber } from 'bignumber.js';

// contracts
import ERC20TokenJSON from '../contracts/TokenMintERC20Token.json';
import CrowdsaleJSON from '../contracts/Crowdsale.json';
import AllowanceCrowdsaleImplJSON from '../contracts/AllowanceCrowdsaleImpl.json';
import TCACrowdsaleJSON from '../contracts/TCACrowdsale.json';
import CARPDCrowdsaleJSON from '../contracts/CARPDCrowdsale.json';


const feeInUsd = 29.99;
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

export function checkTokenOwnerFunds(tokenOwner) {
  return new Promise((accept, reject) => {
    getFee().then(fee => {
      getEthBalance(tokenOwner).then(balance => {
        // TODO: 0.01 ETH is just an estimation of gas costs for deploying a contract and paying a fee
        //accept(balance - fee - 0.01 > 0);
        accept({
          tokenOwnerBalance: parseFloat(balance),
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

function instantiateContract(contractJSON, constructorArguments, contractCreator, feeInETH) {
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
      value: web3.utils.toWei(feeInETH.toFixed(8).toString(), 'ether')
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
export function deployCrowdsaleToken(contractCreator, name, symbol, decimals, initialSupply, feeReceiver, tokenOwner) {
  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(contractCreator).then(hasFunds => {
      if (hasFunds) {
        // used for converting big number to string without scientific notation
        BigNumber.config({ EXPONENTIAL_AT: 100 });
        instantiateContract(ERC20TokenJSON, [name, symbol, decimals, new BigNumber(initialSupply * 10 ** decimals).toString(), feeReceiver, tokenOwner], contractCreator, 0).then(receipt => {
          accept(receipt);
          return;
        }).catch((e) => {
          console.log(e)
          reject(new Error("Could not create TokenMintERC20Token contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + contractCreator + " doesn't have enough funds to pay for service."));
        return;
      }
    }).catch((e) => {
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function deployCrowdsale(owner, tokenArgs, crowdsaleArgs) {
  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(owner).then(hasFunds => {
      if (hasFunds) {
        deployCrowdsaleToken(owner, ...tokenArgs).then(tokenReceipt => {
          instantiateContract(CrowdsaleJSON, [...crowdsaleArgs, tokenReceipt.contractAddress], owner, 0).then(crowdsaleReceipt => {
            accept({
              tokenReceipt: tokenReceipt,
              crowdsaleReceipt: crowdsaleReceipt,
            });
            return;
          }).catch((e) => {
            console.log(e)
            reject(new Error("Could not deploy Crowdsale contract."));
            return;
          });
        }).catch((e) => {
          console.log(e)
          reject(new Error("Could not deploy TokenMintERC20Token contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + tokenArgs[0] + " doesn't have enough funds to pay for service."));
        return;
      }
    }).catch((e) => {
      console.log(e)
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function deployAllowanceCrowdsale(owner, tokenArgs, crowdsaleArgs) {
  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(owner).then(hasFunds => {
      if (hasFunds) {
        deployCrowdsaleToken(owner, ...tokenArgs).then(tokenReceipt => {
          instantiateContract(AllowanceCrowdsaleImplJSON, [crowdsaleArgs[0], crowdsaleArgs[1], tokenReceipt.contractAddress, crowdsaleArgs[1]], owner, 0).then(crowdsaleReceipt => {
            accept({
              tokenReceipt: tokenReceipt,
              crowdsaleReceipt: crowdsaleReceipt,
            });
            return;
          }).catch((e) => {
            console.log(e)
            reject(new Error("Could not deploy AllowanceCrowdsaleImpl contract."));
            return;
          });
        }).catch((e) => {
          console.log(e)
          reject(new Error("Could not deploy TokenMintERC20Token contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + tokenArgs[0] + " doesn't have enough funds to pay for service."));
        return;
      }
    }).catch((e) => {
      console.log(e)
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function deployTCACrowdsale(owner, tokenArgs, crowdsaleArgs) {
  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(owner).then(hasFunds => {
      if (hasFunds) {
        deployCrowdsaleToken(owner, ...tokenArgs).then(tokenReceipt => {
          crowdsaleArgs[4] = tokenReceipt.contractAddress;
          instantiateContract(TCACrowdsaleJSON, crowdsaleArgs, owner, 0).then(crowdsaleReceipt => {
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
        reject(new Error("Account: " + tokenArgs[0] + " doesn't have enough funds to pay for service."));
        return;
      }
    }).catch((e) => {
      console.log(e)
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function deployCARPDCrowdsale(owner, tokenArgs, crowdsaleArgs) {
  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(owner).then(hasFunds => {
      if (hasFunds) {
        deployCrowdsaleToken(owner, ...tokenArgs).then(tokenReceipt => {
          crowdsaleArgs[4] = tokenReceipt.contractAddress;
          instantiateContract(CARPDCrowdsaleJSON, crowdsaleArgs, owner, 0).then(crowdsaleReceipt => {
            accept({
              tokenReceipt: tokenReceipt,
              crowdsaleReceipt: crowdsaleReceipt,
            });
            return;
          }).catch((e) => {
            console.log(e)
            reject(new Error("Could not deploy CARPDCrowdsale contract."));
            return;
          });
        }).catch((e) => {
          console.log(e)
          reject(new Error("Could not deploy TokenMintERC20Token contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + tokenArgs[0] + " doesn't have enough funds to pay for service."));
        return;
      }
    }).catch((e) => {
      console.log(e)
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

/*export function deploySafeMathLib(owner) {
  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(owner).then(hasFunds => {
      if (hasFunds) {
        instantiateContract(SafeMathLibJSON, [], owner, 0).then(receipt => {
          accept(receipt);
          return;
        }).catch((e) => {
          reject(new Error("Could not create contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + owner + " doesn't have enough funds to pay for service."));
        return;
      }
    }).catch((e) => {
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function deployFlatPricing(owner, args) {
  //console.log(FlatPricingJSON.bytecode)
  // TODO: fix this
  // HACK: manually linking: replace _SafeMathLib____ with actual bytecode
  // This is not recommended, but it works. The problem is that SafeMathLib is a
  // Solidity library, and must be manually linked with a contract that uses it.
  // In deployment script, deployer.link(lib, contract) is explicitly called, but
  // here there is no option in web3 to do that. The other option is to use
  // truffle-contract to deploy contracts from js.
  FlatPricingJSON.bytecode = FlatPricingJSON.bytecode.replace("__SafeMathLib___________________________", SafeMathLibJSON.bytecode.substr(2));

  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(owner).then(hasFunds => {
      if (hasFunds) {
        instantiateContract(FlatPricingJSON, [...args], owner, 0).then(receipt => {
          accept(receipt);
          return;
        }).catch((e) => {
          reject(new Error("Could not create contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + owner + " doesn't have enough funds to pay for service."));
        return;
      }
    }).catch((e) => {
      console.log(e)
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function deployDefaultFinalizeAgent(owner, crowdsaleTokenAddress, crowdsaleAddress) {
  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(owner).then(hasFunds => {
      if (hasFunds) {
        instantiateContract(DefaultFinalizeAgentJSON, [crowdsaleTokenAddress, crowdsaleAddress], owner, 0).then(receipt => {
          accept(receipt);
          return;
        }).catch((e) => {
          reject(new Error("Could not create contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + owner + " doesn't have enough funds to pay for service."));
        return;
      }
    }).catch((e) => {
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function deployAllocatedCrowdsale(owner, tokenArgs, pricingArgs, allocatedCrowdsaleArgs) {
  return new Promise((accept, reject) => {
    checkTokenOwnerFunds(owner).then(hasFunds => {
      if (hasFunds) {
        deployCrowdsaleToken(owner, ...tokenArgs).then(crowdsaleTokenReceipt => {
          deployFlatPricing(owner, pricingArgs).then(flatPricingReceipt => {
            instantiateContract(AllocatedCrowdsaleJSON, [crowdsaleTokenReceipt.contractAddress, flatPricingReceipt.contractAddress, ...allocatedCrowdsaleArgs], owner, 0).then(allocatedCrowdsaleReceipt => {
              deployDefaultFinalizeAgent(owner, crowdsaleTokenReceipt.contractAddress, allocatedCrowdsaleReceipt.contractAddress).then(defaultFinalizeAgentReceipt => {
                // set finalize agent to AllocatedCrowdsale contract
                let contractInstance = new web3.eth.Contract(AllocatedCrowdsaleJSON.abi, allocatedCrowdsaleReceipt.contractAddress);
                contractInstance.methods.setFinalizeAgent(defaultFinalizeAgentReceipt.contractAddress).send({ from: owner }).then(txHash => {
                  // set release (finalize) agent to CrowdsaleToken contract
                  let contractInstance = new web3.eth.Contract(CrowdsaleTokenJSON.abi, crowdsaleTokenReceipt.contractAddress);
                  contractInstance.methods.setReleaseAgent(defaultFinalizeAgentReceipt.contractAddress).send({ from: owner }).then(txHash => {
                    // approve to crowdsale contract certain amount of ERC0 tokens (hence allocated crowdsale)
                    let contractInstance = new web3.eth.Contract(CrowdsaleTokenJSON.abi, crowdsaleTokenReceipt.contractAddress);
                    //console.log("approv1: " + new BigNumber(tokenArgs[2] * 10 ** tokenArgs[3]).toString())
                    //console.log("approv2: " + new BigNumber((tokenArgs[2] * 10 ** tokenArgs[3]) + 1000).toString())
                    //let overflow = new BigNumber(tokenArgs[2] * 10 ** tokenArgs[3]).plus(new BigNumber(1)).toString();
                    //console.log('overflo: ' + overflow)
                    // NOTE: can approve more than the owner has: new BigNumber(tokenArgs[2] * 10 ** tokenArgs[3]).plus(new BigNumber(1)).toString()
                    contractInstance.methods.approve(allocatedCrowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[2] * 10 ** tokenArgs[3]).toString()).send({ from: owner }).then(success => {
                      //console.log(success);
                      accept({
                        crowdsaleTokenReceipt: crowdsaleTokenReceipt,
                        allocatedCrowdsaleReceipt: allocatedCrowdsaleReceipt,
                        finalizeAgentReceipt: defaultFinalizeAgentReceipt
                      });
                      return;
                    }).catch((e) => {
                      console.log(e)
                      reject(new Error("Could not set allowance in CrowdsaleToken contract for Crowdsale pool."));
                      return;
                    });
                  }).catch((e) => {
                    console.log(e)
                    reject(new Error("Could not set release agent to CrowdsaleToken contract."));
                    return;
                  });
                }).catch((e) => {
                  console.log(e)
                  reject(new Error("Could not set finalize agent to AllocatedCrowdsale contract."));
                  return;
                });
              }).catch((e) => {
                console.log(e)
                reject(new Error("Could not deploy DefaultFinalizeAgent contract."));
                return;
              });
            }).catch((e) => {
              console.log(e)
              reject(new Error("Could not deploy AllocatedCrowdsale contract."));
              return;
            });
          }).catch((e) => {
            console.log(e)
            reject(new Error("Could not deploy FlatPricing contract."));
            return;
          });
        }).catch((e) => {
          console.log(e)
          reject(new Error("Could not deploy CrowdsaleToken contract."));
          return;
        });
      } else {
        reject(new Error("Account: " + tokenArgs[0] + " doesn't have enough funds to pay for service."));
        return;
      }
    }).catch((e) => {
      console.log(e)
      reject(new Error("Could not check token owner ETH funds."));
      return;
    });
  });
}

export function getCrowdsaleState(crowdsaleAddress) {
  return new Promise((accept, reject) => {
    let contractInstance = new web3.eth.Contract(AllocatedCrowdsaleJSON.abi, crowdsaleAddress);
    contractInstance.methods.getState().call().then(state => {
      console.log(state);
      accept(state);
      return;
    }).catch((e) => {
      console.log(e)
      reject(new Error("Could not call getState method."));
      return;
    });
  });
}*/

