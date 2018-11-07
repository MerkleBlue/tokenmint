import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as mintApi from '../../api/mintApi';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as tokenOwnerFundsActions from './tokenOwnerFundsActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";

describe("tokenOwnerFundsActions tests", () => {
  it("checks token owner funds successfully - token owner has enough funds", (done) => {
    const createTokensStub = sinon.stub(mintApi, "checkTokenOwnerFunds").resolves({
      tokenOwnerBalance: 0.5,
      serviceFee: 0.25
    });
    const expectedActions = [
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: true },
      { type: types.SET_TOKEN_OWNER_HAS_INSUFFICIENT_FUNDS, tokenOwnerHasInsufficientFunds: false },
      { type: types.SET_TOKEN_OWNER_BALANCE, tokenOwnerBalance: 0.5 },
      { type: types.SET_SERVICE_FEE, serviceFee: 0.25 },
      { type: types.SET_TOKEN_OWNER_HAS_INSUFFICIENT_FUNDS, tokenOwnerHasInsufficientFunds: false },
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: false }
    ];
    const store = mockStore({ checkingTokenOwnerFunds: false, tokenOwnerBalance: 0, serviceFee: 0, tokenOwnerHasInsufficientFunds: false }, expectedActions);
    store.dispatch(tokenOwnerFundsActions.checkFunds(tokenOwner)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      expect(actions[3]).to.deep.equal(expectedActions[3]);
      expect(actions[4]).to.deep.equal(expectedActions[4]);
      expect(actions[5]).to.deep.equal(expectedActions[5]);
      createTokensStub.restore();
      done();
    });
  });

  it("checks token owner funds successfully - token owner has insufficient funds", (done) => {
    const createTokensStub = sinon.stub(mintApi, "checkTokenOwnerFunds").resolves({
      tokenOwnerBalance: 0.25,
      serviceFee: 0.5
    });
    const expectedActions = [
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: true },
      { type: types.SET_TOKEN_OWNER_HAS_INSUFFICIENT_FUNDS, tokenOwnerHasInsufficientFunds: false },
      { type: types.SET_TOKEN_OWNER_BALANCE, tokenOwnerBalance: 0.25 },
      { type: types.SET_SERVICE_FEE, serviceFee: 0.5 },
      { type: types.SET_TOKEN_OWNER_HAS_INSUFFICIENT_FUNDS, tokenOwnerHasInsufficientFunds: true },
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: false }
    ];
    const store = mockStore({ checkingTokenOwnerFunds: false, tokenOwnerBalance: 0, serviceFee: 0, tokenOwnerHasInsufficientFunds: false }, expectedActions);
    store.dispatch(tokenOwnerFundsActions.checkFunds(tokenOwner)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      expect(actions[3]).to.deep.equal(expectedActions[3]);
      expect(actions[4]).to.deep.equal(expectedActions[4]);
      expect(actions[5]).to.deep.equal(expectedActions[5]);
      createTokensStub.restore();
      done();
    });
  });

  it("checks token owner funds with exception", (done) => {
    const createTokensStub = sinon.stub(mintApi, "checkTokenOwnerFunds").rejects(new Error("Not enough funds."));
    const expectedActions = [
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: true },
      { type: types.SET_TOKEN_OWNER_HAS_INSUFFICIENT_FUNDS, tokenOwnerHasInsufficientFunds: false },
      { type: types.SET_TOKEN_OWNER_BALANCE, tokenOwnerBalance: 0 },
      { type: types.SET_SERVICE_FEE, serviceFee: -1 },
      { type: types.SET_TOKEN_OWNER_HAS_INSUFFICIENT_FUNDS, tokenOwnerHasInsufficientFunds: false },
      { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: false }
    ];
    const store = mockStore({ checkingTokenOwnerFunds: false, tokenOwnerBalance: 0, serviceFee: 0, tokenOwnerHasInsufficientFunds: false }, expectedActions);
    store.dispatch(tokenOwnerFundsActions.checkFunds(tokenOwner)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      expect(actions[3]).to.deep.equal(expectedActions[3]);
      expect(actions[4]).to.deep.equal(expectedActions[4]);
      expect(actions[5]).to.deep.equal(expectedActions[5]);
      createTokensStub.restore();
      done();
    });
  });
});
