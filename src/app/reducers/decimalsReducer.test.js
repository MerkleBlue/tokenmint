import { expect } from 'chai';
import decimalsReducer from './decimalsReducer';
import * as actions from '../actions/decimalsActions';

describe("decimalsReducer test", () => {
  it("should set decimals when passed SET_DECIMALS", () => {
    const initState = "";
    const action = actions.setDecimals("18");
    const newState = decimalsReducer(initState, action);

    expect(newState).to.equal("18");
  });
});
