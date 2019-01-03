/*jshint esversion: 6 */
import { assert, expect } from 'chai';
import Web3 from 'web3';
const icoApi = require('../../src/api/icoApi');
import fetch from 'node-fetch';
import { BigNumber } from 'bignumber.js';
import TokenMintERC20TokenJSON from '../../src/contracts/TokenMintERC20Token.json';
import CrowdsaleJSON from '../../src/contracts/Crowdsale.json';
import AllowanceCrowdsaleImplJSON from '../../src/contracts/AllowanceCrowdsaleImpl.json';
import TCACrowdsaleJSON from '../../src/contracts/TCACrowdsale.json';
import CARPDCrowdsaleJSON from '../../src/contracts/CARPDCrowdsale.json';



let web3, accounts;
let tokenMintAccount = "0x6603cb70464ca51481d4edBb3B927F66F53F4f42";
let icoMaker, investor1, investor2, investor3;
let tommorowDate = new Date(new Date().setDate(new Date().getDate() + 1));
let tommorow = Math.round(tommorowDate.getTime() / 1000);
let startTime = Math.round((new Date().getTime() + 2000) / 1000); // 2 seconds in future
let endTime = Math.round((new Date().getTime() + 6000) / 1000); // 6 seconds in future
let tokenArgs = ["Token name", "SYM", 18, 1000, tokenMintAccount, icoMaker];

describe('TokenMint icoApi integration tests', function () {
  this.timeout(120000);

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
    icoApi.initWeb3();
    startTime = Math.round((new Date().getTime() + 2000) / 1000); // 2 seconds in future
    endTime = Math.round((new Date().getTime() + 6000) / 1000); // 6 seconds in future
    done();
  });

  it('Deploy Token contract', (done) => {
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, icoMaker];
    icoApi.deployCrowdsaleToken(accounts[0], ...tokenArgs).then(receipt => {
      expect(receipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Deploy Crowdsale contract', (done) => {
    let crowdsaleArgs = [500, icoMaker];
    icoApi.deployCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Deploy AllowanceCrowdsale contract', (done) => {
    let crowdsaleArgs = [500, icoMaker];
    icoApi.deployAllowanceCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Deploy TCACrowdsale contract', (done) => {
    let crowdsaleArgs = [startTime, endTime, 500, icoMaker, null, web3.utils.toWei('1', 'ether'), icoMaker];
    icoApi.deployTCACrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Deploy CARPDCrowdsale contract', (done) => {
    let crowdsaleArgs = [startTime, endTime, 500, icoMaker, null, web3.utils.toWei('1', 'ether'), web3.utils.toWei('0.1', 'ether'), icoMaker];
    icoApi.deployCARPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Crowdsale invest - using buyTokens', (done) => {
    let crowdsaleArgs = [1000, icoMaker];
    icoApi.deployCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // transfer all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.transfer(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(success => {
        // call buyTokens function of Crowdsale contract
        let contractInstance = new web3.eth.Contract(CrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
        contractInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.02', 'ether') }).then(r => {
          // check token balance after investment
          icoApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
            expect(parseInt(actualTokenBalance)).to.be.eq(20);
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
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Crowdsale invest - using sendTransaction', (done) => {
    let crowdsaleArgs = [1000, icoMaker];
    icoApi.deployCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // transfer all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.transfer(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(success => {
        // buy tokens by sending money to Crowdsale contract address (regular value tx)
        web3.eth.sendTransaction({ from: investor1, to: receipts.crowdsaleReceipt.contractAddress, gas: 4712388, value: web3.utils.toWei('0.03', 'ether') }).then(r => {
          // check token balance after investment
          icoApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
            expect(parseInt(actualTokenBalance)).to.be.eq(30);
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
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('AllowanceCrowdsaleImpl invest - using buyTokens', (done) => {
    let crowdsaleArgs = [1000, icoMaker];
    icoApi.deployAllowanceCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(success => {
        // call buyTokens function of Crowdsale contract
        let contractInstance = new web3.eth.Contract(AllowanceCrowdsaleImplJSON.abi, receipts.crowdsaleReceipt.contractAddress);
        contractInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.02', 'ether') }).then(r => {
          // check token balance after investment
          icoApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
            expect(parseInt(actualTokenBalance)).to.be.eq(20);
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
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('AllowanceCrowdsaleImpl invest - using sendTransaction', (done) => {
    let crowdsaleArgs = [1000, icoMaker];
    icoApi.deployAllowanceCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(success => {
        // send tokens directly to Crowdsale contract address
        web3.eth.sendTransaction({ from: investor1, to: receipts.crowdsaleReceipt.contractAddress, gas: 4712388, value: web3.utils.toWei('0.02', 'ether') }).then(receipt => {
          expect(receipt.status).to.be.eq(true);

          // check token balance after investment
          icoApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
            expect(parseInt(actualTokenBalance)).to.be.eq(20);
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
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('TCACrowdsale invest - using buyTokens', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('10', 'ether'), icoMaker];
    icoApi.deployTCACrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(receipt => {
        expect(receipt.status).to.be.eq(true);

        // wait 2 seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(2000).then(() => {
          // call buyTokens function of Crowdsale contract
          let contractInstance = new web3.eth.Contract(TCACrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          contractInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.02', 'ether') }).then(receipt => {
            expect(receipt.status).to.be.eq(true);

            // check token balance after investment
            icoApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
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
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('10', 'ether'), icoMaker];
    icoApi.deployTCACrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(receipt => {
        expect(receipt.status).to.be.eq(true);

        // wait two seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(2000).then(() => {
          // send tokens directly to Crowdsale contract address
          web3.eth.sendTransaction({ from: investor1, to: receipts.crowdsaleReceipt.contractAddress, gas: 4712388, value: web3.utils.toWei('0.02', 'ether') }).then(r => {
            // check token balance after investment
            icoApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
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

  it('CARPDCrowdsale invest - using buyTokens', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('1', 'ether'), web3.utils.toWei('0.1', 'ether'), icoMaker];
    icoApi.deployCARPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(receipt => {
        expect(receipt.status).to.be.eq(true);

        // wait two seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(2000).then(() => {
          // call buyTokens function of Crowdsale contract
          let contractInstance = new web3.eth.Contract(CARPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          contractInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.2', 'ether') }).then(receipt => {
            expect(receipt.status).to.be.eq(true);

            // check token balance after investment, should be 0 before finalization is called
            icoApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
              expect(parseInt(actualTokenBalance)).to.be.eq(0);

              // wait 5 seconds so that crowdsale is closed (timed crowdsale)
              let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
              delay(5000).then(() => {
                // finalize sale after goal is reached, anyone can call
                contractInstance.methods.finalize().send({ from: investor1 }).then(receipt => {
                  expect(receipt.status).to.be.eq(true);

                  // withdraw tokens, anyone can call
                  contractInstance.methods.withdrawTokens(investor1).send({ from: investor1 }).then(receipt => {
                    expect(receipt.status).to.be.eq(true);

                    // check token balance after investment, should be 200 after finalization and withdrawal
                    icoApi.getTokenBalance(tokenInstance, investor1).then(actualTokenBalance => {
                      expect(parseInt(actualTokenBalance)).to.be.eq(200);
                      done();
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
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CARPDCrowdsale (Capped) - cap() function', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.2', 'ether'), web3.utils.toWei('0.1', 'ether'), icoMaker];
    icoApi.deployCARPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {

      // call buyTokens function of Crowdsale contract
      let contractInstance = new web3.eth.Contract(CARPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
      contractInstance.methods.cap().call().then(cap => {
        expect(cap).to.be.eq(web3.utils.toWei('0.2', 'ether'));
        done();
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CARPDCrowdsale (Capped) - capReached() function', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.1', 'ether'), web3.utils.toWei('0.01', 'ether'), icoMaker];
    icoApi.deployCARPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(receipt => {

        // wait two seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(2000).then(() => {
          // invest less than a cap
          let contractInstance = new web3.eth.Contract(CARPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          contractInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.099999999', 'ether') }).then(() => {

            // should not reach cap 0.099999 < 0.1
            contractInstance.methods.capReached().call().then(capReached => {
              expect(capReached).to.be.eq(false);

              // invest just a little bit to reach cap (to be equal to cap)
              contractInstance.methods.buyTokens(investor2).send({ from: investor2, gas: 4712388, value: web3.utils.toWei('0.000000001', 'ether') }).then(() => {

                // should reach cap 0.1 == 0.1
                contractInstance.methods.capReached().call().then(capReached => {
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

  it('CARPDCrowdsale (Capped) - invest when cap reached', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.1', 'ether'), web3.utils.toWei('0.01', 'ether'), icoMaker];
    icoApi.deployCARPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(receipt => {

        // wait two seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(2000).then(() => {
          // invest and reach cap
          let contractInstance = new web3.eth.Contract(CARPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          contractInstance.methods.buyTokens(investor3).send({ from: investor3, gas: 4712388, value: web3.utils.toWei('0.1', 'ether') }).then(() => {

            // invest just a little bit more, should reject
            contractInstance.methods.buyTokens(investor2).send({ from: investor2, gas: 4712388, value: web3.utils.toWei('0.000000001', 'ether') }).then(() => {
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

  it('CARPDCrowdsale (Allowance) - tokenWallet() function', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.1', 'ether'), web3.utils.toWei('0.1', 'ether'), icoMaker];
    icoApi.deployCARPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // call buyTokens function of Crowdsale contract
      let contractInstance = new web3.eth.Contract(CARPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
      contractInstance.methods.tokenWallet().call().then(walletAddress => {
        expect(walletAddress).to.be.eq(icoMaker);
        done();
      }).catch(e => {
        done(new Error(e));
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('CARPDCrowdsale (Allowance) - remainingTokens() function', (done) => {
    let crowdsaleArgs = [startTime, endTime, 1000, icoMaker, null, web3.utils.toWei('0.1', 'ether'), web3.utils.toWei('0.1', 'ether'), icoMaker];
    icoApi.deployCARPDCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(receipt => {
        expect(receipt.status).to.be.eq(true);

        // wait two seconds before first investment
        let delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(2000).then(() => {

          // check remaining tokens before investments
          let contractInstance = new web3.eth.Contract(CARPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
          contractInstance.methods.remainingTokens().call().then(remainingTokens => {
            expect(remainingTokens).to.be.eq(new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString());

            // buy half the tokens
            contractInstance.methods.buyTokens(investor1).send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.05', 'ether') }).then(receipt => {

              // check remaining tokens after investment
              // NOTE: since it's post delivery, remaining tokens is the same,
              // so this function doesn't make sense much
              let contractInstance = new web3.eth.Contract(CARPDCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
              contractInstance.methods.remainingTokens().call().then(remainingTokens => {
                expect(remainingTokens).to.be.eq(new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString());
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
});
