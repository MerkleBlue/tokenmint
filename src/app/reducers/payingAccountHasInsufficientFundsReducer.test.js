import { expect } from 'chai';
import payingAccountHasInsufficientFundsReducer from './payingAccountHasInsufficientFundsReducer';
import * as actions from '../actions/payingAccountFundsActions';

describe("payingAccountHasInsufficientFundsReducer test", () => {
  it("should set payingAccountHasInsufficientFunds when passed SET_PAYING_ACCOUNT_HAS_INSUFFICIENT_FUNDS", () => {
    const initState = true;
    const action = actions.setPayingAccountHasInsufficientFunds(false);
    const newState = payingAccountHasInsufficientFundsReducer(initState, action);

    expect(newState).to.be.false;
  });
});
