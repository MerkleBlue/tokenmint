import { expect } from 'chai';
import payingAccountReducer from './payingAccountReducer';
import * as actions from '../actions/payingAccountActions';

describe("payingAccountReducer test", () => {
  it("should set payingAccount when passed SET_PAYING_ACCOUNT", () => {
    const initState = "";
    const action = actions.setPayingAccount("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
    const newState = payingAccountReducer(initState, action);

    expect(newState).to.eq("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
  });
});
