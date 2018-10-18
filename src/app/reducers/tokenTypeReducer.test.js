import { expect } from 'chai';
import tokenTypeReducer from './tokenTypeReducer';
import * as actions from '../actions/tokenTypeActions';

describe("tokenTypeReducer test", () => {
  it("should set tokenType when passed SET_TOKEN_TYPE", () => {
    const initState = "erc20";
    const action = actions.setTokenType("erc223");
    const newState = tokenTypeReducer(initState, action);

    expect(newState).to.eq("erc223");
  });
});
