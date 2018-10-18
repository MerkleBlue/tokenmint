import { expect } from 'chai';
import appStateReducer from './appStateReducer';
import * as actions from '../actions/appStateActions';
import appStates from './appStates';

describe("appStateReducer test", () => {
  it("should set appState when passed SET_APP_STATE", () => {
    const initState = appStates.INIT;
    const action = actions.setAppState(appStates.MINING_IN_PROGRESS);
    const newState = appStateReducer(initState, action);

    expect(newState).to.equal(appStates.MINING_IN_PROGRESS);
  });
});
