import { expect } from 'chai';
import walletNeedsToBeUnlockedReducer from './walletNeedsToBeUnlockedReducer';
import * as actions from '../actions/walletActions';

describe("walletNeedsToBeUnlockedReducer test", () => {
  it("should set walletNeedsToBeUnlocked when passed SET_WALLET_NEEDS_TO_BE_UNLOCKED", () => {
    const initState = false;
    const action = actions.setWalletNeedsToBeUnlocked(true);
    const newState = walletNeedsToBeUnlockedReducer(initState, action);

    expect(newState).to.be.true;
  });
});
