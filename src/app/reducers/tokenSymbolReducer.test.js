import { expect } from 'chai';
import tokenSymbolReducer from './tokenSymbolReducer';
import * as actions from '../actions/tokenSymbolActions';

describe("tokenSymbolReducer test", () => {
  it("should set tokenSymbol when passed SET_TOKEN_SYMBOL", () => {
    const initState = "";
    const action = actions.setTokenSymbol("TFA");
    const newState = tokenSymbolReducer(initState, action);

    expect(newState).to.eq("TFA");
  });
});
