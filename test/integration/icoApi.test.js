/*jshint esversion: 6 */
import { assert, expect } from 'chai';
import Web3 from 'web3';
const icoApi = require('../../src/api/icoApi');
import fetch from 'node-fetch';
import { BigNumber } from 'bignumber.js';
import CrowdsaleTokenJSON from '../../src/contracts/CrowdsaleToken.json';

let web3, accounts;
let tokenMintAccount = "0x6603cb70464ca51481d4edBb3B927F66F53F4f42";
let token = {
  name: 'Token name',
  symbol: 'TSY',
  decimals: 18,
  totalSupply: 1000000
}

describe('TokenMint icoApi integration tests', function () {
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
    icoApi.initWeb3();
    done();
  });

  it('Deploy SafeMathLib', (done) => {
    icoApi.deploySafeMathLib(accounts[0]).then(receipt => {
      expect(receipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Deploy FlatPricing contract', (done) => {
    icoApi.deployFlatPricing(accounts[0]).then(receipt => {
      expect(receipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Deploy CrowdsaleToken contract', (done) => {
    icoApi.deployCrowdsaleToken(accounts[0], "Name", "SYM", 1000, 18, true).then(receipt => {
      expect(receipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      console.log(e)
      done(new Error(e));
    });
  });

  it('Deploy AllocatedCrowdsale contract', (done) => {
    let tokenInfo = [accounts[0], "Name", "SYM", 1000, 18, true];
    icoApi.deployAllocatedCrowdsale(tokenInfo).then(receipt => {
      expect(receipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      console.log(e)
      done(new Error(e));
    });
  });

  it('CrowsaleToken attributes', (done) => {
    icoApi.deployCrowdsaleToken(accounts[0], token.name, token.symbol, token.totalSupply, token.decimals, false).then(receipt => {
      let contractInstance = new web3.eth.Contract(CrowdsaleTokenJSON.abi, receipt.contractAddress);
      icoApi.getTokenBalance(contractInstance, accounts[0]).then(actualTokenBalance => {
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
        done(new Error(e));
      });
    });
  });

  it('CrowsaleToken transfer', (done) => {
    icoApi.deployCrowdsaleToken(accounts[0], token.name, token.symbol, token.totalSupply, token.decimals, false).then(receipt => {
      let contractInstance = new web3.eth.Contract(CrowdsaleTokenJSON.abi, receipt.contractAddress);
      icoApi.getTokenBalance(contractInstance, accounts[0]).then(actualTokenBalance => {
        console.log(actualTokenBalance)
        expect(parseInt(actualTokenBalance)).to.be.eq(token.totalSupply);
        let decimals = web3.utils.toBN(18);
        let amount = web3.utils.toBN(100);
        let value = amount.mul(web3.utils.toBN(10).pow(decimals));
        contractInstance.methods.transfer(accounts[1], 0x10/*web3.utils.toBN(16)*/).send({ from: accounts[0] }).then(asd => {
          console.log(asd);
          done();
        }).catch(e => {
          console.log("there was an error")
          done(new Error(e));
        });
      }).catch(e => {
        done(new Error(e));
      });
    });
  });
});
