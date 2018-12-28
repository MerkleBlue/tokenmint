import { expect } from 'chai';
import icoClosingTimeReducer from './icoClosingTimeReducer';
import * as actions from '../actions/icoOpenCloseTimeActions';

describe("icoClosingTimeReducer test", () => {
  it("should set icoClosingTime when passed SET_CLOSING_TIME", () => {
    const initState = "";
    const action = actions.setClosingTime("12/12/18");
    const newState = icoClosingTimeReducer(initState, action);

    expect(newState).to.equal("12/12/18");
  });
});
