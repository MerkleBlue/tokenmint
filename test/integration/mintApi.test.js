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

  it('Get fee', (done) => {
    mintApi.getFee().then(fee => {
      expect(fee).to.be.greaterThan(0.3);
      done();
    });
  });

  it('Get ETH balance', (done2) => {
    web3.eth.getBalance(accounts[0]).then(actual => {
      mintApi.getEthBalance(accounts[0]).then(expected => {
        expect(web3.utils.fromWei(actual, 'ether')).to.be.eq(expected);
        done2();
      });
    });
  });


});
