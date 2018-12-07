/*jshint esversion: 6 */
import { assert, expect } from 'chai';
import Web3 from 'web3';
const icoApi = require('../../src/api/icoApi');
import fetch from 'node-fetch';
import SafeMathLibJSON from '../../src/contracts/SafeMathLib.json';
import FlatPricingJSON from '../../src/contracts/FlatPricing.json';


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

  it('Load accounts', (done) => {
    icoApi.loadAccounts().then(actualAccounts => {
      expect(actualAccounts).to.eql(accounts);
      done();
    });
  });

  it('Get fee', (done) => {
    icoApi.getFee().then(fee => {
      expect(fee).to.be.greaterThan(0.3);
      done();
    });
  });

  it('Get ETH balance with empty account', (done) => {
    icoApi.getEthBalance('0x1000000000000000000000000000000000000000').then(actual => {
      expect(web3.utils.fromWei(actual, 'ether')).to.be.eq('0');
      done();
    });
  });

  it('Get ETH balance with first account', (done) => {
    web3.eth.getBalance(accounts[0]).then(actual => {
      icoApi.getEthBalance(accounts[0]).then(expected => {
        expect(web3.utils.fromWei(actual, 'ether')).to.be.eq(expected);
        done();
      });
    });
  });

  /*it('Deploy SafeMathLib', (done) => {
    icoApi.deploySafeMathLib(accounts[0]).then(txHash => {
      web3.eth.getTransactionReceipt(txHash).then(receipt => {
        expect(receipt.status).to.be.eq(true);
        done();
      });
    }).catch(e => {
      done(new Error());
    });
  })*/

  it('Deploy FlatPricing contract', (done) => {
    icoApi.deployFlatPricing(accounts[0]).then(txHash => {
      web3.eth.getTransactionReceipt(txHash).then(receipt => {
        expect(receipt.status).to.be.eq(true);
        done();
      });
    }).catch(e => {
      done(new Error());
    });
  });
});
