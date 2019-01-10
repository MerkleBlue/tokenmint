/*jshint esversion: 6 */
import { expect } from 'chai';
import Web3 from 'web3';
const mintApi = require('../../src/api/mintApi');
import fetch from 'node-fetch';
import { BigNumber } from 'bignumber.js';
import TokenMintERC20MintableTokenJSON from '../../src/contracts/TokenMintERC20MintableToken.json';
import CMRPDCrowdsaleJSON from '../../src/contracts/CMRPDCrowdsale.json';

let web3, accounts;
let tokenMintAccount = "0x6603cb70464ca51481d4edBb3B927F66F53F4f42";
let icoMaker, investor1, investor2, investor3;
let startTime = Math.round((new Date().getTime() + 2000) / 1000); // 2 seconds in future
let endTime = Math.round((new Date().getTime() + 6000) / 1000); // 6 seconds in future
let tokenArgs = ["Token name", "SYM", 18, 0, tokenMintAccount, icoMaker];
let tokenServiceFeeETH = 0;
let crowdsaleServiceFeeETH = 0;

describe('CMRPDCrowdsale integration tests', function () {
  this.timeout(30000);

  before((beforeDone) => {
    // set global fetch because node doesn't have it
    global.fetch = fetch;
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3.eth.getAccounts().then(allAccounts => {
      accounts = allAccounts;
      icoMaker = accounts[0];
      investor1 = accounts[1];
      investor2 = accounts[2];
      investor3 = accounts[3];
      tokenArgs[5] = icoMaker
      beforeDone();
    });
  });

  beforeEach((done) => {
    mintApi.initWeb3();
    startTime = Math.round((new Date().getTime() + 2000) / 1000); // 2 seconds in future
    endTime = Math.round((new Date().getTime() + 6000) / 1000); // 6 seconds in future
    done();
  });

  it('Deploy CMRPDCrowdsale contract', (done) => {
    let crowdsaleArgs = [startTime, endTime, 500, icoMaker, null, web3.utils.toWei('1', 'ether'), web3.utils.toWei('0.1', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale contructor - invalid opening time', (done) => {
    let openingTime = Math.round((new Date().getTime() - 10000) / 1000); // 10 seconds in the past
    let crowdsaleArgs = [openingTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(() => {
      done(new Error('CMRPDCrowdsale deployed with invalid opening time.'));
    }).catch(() => {
      expect(true).to.be.eq(true);
      done();
    });
  });

  it('CMRPDCrowdsale contructor - invalid closing time', (done) => {
    let closingTime = startTime;
    let crowdsaleArgs = [startTime, closingTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(() => {
      done(new Error('CMRPDCrowdsale deployed with invalid closing time.'));
    }).catch(() => {
      expect(true).to.be.eq(true);
      done();
    });
  });

  it('CMRPDCrowdsale contructor - invalid rate', (done) => {
    let crowdsaleArgs = [startTime, endTime, 0, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(() => {
      done(new Error('CMRPDCrowdsale deployed with invalid rate (0).'));
    }).catch(() => {
      expect(true).to.be.eq(true);
      done();
    });
  });

  it('CMRPDCrowdsale contructor - invalid fundRaisingAddress', (done) => {
    let crowdsaleArgs = [startTime, endTime, 0, 0x0, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(() => {
      done(new Error('CMRPDCrowdsale deployed with invalid wallet (0x0).'));
    }).catch(() => {
      expect(true).to.be.eq(true);
      done();
    });
  });

  it('CMRPDCrowdsale contructor - invalid cap', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(() => {
      done(new Error('CMRPDCrowdsale deployed with invalid cap (0).'));
    }).catch(() => {
      expect(true).to.be.eq(true);
      done();
    });
  });

  it('CMRPDCrowdsale contructor - invalid goal', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(() => {
      done(new Error('CMRPDCrowdsale deployed with invalid goal (0).'));
    }).catch(() => {
      expect(true).to.be.eq(true);
      done();
    });
  });

  it('CMRPDCrowdsale (Crowdsale) - token()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
      crowdsaleInstance.methods.token().call().then(tokenAddress => {
        expect(tokenAddress).to.be.eq(receipts.tokenReceipt.contractAddress);
        done();
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Crowdsale) - wallet()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
      crowdsaleInstance.methods.wallet().call().then(wallet => {
        expect(wallet).to.be.eq(icoMaker);
        done();
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Crowdsale) - rate()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
      crowdsaleInstance.methods.rate().call().then(rate => {
        expect(rate).to.be.eq('1000');
        done();
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Crowdsale) - weiRaised()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(() => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {

          // check wei raised before investment
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.weiRaised().call().then(weiRaised => {
            expect(weiRaised).to.be.eq('0');

            // call buyTokens function of Crowdsale contract
            crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {

              // check wei raised after investment
              crowdsaleInstance.methods.weiRaised().call().then(weiRaised => {
                expect(weiRaised).to.be.eq(web3.utils.toWei('0.004', 'ether'));
                done();
              }).catch(e => {
                done(new Error(e));
              });
            }).catch(e => {
              done(new Error(e));
            });
          }).catch((e) => {
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

  it('CMRPDCrowdsale (Crowdsale) - buyTokens() and withdrawTokens()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {
        expect(receipt.status).to.be.eq(true);

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(receipt => {
            expect(receipt.status).to.be.eq(true);

            // check token balance after investment, should be 0 before finalization is called
            mintApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
              expect(parseInt(actualTokenBalance)).to.be.eq(0);

              // wait 6 seconds so that crowdsale is closed (timed crowdsale)
              let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
              delay(6000).then(() => {
                // finalize sale after goal is reached, anyone can call
                crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(receipt => {
                  expect(receipt.status).to.be.eq(true);

                  // withdraw tokens, anyone can call
                  crowdsaleInstance.methods.withdrawTokens(investor1).send({ from: investor1 }).then(receipt => {
                    expect(receipt.status).to.be.eq(true);

                    // check token balance after investment
                    mintApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
                      expect(parseInt(actualTokenBalance)).to.be.eq(4);
                      done();
                    });
                  }).catch(e => {
                    done(new Error(e));
                  });
                }).catch(e => {
                  done(new Error(e));
                });
              });
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

  it('CMRPDCrowdsale (Crowdsale) - buyTokens() with invalid beneficiary', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {
        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens('0x0000000000000000000000000000000000000000').send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {
            done(new Error('Buy tokens successfully executed when beneficiary address is invalid.'));
          }).catch(e => {
            expect(true).to.be.eq(true);
            done();
          });
        });
      }).catch((e) => {
        done(new Error(e));
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Crowdsale) - buyTokens() with invalid value', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0', 'ether') }).then(() => {
            done(new Error('Buy tokens successfully executed when beneficiary address is invalid.'));
          }).catch(e => {
            expect(true).to.be.eq(true);
            done();
          });
        });
      }).catch((e) => {
        done(new Error(e));
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Crowdsale) - fallback function and withdrawTokens()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {
        expect(receipt.status).to.be.eq(true);

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // send tokens directly to Crowdsale contract address
          web3.eth.sendTransaction({ from: investor1, to: receipts.crowdsaleReceipt.contractAddress, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(r => {
            expect(receipt.status).to.be.eq(true);

            // check token balance after investment, should be 0 before finalization is called
            mintApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
              expect(parseInt(actualTokenBalance)).to.be.eq(0);

              // wait 6 seconds so that crowdsale is closed (timed crowdsale)
              let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
              delay(6000).then(() => {
                // finalize sale after goal is reached, anyone can call
                let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
                crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(receipt => {
                  expect(receipt.status).to.be.eq(true);

                  // withdraw tokens, anyone can call
                  crowdsaleInstance.methods.withdrawTokens(investor1).send({ from: investor1 }).then(receipt => {
                    expect(receipt.status).to.be.eq(true);

                    // check token balance after investment
                    mintApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
                      expect(parseInt(actualTokenBalance)).to.be.eq(4);
                      done();
                    });
                  }).catch(e => {
                    done(new Error(e));
                  });
                }).catch(e => {
                  done(new Error(e));
                });
              });
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

  it('CMRPDCrowdsale (Capped) - cap()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.2', 'ether'), web3.utils.toWei('0.1', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
      crowdsaleInstance.methods.cap().call().then(cap => {
        expect(cap).to.be.eq(web3.utils.toWei('0.2', 'ether'));
        done();
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Capped) - capReached()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.1', 'ether'), web3.utils.toWei('0.01', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // invest less than a cap
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.099999999', 'ether') }).then(() => {

            // should not reach cap 0.099999 < 0.1
            crowdsaleInstance.methods.capReached().call().then(capReached => {
              expect(capReached).to.be.eq(false);

              // invest just a little bit to reach cap (to be equal to cap)
              crowdsaleInstance.methods.buyTokens(investor2).send({ from: investor2, gas: 4712388, value: web3.utils.toWei('0.000000001', 'ether') }).then(() => {

                // should reach cap 0.1 == 0.1
                crowdsaleInstance.methods.capReached().call().then(capReached => {
                  expect(capReached).to.be.eq(true);
                  done();
                });
              });
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

  it('CMRPDCrowdsale (Capped) - buyTokens() when cap reached', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.1', 'ether'), web3.utils.toWei('0.01', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // invest and reach cap
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor3).send({ from: investor3, gas: 4712388, value: web3.utils.toWei('0.1', 'ether') }).then(() => {

            // invest just a little bit more, should reject
            crowdsaleInstance.methods.buyTokens(investor2).send({ from: investor2, gas: 4712388, value: web3.utils.toWei('0.000000001', 'ether') }).then(() => {
              done(new Error('Cap reached, but crowdsale still active'));
            }).catch(e => {
              expect(true).to.be.eq(true);
              done();
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

  it('CMRPDCrowdsale (Refundable) - goal()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.2', 'ether'), web3.utils.toWei('0.1', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {
      let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
      crowdsaleInstance.methods.goal().call().then(goal => {
        expect(goal).to.be.eq(web3.utils.toWei('0.1', 'ether'));
        done();
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Refundable) - goalReached()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.1', 'ether'), web3.utils.toWei('0.01', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // invest less than a goal
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.0099999999', 'ether') }).then(() => {

            // should not reach goal 0.0099999 < 0.01
            crowdsaleInstance.methods.goalReached().call().then(goalReached => {
              expect(goalReached).to.be.eq(false);

              // invest just a little bit to reach goal (to be equal to goal)
              crowdsaleInstance.methods.buyTokens(investor2).send({ from: investor2, gas: 4712388, value: web3.utils.toWei('0.0000000001', 'ether') }).then(() => {

                // should reach goal 0.01 == 0.01
                crowdsaleInstance.methods.goalReached().call().then(goalReached => {
                  expect(goalReached).to.be.eq(true);
                  done();
                });
              });
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

  it('CMRPDCrowdsale (Refundable) - claimRefund()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.1', 'ether'), web3.utils.toWei('0.07', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // check ETH balance before investment
        mintApi.getEthBalance(investor1).then(ethBalanceBefore => {

          // wait 3 seconds before first investment
          let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
          delay(3000).then(() => {
            // call buyTokens function of Crowdsale contract, invest less than the goal
            let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
            crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.05', 'ether') }).then(() => {

              // check ETH balance after investment
              mintApi.getEthBalance(investor1).then(ethBalanceMid => {
                expect(ethBalanceBefore - ethBalanceMid - 0.05).to.be.lessThan(0.0025); // just 1 tx fee

                // wait 6 seconds so that crowdsale is closed (timed crowdsale)
                let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
                delay(6000).then(() => {
                  // finalize sale after goal is reached, anyone can call
                  crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(() => {

                    // withdraw tokens, anyone can call
                    crowdsaleInstance.methods.claimRefund(investor1).send({ from: investor1 }).then(() => {

                      // check token balance after investment, should be 0 after finalization and withdrawal since goal not met
                      mintApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
                        expect(parseInt(actualTokenBalance)).to.be.eq(0);

                        // check ETH balance after refund, should have the same as balance before minus 2 tx fees
                        mintApi.getEthBalance(investor1).then(ethBalanceAfter => {
                          expect(ethBalanceBefore - ethBalanceAfter).to.be.lessThan(0.005); // just 2 tx fees
                          done();
                        });
                      });
                    });
                  });
                });
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
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Refundable) - claimRefund() when not finalized', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract, invest less than the goal
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.002', 'ether') }).then(() => {

            // try to claim refund while crowdsale not finalized
            crowdsaleInstance.methods.claimRefund(investor1).send({ from: investor1 }).then(receipt => {
              done(new Error('Refund successfully claimed when crowdsale not finalized.'));
            }).catch(e => {
              expect(true).to.be.eq(true);
              done();
            });
          }).catch(e => {
            done(new Error(e));
          });
        });
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Refundable) - claimRefund() when finalized and goal reached', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract, invest more than the goal
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {

            // wait 6 seconds so that crowdsale is closed (timed crowdsale)
            let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
            delay(6000).then(() => {
              // finalize sale after goal is reached, anyone can call
              crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(() => {

                // try to claim refund while crowdsale not finalized
                crowdsaleInstance.methods.claimRefund(investor1).send({ from: investor1 }).then(() => {
                  done(new Error('Refund successfully claimed when crowdsale finalized and goal reached.'));
                }).catch(e => {
                  expect(true).to.be.eq(true);
                  done();
                });
              }).catch(e => {
                done(new Error(e));
              });
            }).catch(e => {
              done(new Error(e));
            });
          }).catch(e => {
            done(new Error(e));
          });
        });
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Finalizable) - finalize() and finalized()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract, invest more than the goal
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {

            // expect crowdsale is not finalized
            crowdsaleInstance.methods.finalized().call().then(finalized => {
              expect(finalized).to.be.eq(false);

              // wait 6 seconds so that crowdsale is closed (timed crowdsale)
              let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
              delay(6000).then(() => {
                // finalize sale after goal is reached, anyone can call
                crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(() => {
                  // expect crowsale to be finalized after finalize is called
                  crowdsaleInstance.methods.finalized().call().then(finalized => {
                    expect(finalized).to.be.eq(true);
                    done();
                  });
                }).catch(e => {
                  done(new Error(e));
                });
              }).catch(e => {
                done(new Error(e));
              });
            }).catch(e => {
              done(new Error(e));
            });
          }).catch(e => {
            done(new Error(e));
          });
        });
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Finalizable) - finalize() when finalized', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract, invest more than the goal
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {

            // wait 6 seconds so that crowdsale is closed (timed crowdsale)
            let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
            delay(6000).then(() => {
              // finalize sale after goal is reached, anyone can call
              crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(() => {
                // finalize sale after already finalized
                crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(() => {
                  done(new Error('Finalize successfully called on already finalized crowdsale.'));
                }).catch(e => {
                  expect(true).to.be.eq(true);
                  done();
                });
              }).catch(e => {
                done(new Error(e));
              });
            }).catch(e => {
              done(new Error(e));
            });
          }).catch(e => {
            done(new Error(e));
          });
        });
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Finalizable) - finalize() when not closed', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract, invest more than the goal
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {

            // finalize when not closed (before end time)
            crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(() => {
              done(new Error('Finalize successfully called on open crowdsale (not yet closed).'));
            }).catch(e => {
              expect(true).to.be.eq(true);
              done();
            });
          }).catch(e => {
            done(new Error(e));
          });
        });
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Finalizable) - buyTokens() when finalized', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract, invest more than the goal
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {

            // wait 6 seconds so that crowdsale is closed (timed crowdsale)
            let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
            delay(6000).then(() => {
              // finalize sale after goal is reached, anyone can call
              crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(() => {

                // buy tokens after finalized
                crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {
                  done(new Error('Buy tokens successfully called after finalize.'));
                }).catch(e => {
                  expect(true).to.be.eq(true);
                  done();
                });
              }).catch(e => {
                done(new Error(e));
              });
            }).catch(e => {
              done(new Error(e));
            });
          }).catch(e => {
            done(new Error(e));
          });
        });
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (PostDelivery) - withdrawTokens() when not closed', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {

            // withdraw tokens on open crowdsale (not yet closed)
            crowdsaleInstance.methods.withdrawTokens(investor1).send({ from: investor1 }).then(receipt => {
              done(new Error('Withdraw tokens successfully called on open crowdsale (not yet closed).'));
            }).catch(e => {
              expect(true).to.be.eq(true);
              done();
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

  it('CMRPDCrowdsale (PostDelivery) - withdrawTokens() when balance is 0', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {

            // wait 6 seconds so that crowdsale is closed (timed crowdsale)
            let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
            delay(6000).then(() => {
              // withdraw tokens when balance is 0 (investor who did not participate)
              crowdsaleInstance.methods.withdrawTokens(investor2).send({ from: investor2 }).then(receipt => {
                done(new Error('Withdraw tokens successfully called for non-participating investor.'));
              }).catch(e => {
                expect(true).to.be.eq(true);
                done();
              });
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

  it('CMRPDCrowdsale (PostDelivery) - balanceOf()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait 3 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // call buyTokens function of Crowdsale contract
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {

            // check balance for participating investor
            crowdsaleInstance.methods.balanceOf(investor1).call().then(balance => {
              expect(balance).to.be.eq(new BigNumber(4 * 10 ** tokenArgs[2]).toString());

              // check balance for non-participatin investor
              crowdsaleInstance.methods.balanceOf(investor2).call().then(balance => {
                expect(balance).to.be.eq('0');
                done();
              }).catch(e => {
                done(new Error(e));
              });
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

  it('CMRPDCrowdsale (Timed) - openingTime() and closingTime()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // check opening time
      let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
      crowdsaleInstance.methods.openingTime().call().then(openingTime => {
        expect(openingTime).to.be.eq(startTime.toString());

        // check closing time
        crowdsaleInstance.methods.closingTime().call().then(closingTime => {
          expect(closingTime).to.be.eq(endTime.toString());
          done();
        });
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Timed) - isOpen()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // call isOpen before opening time
      let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
      crowdsaleInstance.methods.isOpen().call().then(isOpen => {
        expect(isOpen).to.be.eq(false);

        // wait 3 seconds to get past opening time
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // check is open after opening time
          crowdsaleInstance.methods.isOpen().call().then(isOpen => {
            expect(isOpen).to.be.eq(true);

            // wait 6 seconds so that crowdsale is closed (timed crowdsale)
            let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
            delay(6000).then(() => {
              // NOTE: finalize sale, this is needed because of ganache,
              // it returns empty string if write operation is not called.
              // Probably block times don't update because no mining
              crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(() => {

                // check is open after closing time
                crowdsaleInstance.methods.isOpen().call().then(isOpen => {
                  expect(isOpen).to.be.eq(false);
                  done();
                }).catch(e => {
                  done(new Error(e));
                });
              }).catch(e => {
                done(new Error(e));
              });
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

  it('CMRPDCrowdsale (Timed) - hasClosed()', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // call isOpen before opening time
      let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
      crowdsaleInstance.methods.hasClosed().call().then(hasClosed => {
        expect(hasClosed).to.be.eq(false);

        // wait 3 seconds to get past opening time
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(3000).then(() => {
          // check has closed after opening time
          crowdsaleInstance.methods.hasClosed().call().then(hasClosed => {
            expect(hasClosed).to.be.eq(false);

            // wait 6 seconds so that crowdsale is closed (timed crowdsale)
            let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
            delay(6000).then(() => {
              // NOTE: finalize sale, this is needed because of ganache,
              // it returns empty string if write operation is not called.
              // Probably block times don't update because no mining
              crowdsaleInstance.methods.finalize().send({ from: investor1 }).then(() => {

                // check has closed after closing time
                crowdsaleInstance.methods.hasClosed().call().then(hasClosed => {
                  expect(hasClosed).to.be.eq(true);
                  done();
                }).catch(e => {
                  done(new Error(e));
                });
              }).catch(e => {
                done(new Error(e));
              });
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

  it('CMRPDCrowdsale (Timed) - buyTokens() before open', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // call buyTokens function before opening time
        let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
        crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {
          done(new Error('Buy tokens successfully called before opening time.'));
        }).catch(e => {
          expect(true).to.be.eq(true);
          done();
        });
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CMRPDCrowdsale (Timed) - buyTokens() after close', (done) => {
    let crowdsaleArgs = [startTime, startTime + 1, 1000, icoMaker, null, web3.utils.toWei('0.01', 'ether'), web3.utils.toWei('0.003', 'ether'), tokenMintAccount];
    mintApi.deployCMRPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(receipts => {

      // assign minter role to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20MintableTokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.addMinter(receipts.crowdsaleReceipt.contractAddress).send({ from: icoMaker }).then(receipt => {

        // wait a few seconds so that crowdsale is closed (timed crowdsale)
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(5000).then(() => {
          // call buyTokens function after crowdsale is closed
          let crowdsaleInstance = new web3.eth.Contract(CMRPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          crowdsaleInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.004', 'ether') }).then(() => {
            done(new Error('Buy tokens successfully called after closing time.'));
          }).catch(e => {
            expect(true).to.be.eq(true);
            done();
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
