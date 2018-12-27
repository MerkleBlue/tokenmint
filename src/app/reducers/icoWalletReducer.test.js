import { expect } from 'chai';
import icoWalletReducer from './icoWalletReducer';
import * as actions from '../actions/icoWalletActions';

describe("icoWalletReducer test", () => {
  it("should set icoWallet when passed SET_ICO_WALLET", () => {
    const initState = "";
    const action = actions.setIcoWallet("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
    const newState = icoWalletReducer(initState, action);

    expect(newState).to.eq("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
  });
});
