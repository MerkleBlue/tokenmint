import { expect } from 'chai';
import tokenOwnerHasInsufficientFundsReducer from './tokenOwnerHasInsufficientFundsReducer';
import * as actions from '../actions/tokenOwnerFundsActions';

describe("tokenOwnerHasInsufficientFundsReducer test", () => {
  it("should set tokenOwnerHasInsufficientFunds when passed SET_TOKEN_OWNER_HAS_INSUFFICIENT_FUNDS", () => {
    const initState = true;
    const action = actions.setTokenOwnerHasInsufficientFunds(false);
    const newState = tokenOwnerHasInsufficientFundsReducer(initState, action);

    expect(newState).to.be.false;
  });
});
