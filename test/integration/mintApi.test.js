/*jshint esversion: 6 */
import { assert, expect } from 'chai';
import Web3 from 'web3';
const mintApi = require('../../src/api/mintApi');
import fetch from 'node-fetch';
import ERC20TokenJSON from '../../src/contracts/TokenMintERC20Token.json';
import ERC223TokenJSON from '../../src/contracts/TokenMintERC223Token.json';


let web3, accounts;
let tokenMintAccount = "0x6603cb70464ca51481d4edBb3B927F66F53F4f42";
let token = {
  name: 'Token name',
  symbol: 'TSY',
  decimals: 18,
  totalSupply: 1000000
}

describe('Tfa API integration tests', function () {
  this.timeout(120000);

  before((beforeDone) => {
    // set global fetch because node doesn't have it
    global.fetch = fetch;
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3.eth.getAccounts().then(allAccounts => {
      accounts = allAccounts;
      beforeDone();
    });
  });

  beforeEach((done) => {
    mintApi.initWeb3();
    done();
  });

  it('Load accounts', (done) => {
    mintApi.loadAccounts().then(actualAccounts => {
      expect(actualAccounts).to.eql(accounts);
      done();
    });
  });

  it('Get fee', (done) => {
    mintApi.getFee().then(fee => {
      expect(fee).to.be.greaterThan(0.3);
      done();
    });
  });

  it('Get ETH balance with empty account', (done) => {
    mintApi.getEthBalance('0x1000000000000000000000000000000000000000').then(actual => {
      expect(web3.utils.fromWei(actual, 'ether')).to.be.eq('0');
      done();
    });
  });

  it('Get ETH balance with first account', (done) => {
    web3.eth.getBalance(accounts[0]).then(actual => {
      mintApi.getEthBalance(accounts[0]).then(expected => {
        expect(web3.utils.fromWei(actual, 'ether')).to.be.eq(expected);
        done();
      });
    });
  });

  it('Get token balance with empty contract', (done) => {
    mintApi.getTokenBalance(null, accounts[0]).then(actual => {
      done(new Error());
    }).catch(e => {
      expect(true).to.be.true;
      done();
    });
  });

  it('Pay service fee when creating ERC20', (done) => {
    let tokenType = 'erc20';
    let serviceFee = 0.02;
    mintApi.getEthBalance(tokenMintAccount).then(tokenMintBalanceBefore => {
      mintApi.mintTokens(token.name, token.symbol, token.decimals, token.totalSupply, tokenType, accounts[0], serviceFee).then(contractInstance => {
        mintApi.getEthBalance(tokenMintAccount).then(tokenMintBalanceAfter => {
          assert.closeTo(new Number(tokenMintBalanceAfter).valueOf(), new Number(tokenMintBalanceBefore).valueOf() + serviceFee, 0.000001)
          done();
        });
      });
    });
  });

  it('Pay service fee when creating ERC223', (done) => {
    let tokenType = 'erc223';
    let serviceFee = 0.0223;
    mintApi.getEthBalance(tokenMintAccount).then(tokenMintBalanceBefore => {
      mintApi.mintTokens(token.name, token.symbol, token.decimals, token.totalSupply, tokenType, accounts[0], serviceFee).then(contractInstance => {
        mintApi.getEthBalance(tokenMintAccount).then(tokenMintBalanceAfter => {
          assert.closeTo(new Number(tokenMintBalanceAfter).valueOf(), new Number(tokenMintBalanceBefore).valueOf() + serviceFee, 0.000001)
          done();
        });
      });
    });
  });

  it('Mint ERC-20 tokens', (done) => {
    let tokenType = 'erc20';
    let serviceFee = 0.01;
    mintApi.mintTokens(token.name, token.symbol, token.decimals, token.totalSupply, tokenType, accounts[0], serviceFee).then(txHash => {
      web3.eth.getTransactionReceipt(txHash).then(receipt => {
        let contractInstance = new web3.eth.Contract(ERC20TokenJSON.abi, receipt.contractAddress);
        mintApi.getTokenBalance(contractInstance, accounts[0]).then(actualTokenBalance => {
          contractInstance.methods.name().call().then(actualName => {
            contractInstance.methods.symbol().call().then(actualSymbol => {
              contractInstance.methods.decimals().call().then(actualDecimals => {
                contractInstance.methods.totalSupply().call().then(actualTotalSupply => {
                  expect(parseInt(actualTokenBalance)).to.be.eq(token.totalSupply);
                  expect(actualName).to.be.eq(token.name);
                  expect(actualSymbol).to.be.eq(token.symbol);
                  expect(parseInt(actualDecimals)).to.be.eq(token.decimals);
                  expect(parseInt(actualTotalSupply)).to.be.eq(token.totalSupply * 10 ** token.decimals);
                  done();
                });
              });
            });
          });
        }).catch(e => {
          done(new Error());
        });
      });
    }).catch(e => {
      done(new Error());
    });
  });

  it('Mint ERC-223 tokens', (done) => {
    let tokenType = 'erc223';
    let serviceFee = 0.01;
    mintApi.mintTokens(token.name, token.symbol, token.decimals, token.totalSupply, tokenType, accounts[0], serviceFee).then(txHash => {
      web3.eth.getTransactionReceipt(txHash).then(receipt => {
        let contractInstance = new web3.eth.Contract(ERC223TokenJSON.abi, receipt.contractAddress);
        mintApi.getTokenBalance(contractInstance, accounts[0]).then(actualTokenBalance => {
          contractInstance.methods.name().call().then(actualName => {
            contractInstance.methods.symbol().call().then(actualSymbol => {
              contractInstance.methods.decimals().call().then(actualDecimals => {
                contractInstance.methods.totalSupply().call().then(actualTotalSupply => {
                  expect(parseInt(actualTokenBalance)).to.be.eq(token.totalSupply);
                  expect(actualName).to.be.eq(token.name);
                  expect(actualSymbol).to.be.eq(token.symbol);
                  expect(parseInt(actualDecimals)).to.be.eq(token.decimals);
                  expect(parseInt(actualTotalSupply)).to.be.eq(token.totalSupply * 10 ** token.decimals);
                  done();
                });
              });
            });
          });
        }).catch(e => {
          done(new Error());
        });
      });
    }).catch(e => {
      done(new Error());
    });
  });
});
