import { expect } from 'chai';
import totalSupplyReducer from './totalSupplyReducer';
import * as actions from '../actions/totalSupplyActions';

describe("totalSupplyReducer test", () => {
  it("should set totalSupply when passed SET_TOTAL_SUPPLY", () => {
    const initState = "";
    const action = actions.setTotalSupply("1000");
    const newState = totalSupplyReducer(initState, action);

    expect(newState).to.eq("1000");
  });
});
