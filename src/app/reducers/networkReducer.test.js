import { expect } from 'chai';
import networkReducer from './networkReducer';
import * as actions from '../actions/networkActions';

describe("networkReducer test", () => {
  it("should set network when passed SET_NETWORK", () => {
    const initState = "";
    const action = actions.setNetwork("main");
    const newState = networkReducer(initState, action);

    expect(newState).to.eq("main");
  });
});
