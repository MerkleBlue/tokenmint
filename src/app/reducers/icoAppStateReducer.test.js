import { expect } from 'chai';
import icoAppStateReducer from './icoAppStateReducer';
import * as actions from '../actions/appStateActions';
import appStates from './appStates';

describe("icoAppStateReducer test", () => {
  it("should set icoAppState when passed SET_ICO_APP_STATE", () => {
    const initState = appStates.INIT;
    const action = actions.setIcoAppState(appStates.MINING_IN_PROGRESS);
    const newState = icoAppStateReducer(initState, action);

    expect(newState).to.equal(appStates.MINING_IN_PROGRESS);
  });
});
