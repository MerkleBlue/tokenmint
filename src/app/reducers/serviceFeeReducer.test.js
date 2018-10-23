import { expect } from 'chai';
import serviceFeeReducer from './serviceFeeReducer';
import * as actions from '../actions/serviceFeeActions';

describe("serviceFeeReducer test", () => {
  it("should set serviceFee when passed SET_SERVICE_FEE", () => {
    const initState = "";
    const action = actions.setServiceFee("1");
    const newState = serviceFeeReducer(initState, action);

    expect(newState).to.eq("1");
  });
});
