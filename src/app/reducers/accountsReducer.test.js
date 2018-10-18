import { expect } from 'chai';
import accountsReducer from './accountsReducer';
import * as actions from '../actions/accountsActions';

function generateAccounts(accountsCount) {
  const accounts = [];
  for (let i = 0; i < accountsCount; i++) {
    accounts.push("Account" + i);
  }
  return accounts;
}

describe("accountsReducer test", () => {
  it("should set accounts when passed SET_ACCOUNTS", () => {
    const initState = [];
    const newAccounts = generateAccounts(3);
    const action = actions.setAccounts(newAccounts);
    const newState = accountsReducer(initState, action);

    expect(newState.length).to.equal(3);
    expect(newState).to.equal(newAccounts);
  });
});
