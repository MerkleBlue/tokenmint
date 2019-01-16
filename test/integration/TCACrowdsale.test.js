/*jshint esversion: 6 */
import { expect } from 'chai';
import Web3 from 'web3';
const mintApi = require('../../src/api/mintApi');
import fetch from 'node-fetch';
import { BigNumber } from 'bignumber.js';
import TokenMintERC20TokenJSON from '../../src/contracts/TokenMintERC20Token.json';
import TCACrowdsaleJSON from '../../src/contracts/TCACrowdsale.json';


let web3, accounts;
let icoMaker, investor1;
let startTime = Math.round((new Date().getTime() + 2000) / 1000); // 2 seconds in future
let endTime = Math.round((new Date().getTime() + 6000) / 1000); // 6 seconds in future
let tokenArgs = ["Token name", "SYM", 18, 1000, icoMaker];
let tokenServiceFeeETH = 0;
let crowdsaleServiceFeeETH = 0;

describe('TCACrowdsale integration tests', function () {
  this.timeout(30000);

  before((beforeDone) => {
    // set global fetch because node doesn't have it
    global.fetch = fetch;
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3.eth.getAccounts().then(allAccounts => {
      accounts = allAccounts;
      icoMaker = accounts[0];
      investor1 = accounts[1];
      tokenArgs[4] = icoMaker;
      beforeDone();
    });
  });

  beforeEach((done) => {
    mintApi.initWeb3();
    startTime = Math.round((new Date().getTime() + 2000) / 1000); // 2 seconds in future
    endTime = Math.round((new Date().getTime() + 6000) / 1000); // 6 seconds in future
    done();
  });

  it('Deploy TCACrowdsale contract', (done) => {
    let crowdsaleArgs = [startTime, endTime, 500, icoMaker, null, web3.utils.toWei('1', 'ether'), icoMaker, null];
    mintApi.deployTCACrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('TCACrowdsale invest - using buyTokens', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('10', 'ether'), icoMaker, null];
    mintApi.deployTCACrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(receipt => {
        expect(receipt.status).to.be.eq(true);

        // wait 2 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract
          let crowdsaleInstance = new web3.eth.Contract(TCACrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.02', 'ether') }).then(receipt => {
            expect(receipt.status).to.be.eq(true);

            // check token balance after investment
            mintApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
              expect(parseInt(actualTokenBalance)).to.be.eq(20);
              done();
            }).catch(e => {
              done(new Error(e));
            });
          }).catch(e => {
            done(new Error(e));
          });
        });
      }).catch((e) => {
        done(new Error(e));
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('TCACrowdsale invest - using sendTransaction', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('10', 'ether'), icoMaker, null];
    mintApi.deployTCACrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(receipt => {
        expect(receipt.status).to.be.eq(true);

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // send tokens directly to Crowdsale contract address
          web3.eth.sendTransaction({ from: investor1, to: receipts.crowdsaleReceipt.contractAddress, gas: 4712388, value: web3.utils.toWei('0.02', 'ether') }).then(r => {
            // check token balance after investment
            mintApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
              expect(parseInt(actualTokenBalance)).to.be.eq(20);
              done();
            }).catch(e => {
              done(new Error(e));
            });
          }).catch(e => {
            done(new Error(e));
          });
        });
      }).catch((e) => {
        done(new Error(e));
      });
    }).catch(e => {
      done(new Error(e));
    });
  });
});
