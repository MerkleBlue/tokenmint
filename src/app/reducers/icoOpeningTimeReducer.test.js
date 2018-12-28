import { expect } from 'chai';
import icoOpeningTimeReducer from './icoOpeningTimeReducer';
import * as actions from '../actions/icoOpenCloseTimeActions';

describe("icoOpeningTimeReducer test", () => {
  it("should set icoOpeningTime when passed SET_OPENING_TIME", () => {
    const initState = "";
    const action = actions.setOpeningTime("12/12/18");
    const newState = icoOpeningTimeReducer(initState, action);

    expect(newState).to.equal("12/12/18");
  });
});
