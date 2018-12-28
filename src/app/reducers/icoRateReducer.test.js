import { expect } from 'chai';
import icoRateReducer from './icoRateReducer';
import * as actions from '../actions/icoRateActions';

describe("icoRateReducer test", () => {
  it("should set icoRate when passed SET_ICO_RATE", () => {
    const initState = "";
    const action = actions.setIcoRate("1000");
    const newState = icoRateReducer(initState, action);

    expect(newState).to.equal("1000");
  });
});
