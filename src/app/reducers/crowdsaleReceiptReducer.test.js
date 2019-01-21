
import { expect } from 'chai';
import crowdsaleReceiptReducer from './crowdsaleReceiptReducer';
import * as actions from '../actions/receiptActions';

describe("crowdsaleReceiptReducer test", () => {
  it("should set crowdsaleReceipt when passed SET_CROWDSALE_RECEIPT", () => {
    const initState = {};
    const crowdsaleReceipt = {value: "This is for test purpose"};
    const action = actions.setCrowdsaleReceipt(crowdsaleReceipt);
    const newState = crowdsaleReceiptReducer(initState, action);

    expect(newState.value).to.eq(crowdsaleReceipt.value);
  });
});
