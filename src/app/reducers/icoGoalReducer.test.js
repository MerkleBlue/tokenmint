import { expect } from 'chai';
import icoGoalReducer from './icoGoalReducer';
import * as actions from '../actions/icoGoalActions';

describe("icoGoalReducer test", () => {
  it("should set icoGoal when passed SET_ICO_GOAL", () => {
    const initState = "";
    const action = actions.setIcoGoal("1000");
    const newState = icoGoalReducer(initState, action);

    expect(newState).to.equal("1000");
  });
});
