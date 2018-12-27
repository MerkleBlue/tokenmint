import { expect } from 'chai';
import icoCapReducer from './icoCapReducer';
import * as actions from '../actions/icoCapActions';

describe("icoCapReducer test", () => {
  it("should set icoCap when passed SET_ICO_CAP", () => {
    const initState = "";
    const action = actions.setIcoCap("1000");
    const newState = icoCapReducer(initState, action);

    expect(newState).to.equal("1000");
  });
});
