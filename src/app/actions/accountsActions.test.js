import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as mintApi from '../../api/mintApi';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as accountsActions from './accountsActions';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

function generateAccounts(accountsCount) {
  const accounts = [];
  for (let i = 0; i < accountsCount; i++) {
    accounts.push("Account" + i);
  }
  return accounts;
}

describe("accountsActions tests", () => {
  it("loads accounts successfully", (done) => {
    const accounts = generateAccounts(3);
    const loadAccountsStub = sinon.stub(mintApi, "loadAccounts").resolves(accounts);
    const expectedActions = [
      { type: types.SET_LOADING_ACCOUNTS, loadingAccounts: true },
      { type: types.SET_ACCOUNTS, accounts: accounts },
      { type: types.SET_LOADING_ACCOUNTS, loadingAccounts: false }
    ];
    const store = mockStore({ accounts: [] }, expectedActions);
    store.dispatch(accountsActions.loadAllAccounts()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      loadAccountsStub.restore();
      done();
    });
  });

  it("loads accounts with exception", (done) => {
    const loadAccountsStub = sinon.stub(mintApi, "loadAccounts").rejects(new Error("Foo error"));
    const expectedActions = [
      { type: types.SET_LOADING_ACCOUNTS, loadingAccounts: true },
      { type: types.SET_ACCOUNTS, accounts: [] },
      { type: types.SET_LOADING_ACCOUNTS, loadingAccounts: false }
    ];
    const store = mockStore({ accounts: [] }, expectedActions);
    store.dispatch(accountsActions.loadAllAccounts()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      loadAccountsStub.restore();
      done();
    });
  });
});
