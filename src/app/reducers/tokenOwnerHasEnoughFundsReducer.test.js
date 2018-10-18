import { expect } from 'chai';
import tokenOwnerHasEnoughFundsReducer from './tokenOwnerHasEnoughFundsReducer';
import * as actions from '../actions/tokenOwnerFundsActions';

describe("tokenOwnerHasEnoughFundsReducer test", () => {
  it("should set tokenOwnerHasEnoughFunds when passed SET_TOKEN_OWNER_HAS_ENOUGH_FUNDS", () => {
    const initState = false;
    const action = actions.setTokenOwnerHasEnoughFunds(true);
    const newState = tokenOwnerHasEnoughFundsReducer(initState, action);

    expect(newState).to.be.true;
  });
});
