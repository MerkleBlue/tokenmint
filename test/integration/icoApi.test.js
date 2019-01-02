/*jshint esversion: 6 */
import { assert, expect } from 'chai';
import Web3 from 'web3';
const icoApi = require('../../src/api/icoApi');
import fetch from 'node-fetch';
import { BigNumber } from 'bignumber.js';
import TokenMintERC20TokenJSON from '../../src/contracts/TokenMintERC20Token.json';
import CrowdsaleJSON from '../../src/contracts/Crowdsale.json';
import AllowanceCrowdsaleImplJSON from '../../src/contracts/AllowanceCrowdsaleImpl.json';
import TimedCappedAllowanceCrowdsaleJSON from '../../src/contracts/TimedCappedAllowanceCrowdsale.json';



let web3, accounts;
let tokenMintAccount = "0x6603cb70464ca51481d4edBb3B927F66F53F4f42";
let icoMaker, investor1, investor2, investor3;
let tommorowDate = new Date(new Date().setDate(new Date().getDate() + 1));
let tommorow = Math.round(tommorowDate.getTime() / 1000);
let twoSecsInFuture = Math.round((new Date().getTime() + 2000) / 1000);

/*let dates = {
  yesterday: new Date(new Date().setDate(new Date().getDate() - 1)),
  tommorow: new Date(new Date().setDate(new Date().getDate() + 1)),
  tommorowUnixTimeStamp: Math.round(tommorow.getTime() / 1000)
}*/

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
      beforeDone();
    });
  });

  beforeEach((done) => {
    icoApi.initWeb3();
    twoSecsInFuture = Math.round((new Date().getTime() + 2000) / 1000);
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
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, icoMaker];
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
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, icoMaker];
    let crowdsaleArgs = [500, icoMaker];
    icoApi.deployAllowanceCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Deploy TimedCappedAllowanceCrowdsale contract', (done) => {
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, icoMaker];
    let crowdsaleArgs = [twoSecsInFuture, tommorow, 500, icoMaker, null, web3.utils.toWei('10', 'ether'), icoMaker];
    icoApi.deployTimedCappedAllowanceCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Crowdsale invest - using buyTokens', (done) => {
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, icoMaker];
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
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, icoMaker];
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
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, icoMaker];
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
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, icoMaker];
    let crowdsaleArgs = [1000, icoMaker];
    icoApi.deployAllowanceCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(success => {
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
      }).catch((e) => {
        done(new Error(e));
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('TimedCappedAllowanceCrowdsale invest - using buyTokens', (done) => {
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, icoMaker];
    let crowdsaleArgs = [twoSecsInFuture, tommorow, 1000, icoMaker, null, web3.utils.toWei('10', 'ether'), icoMaker];
    icoApi.deployTimedCappedAllowanceCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(receipt => {
        expect(receipt.status).to.be.eq(true);

        // wait two seconds before first investment
        var delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
        delay(2000).then(() => {
          // call buyTokens function of Crowdsale contract
          let contractInstance = new web3.eth.Contract(TimedCappedAllowanceCrowdsaleJSON.abi, receipts.crowdsaleReceipt.contractAddress);
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
        });
      }).catch((e) => {
        done(new Error(e));
      });
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('TimedCappedAllowanceCrowdsale invest - using sendTransaction', (done) => {
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, icoMaker];
    let crowdsaleArgs = [twoSecsInFuture, tommorow, 1000, icoMaker, null, web3.utils.toWei('10', 'ether'), icoMaker];
    icoApi.deployTimedCappedAllowanceCrowdsale(icoMaker, tokenArgs, crowdsaleArgs).then(receipts => {
      expect(receipts.tokenReceipt.status).to.be.eq(true);
      expect(receipts.crowdsaleReceipt.status).to.be.eq(true);

      // approve all tokens to crowdsale contract
      let tokenInstance = new web3.eth.Contract(TokenMintERC20TokenJSON.abi, receipts.tokenReceipt.contractAddress);
      tokenInstance.methods.approve(receipts.crowdsaleReceipt.contractAddress, new BigNumber(tokenArgs[3] * 10 ** tokenArgs[2]).toString()).send({ from: icoMaker }).then(receipt => {
        expect(receipt.status).to.be.eq(true);

        // wait two seconds before first investment
        var delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
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

  /*it('Deploy SafeMathLib', (done) => {
    icoApi.deploySafeMathLib(accounts[0]).then(receipt => {
      expect(receipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Deploy FlatPricing contract', (done) => {
    let owner = accounts[0];
    icoApi.deployFlatPricing(owner, [100]).then(receipt => {
      expect(receipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      done(new Error(e));
    });
  });

  it('Deploy Crowdsale contract', (done) => {
    let owner = accounts[0];
    let tokenArgs = ["Name", "SYM", 18, 1000, tokenMintAccount, accounts[0]];
    let crowdsaleArgs = [owner, Math.round(dates.yesterday.getTime() / 1000), Math.round(dates.tommorow.getTime() / 1000), 500, owner];
    icoApi.deployAllocatedCrowdsale(owner, tokenArgs, [100], allocatedCrowdsaleArgs).then(receipt => {
      expect(receipt.crowdsaleTokenReceipt.status).to.be.eq(true);
      expect(receipt.allocatedCrowdsaleReceipt.status).to.be.eq(true);
      expect(receipt.finalizeAgentReceipt.status).to.be.eq(true);
      done();
    }).catch(e => {
      console.log(e)
      done(new Error(e));
    });
  });

  it('AllocatedCrowdsale getState', (done) => {
    let owner = accounts[0];
    let tokenArgs = ["Name", "SYM", 1000, 18, true];
    let allocatedCrowdsaleArgs = [owner, Math.round(dates.yesterday.getTime() / 1000), Math.round(dates.tommorow.getTime() / 1000), 500, owner];
    icoApi.deployAllocatedCrowdsale(owner, tokenArgs, [100], allocatedCrowdsaleArgs).then(receipt => {
      expect(receipt.crowdsaleTokenReceipt.status).to.be.eq(true);
      expect(receipt.allocatedCrowdsaleReceipt.status).to.be.eq(true);
      expect(receipt.finalizeAgentReceipt.status).to.be.eq(true);
      icoApi.getCrowdsaleState(receipt.allocatedCrowdsaleReceipt.contractAddress).then(state => {
        console.log(state)
        done();
      });

    }).catch(e => {
      console.log(e)
      done(new Error(e));
    });
  });

  /*it('Deploy DefaultFinalizeAgent contract', (done) => {
    let owner = accounts[0];
    let tokenInfo = ["Name", "SYM", 1000, 18, true];
    icoApi.deployAllocatedCrowdsale(owner, tokenInfo, [100]).then(receipt => {
      expect(receipt.crowdsaleTokenReceipt.status).to.be.eq(true);
      expect(receipt.allocatedCrowdsaleReceipt.status).to.be.eq(true);
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

  it('AllocatedCrowdsale buy', (done) => {
    let icoMaker = accounts[0];
    let investor1 = accounts[1];
    let investor2 = accounts[2];
    let owner = accounts[0];
    let tokenArgs = ["Name", "SYM", 1000, 18, true];
    let allocatedCrowdsaleArgs = [owner, Math.round(dates.yesterday.getTime() / 1000), Math.round(dates.tommorow.getTime() / 1000), 500, owner];
    icoApi.deployAllocatedCrowdsale(icoMaker, tokenArgs, [100], allocatedCrowdsaleArgs).then(receipt => {
      //expect(receipt.status).to.be.eq(true);
      let contractInstance = new web3.eth.Contract(AllocatedCrowdsaleJSON.abi, receipt.allocatedCrowdsaleReceipt.contractAddress);

      contractInstance.methods.buy().send({ from: investor1, gas: 4712388, value: web3.utils.toWei('0.01', 'ether') }).then(r => {
        let contractInstance = new web3.eth.Contract(CrowdsaleTokenJSON.abi, receipt.crowdsaleTokenReceipt.contractAddress);
        icoApi.getTokenBalance(contractInstance, investor1).then(actualTokenBalance => {
          expect(parseInt(actualTokenBalance)).to.be.eq(100);
          done();
        }).catch(e => {
          console.log(e)
          done(new Error(e));
        });
      }).catch(e => {
        done(new Error(e));
      });
    }).catch(e => {
      console.log(e)
      done(new Error(e));
    });
  });

  // uncomment later, don't delete
  /*it('CrowsaleToken transfer', (done) => {
    // NOTE: transfer only works after token is released, see RelasableToken transfer()
    icoApi.deployCrowdsaleToken(accounts[0], token.name, token.symbol, token.totalSupply, token.decimals, false).then(receipt => {
      let contractInstance = new web3.eth.Contract(CrowdsaleTokenJSON.abi, receipt.contractAddress);
      icoApi.getTokenBalance(contractInstance, accounts[0]).then(actualTokenBalance => {
        console.log(actualTokenBalance)
        expect(parseInt(actualTokenBalance)).to.be.eq(token.totalSupply);
        //contractInstance.methods.transfer2(accounts[1], new BigNumber(20 * 10 ** token.decimals).toString()).send({ from: accounts[0] }).then(receipt => {
        contractInstance.methods.transfer(accounts[1], new BigNumber(20 * 10 ** token.decimals).toString()).send({ from: accounts[0] }).then(receipt => {
          icoApi.getTokenBalance(contractInstance, accounts[1]).then(actualTokenBalance => {
            expect(parseInt(actualTokenBalance)).to.be.eq(20);
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
  });*/
});
