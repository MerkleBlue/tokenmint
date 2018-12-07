import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as mintApi from '../../api/mintApi';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as payingAccountFundsActions from './payingAccountFundsActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const payingAccount = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";

describe("payingAccountFundsActions tests", () => {
  it("checks paying account funds successfully - paying account has enough funds", (done) => {
    const checkAccountFundsStub = sinon.stub(mintApi, "checkAccountFunds").resolves({
      accountBalance: 0.5,
      serviceFee: 0.25
    });
    const expectedActions = [
      { type: types.SET_CHECKING_PAYING_ACCOUNT_FUNDS, checkingPayingAccountFunds: true },
      { type: types.SET_PAYING_ACCOUNT_HAS_INSUFFICIENT_FUNDS, payingAccountHasInsufficientFunds: false },
      { type: types.SET_PAYING_ACCOUNT_BALANCE, payingAccountBalance: 0.5 },
      { type: types.SET_SERVICE_FEE, serviceFee: 0.25 },
      { type: types.SET_PAYING_ACCOUNT_HAS_INSUFFICIENT_FUNDS, payingAccountHasInsufficientFunds: false },
      { type: types.SET_CHECKING_PAYING_ACCOUNT_FUNDS, checkingPayingAccountFunds: false }
    ];
    const store = mockStore({ checkingPayingAccountFunds: false, payingAccountBalance: 0, serviceFee: 0, payingAccountHasInsufficientFunds: false }, expectedActions);
    store.dispatch(payingAccountFundsActions.checkFunds(payingAccount)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      expect(actions[3]).to.deep.equal(expectedActions[3]);
      expect(actions[4]).to.deep.equal(expectedActions[4]);
      expect(actions[5]).to.deep.equal(expectedActions[5]);
      checkAccountFundsStub.restore();
      done();
    });
  });

  it("checks paying account funds successfully - paying account has insufficient funds", (done) => {
    const checkAccountFundsStub = sinon.stub(mintApi, "checkAccountFunds").resolves({
      accountBalance: 0.25,
      serviceFee: 0.5
    });
    const expectedActions = [
      { type: types.SET_CHECKING_PAYING_ACCOUNT_FUNDS, checkingPayingAccountFunds: true },
      { type: types.SET_PAYING_ACCOUNT_HAS_INSUFFICIENT_FUNDS, payingAccountHasInsufficientFunds: false },
      { type: types.SET_PAYING_ACCOUNT_BALANCE, payingAccountBalance: 0.25 },
      { type: types.SET_SERVICE_FEE, serviceFee: 0.5 },
      { type: types.SET_PAYING_ACCOUNT_HAS_INSUFFICIENT_FUNDS, payingAccountHasInsufficientFunds: true },
      { type: types.SET_CHECKING_PAYING_ACCOUNT_FUNDS, checkingPayingAccountFunds: false }
    ];
    const store = mockStore({ checkingPayingAccountFunds: false, payingAccountBalance: 0, serviceFee: 0, payingAccountHasInsufficientFunds: false }, expectedActions);
    store.dispatch(payingAccountFundsActions.checkFunds(payingAccount)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      expect(actions[3]).to.deep.equal(expectedActions[3]);
      expect(actions[4]).to.deep.equal(expectedActions[4]);
      expect(actions[5]).to.deep.equal(expectedActions[5]);
      checkAccountFundsStub.restore();
      done();
    });
  });

  it("checks paying account funds with exception", (done) => {
    const checkAccountFundsStub = sinon.stub(mintApi, "checkAccountFunds").rejects(new Error("Not enough funds."));
    const expectedActions = [
      { type: types.SET_CHECKING_PAYING_ACCOUNT_FUNDS, checkingPayingAccountFunds: true },
      { type: types.SET_PAYING_ACCOUNT_HAS_INSUFFICIENT_FUNDS, payingAccountHasInsufficientFunds: false },
      { type: types.SET_PAYING_ACCOUNT_BALANCE, payingAccountBalance: 0 },
      { type: types.SET_SERVICE_FEE, serviceFee: -1 },
      { type: types.SET_PAYING_ACCOUNT_HAS_INSUFFICIENT_FUNDS, payingAccountHasInsufficientFunds: false },
      { type: types.SET_CHECKING_PAYING_ACCOUNT_FUNDS, checkingPayingAccountFunds: false }
    ];
    const store = mockStore({ checkingPayingAccountFunds: false, payingAccountBalance: 0, serviceFee: 0, payingAccountHasInsufficientFunds: false }, expectedActions);
    store.dispatch(payingAccountFundsActions.checkFunds(payingAccount)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      expect(actions[3]).to.deep.equal(expectedActions[3]);
      expect(actions[4]).to.deep.equal(expectedActions[4]);
      expect(actions[5]).to.deep.equal(expectedActions[5]);
      checkAccountFundsStub.restore();
      done();
    });
  });
});
