import { expect } from 'chai';
import loadingAccountsReducer from './loadingAccountsReducer';
import * as actions from '../actions/accountsActions';

describe("loadingAccountsReducer test", () => {
  it("should set loadingAccounts when passed SET_LOADING_ACCOUNTS", () => {
    const initState = false;
    const action = actions.setLoadingAccounts(true);
    const newState = loadingAccountsReducer(initState, action);

    expect(newState).to.be.true;
  });
});
