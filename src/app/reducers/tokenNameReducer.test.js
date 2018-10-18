import { expect } from 'chai';
import tokenNameReducer from './tokenNameReducer';
import * as actions from '../actions/tokenNameActions';

describe("tokenNameReducer test", () => {
  it("should set tokenName when passed SET_TOKEN_NAME", () => {
    const initState = "";
    const action = actions.setTokenName("The First Amendment");
    const newState = tokenNameReducer(initState, action);

    expect(newState).to.eq("The First Amendment");
  });
});
