import { expect } from 'chai';
import checkingTokenOwnerFundsReducer from './checkingTokenOwnerFundsReducer';
import * as actions from '../actions/tokenOwnerFundsActions';

describe("checkingTokenOwnerFundsReducer test", () => {
  it("should set checkingTokenOwnerFunds when passed SET_CHECKING_TOKEN_OWNER_FUNDS", () => {
    const initState = false;
    const action = actions.setCheckingTokenOwnerFunds(true);
    const newState = checkingTokenOwnerFundsReducer(initState, action);

    expect(newState).to.equal(true);
  });
});
