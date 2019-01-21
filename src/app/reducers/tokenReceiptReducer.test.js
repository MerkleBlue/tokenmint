import { expect } from 'chai';
import tokenReceiptReducer from './tokenReceiptReducer';
import * as actions from '../actions/receiptActions';

describe("tokenReceiptReducer test", () => {
  it("should set tokenReceipt when passed SET_TOKEN_RECEIPT", () => {
    const initState = {};
    const tokenReceipt = {value: "This is for test purpose"};
    const action = actions.setTokenReceipt(tokenReceipt);
    const newState = tokenReceiptReducer(initState, action);

    expect(newState.value).to.eq(tokenReceipt.value);
  });
});
