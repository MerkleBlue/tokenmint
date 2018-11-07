import { expect } from 'chai';
import tokenOwnerBalanceReducer from './tokenOwnerBalanceReducer';
import * as actions from '../actions/tokenOwnerFundsActions';

describe("tokenOwnerBalanceReducer test", () => {
  it("should set tokenOwnerBalance when passed SET_TOKEN_BALANCE", () => {
    const initState = 0;
    const action = actions.setTokenOwnerBalance(0.5);
    const newState = tokenOwnerBalanceReducer(initState, action);

    expect(newState).to.eq(0.5);
  });
});
