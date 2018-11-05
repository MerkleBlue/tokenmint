import { expect } from 'chai';
import checkingNetworkReducer from './checkingNetworkReducer';
import * as actions from '../actions/networkActions';

describe("checkingNetworkReducer test", () => {
  it("should set checkingNetwork when passed SET_CHECKING_NETWORK", () => {
    const initState = true;
    const action = actions.setCheckingNetwork(false);
    const newState = checkingNetworkReducer(initState, action);

    expect(newState).to.be.false;
  });
});
