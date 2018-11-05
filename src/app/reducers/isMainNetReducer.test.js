import { expect } from 'chai';
import isMainNetReducer from './isMainNetReducer';
import * as actions from '../actions/checkNetworkActions';

describe("isMainNetReducer test", () => {
  it("should set isMainNet when passed SET_IS_MAIN_NET", () => {
    const initState = true;
    const action = actions.setIsMainNet(false);
    const newState = isMainNetReducer(initState, action);

    expect(newState).to.be.false;
  });
});
