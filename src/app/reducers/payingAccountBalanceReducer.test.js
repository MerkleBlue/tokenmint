import { expect } from 'chai';
import payingAccountBalanceReducer from './payingAccountBalanceReducer';
import * as actions from '../actions/payingAccountFundsActions';

describe("payingAccountBalanceReducer test", () => {
  it("should set payingAccountBalance when passed SET_PAYING_ACCOUNT_BALANCE", () => {
    const initState = 0;
    const action = actions.setPayingAccountBalance(0.5);
    const newState = payingAccountBalanceReducer(initState, action);

    expect(newState).to.eq(0.5);
  });
});
