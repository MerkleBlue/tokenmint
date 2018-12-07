import { expect } from 'chai';
import checkingPayingAccountFundsReducer from './checkingPayingAccountFundsReducer';
import * as actions from '../actions/payingAccountFundsActions';

describe("checkingPayingAccountFundsReducer test", () => {
  it("should set checkingPayingAccountFunds when passed SET_CHECKING_PAYING_ACCOUNT_FUNDS", () => {
    const initState = false;
    const action = actions.setCheckingPayingAccountFunds(true);
    const newState = checkingPayingAccountFundsReducer(initState, action);

    expect(newState).to.equal(true);
  });
});
