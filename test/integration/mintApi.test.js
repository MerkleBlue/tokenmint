/*jshint esversion: 6 */
import { assert, expect } from 'chai';
//import Promise from 'bluebird';
//import { JSDOM } from 'jsdom';
import Web3 from 'web3';
//import mintApi from '../../src/api/mintApi';
//import mintApi from '../../src/api/mintApi';
const mintApi = require('../../src/api/mintApi');
import fetch from 'node-fetch';

let web3, accounts;

describe('Tfa API integration tests', function () {
  this.timeout(120000);

  before((beforeDone) => {
    // set global fetch because node doesn't have it
    global.fetch = fetch;
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
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

  it('Mint ERC-20 tokens', (done) => {
    let tokenName = 'Token name';
    let tokenSymbol = 'TSY';
    let decimals = 18;
    let totalSupply = 1000;
    let tokenType = 'erc20';
    let serviceFee = 0.1;
    mintApi.mintTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, accounts[0], serviceFee).then(contractInstance => {
      mintApi.getTokenBalance(contractInstance, accounts[0]).then(actualTokenBalance => {
        contractInstance.name().then(actualName => {
          contractInstance.symbol().then(actualSymbol => {
            contractInstance.decimals().then(actualDecimals => {
              contractInstance.totalSupply().then(actualTotalSupply => {
                expect(actualTokenBalance).to.be.eq(totalSupply);
                expect(actualName).to.be.eq(tokenName);
                expect(actualSymbol).to.be.eq(tokenSymbol);
                expect(actualDecimals.toNumber()).to.be.eq(decimals);
                expect(actualTotalSupply.toNumber()).to.be.eq(totalSupply * 10 ** decimals);
                done();
              });
            });
          });
        });
      }).catch(e => {
        done(new Error());
      });
    }).catch(e => {
      done(new Error());
    });
  });

  it('Mint ERC-223 tokens', (done) => {
    let tokenName = 'Token name';
    let tokenSymbol = 'TSY';
    let decimals = 18;
    let totalSupply = 1000;
    let tokenType = 'erc223';
    let serviceFee = 0.1;
    mintApi.mintTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, accounts[0], serviceFee).then(contractInstance => {
      mintApi.getTokenBalance(contractInstance, accounts[0]).then(actualTokenBalance => {
        contractInstance.name().then(actualName => {
          contractInstance.symbol().then(actualSymbol => {
            contractInstance.decimals().then(actualDecimals => {
              contractInstance.totalSupply().then(actualTotalSupply => {
                expect(actualTokenBalance).to.be.eq(totalSupply);
                expect(actualName).to.be.eq(tokenName);
                expect(actualSymbol).to.be.eq(tokenSymbol);
                expect(actualDecimals.toNumber()).to.be.eq(decimals);
                expect(actualTotalSupply.toNumber()).to.be.eq(totalSupply * 10 ** decimals);
                done();
              });
            });
          });
        });
      }).catch(e => {
        done(new Error());
      });
    }).catch(e => {
      done(new Error());
    });
  });
});
