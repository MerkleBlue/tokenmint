import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as mintApi from '../../api/mintApi';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as tokenOwnerFundsActions from './tokenOwnerFundsActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// const miningMessage = "Your tokens are being mined. This might take a few minutes. Confirm transaction in your wallet.";
// const rejectMessage = "Could not check token owner ETH funds.";
// const contractInstanceAddress = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
// const tokenName = "The First Amendment";
// const tokenSymbol = "TFA";
// const decimals = "18";
// const totalSupply = "1000";
// const tokenType = "erc20";
const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";

describe("tokenOwnerFundsActions tests", () => {
  it("checks token owner funds successfully - token owner has enough funds", (done) => {
    const createTokensStub = sinon.stub(mintApi, "checkTokenOwnerFunds").resolves(true);
    const expectedActions = [
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: true },
      { type: types.SET_TOKEN_OWNER_HAS_ENOUGH_FUNDS, tokenOwnerHasEnoughFunds: true },
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: false }
    ];
    const store = mockStore({ checkingTokenOwnerFunds: false, tokenOwnerHasEnoughFunds: false }, expectedActions);
    store.dispatch(tokenOwnerFundsActions.checkFunds(tokenOwner)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      createTokensStub.restore();
      done();
    });
  });

  it("checks token owner funds successfully - token owner has insufficient funds", (done) => {
    const createTokensStub = sinon.stub(mintApi, "checkTokenOwnerFunds").resolves(false);
    const expectedActions = [
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: true },
      { type: types.SET_TOKEN_OWNER_HAS_ENOUGH_FUNDS, tokenOwnerHasEnoughFunds: false },
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: false }
    ];
    const store = mockStore({ checkingTokenOwnerFunds: false, tokenOwnerHasEnoughFunds: false }, expectedActions);
    store.dispatch(tokenOwnerFundsActions.checkFunds(tokenOwner)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      createTokensStub.restore();
      done();
    });
  });

  it("checks token owner funds successfully with exception", (done) => {
    const createTokensStub = sinon.stub(mintApi, "checkTokenOwnerFunds").rejects(new Error("Not enough funds."));
    const expectedActions = [
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: true },
      { type: types.SET_TOKEN_OWNER_HAS_ENOUGH_FUNDS, tokenOwnerHasEnoughFunds: false },
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: false }
    ];
    const store = mockStore({ checkingTokenOwnerFunds: false, tokenOwnerHasEnoughFunds: false }, expectedActions);
    store.dispatch(tokenOwnerFundsActions.checkFunds(tokenOwner)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      createTokensStub.restore();
      done();
    });
  });
});
