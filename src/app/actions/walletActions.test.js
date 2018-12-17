import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as mintApi from '../../api/mintApi';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as walletActions from './walletActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

function generateAccounts(accountsCount) {
  const accounts = [];
  for (let i = 0; i < accountsCount; i++) {
    accounts.push("Account" + i);
  }
  return accounts;
}

describe("walletActions tests", () => {
  it("unlocks wallet successfully", (done) => {
    const accounts = generateAccounts(1);
    const unlockWalletStub = sinon.stub(mintApi, "unlockWallet").resolves(true);
    const loadAccountsStub = sinon.stub(mintApi, "loadAccounts").resolves(accounts);
    const expectedActions = [
      { type: types.SET_LOADING_ACCOUNTS, loadingAccounts: true },
      { type: types.SET_WALLET_NEEDS_TO_BE_UNLOCKED, walletNeedsToBeUnlocked: false },
      { type: types.SET_ACCOUNTS, accounts: accounts },
      { type: types.SET_LOADING_ACCOUNTS, loadingAccounts: false },
      { type: types.INIT_TOKEN_OWNER, tokenOwner: "Account0" }
    ];
    const store = mockStore({ walletNeedsToBeUnlocked: true, accounts: [] }, expectedActions);
    store.dispatch(walletActions.unlockWallet()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      expect(actions[3]).to.deep.equal(expectedActions[3]);
      expect(actions[4]).to.deep.equal(expectedActions[4]);
      unlockWalletStub.restore();
      loadAccountsStub.restore();
      done();
    });
  });

  it("unlocks wallet with exception", (done) => {
    const unlockWalletStub = sinon.stub(mintApi, "unlockWallet").rejects(new Error("Could not unlock wallet"));
    const expectedActions = [
      { type: types.SET_WALLET_NEEDS_TO_BE_UNLOCKED, walletNeedsToBeUnlocked: true }
    ];
    const store = mockStore({ walletNeedsToBeUnlocked: true }, expectedActions);
    store.dispatch(walletActions.unlockWallet()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      unlockWalletStub.restore();
      done();
    });
  });
});
