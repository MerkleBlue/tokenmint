/*jshint esversion: 6 */
import { assert, expect } from 'chai';
import Web3 from 'web3';
const icoApi = require('../../src/api/icoApi');
import fetch from 'node-fetch';

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
    icoApi.deploySafeMathLib(accounts[0]).then(txHash => {
      web3.eth.getTransactionReceipt(txHash).then(receipt => {
        expect(receipt.status).to.be.eq(true);
        done();
      });
    }).catch(e => {
      done(new Error());
    });
  });

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

  it('Deploy CrowdsaleToken contract', (done) => {
    icoApi.deployCrowdsaleToken(accounts[0], "Name", "SYM", 1000, 18, true).then(txHash => {
      web3.eth.getTransactionReceipt(txHash).then(receipt => {
        expect(receipt.status).to.be.eq(true);
        done();
      });
    }).catch(e => {
      console.log(e)
      done(new Error());
    });
  });

  /*it('Deploy UncappedCrowdsale contract', (done) => {
    icoApi.deployFlatPricing(accounts[0]).then(txHash => {
      web3.eth.getTransactionReceipt(txHash).then(receipt => {
        expect(receipt.status).to.be.eq(true);
        done();
      });
    }).catch(e => {
      done(new Error());
    });
  });*/
});
