import { expect } from 'chai';
import tokenOwnerReducer from './tokenOwnerReducer';
import * as actions from '../actions/tokenOwnerActions';

describe("tokenOwnerReducer test", () => {
  it("should set tokenOwner when passed SET_TOKEN_OWNER", () => {
    const initState = "";
    const action = actions.setTokenOwner("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
    const newState = tokenOwnerReducer(initState, action);

    expect(newState).to.eq("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
  });

  it("should init tokenOwner when passed INIT_TOKEN_OWNER", () => {
    const initState = "";
    const action = actions.initTokenOwner("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
    const newState = tokenOwnerReducer(initState, action);

    expect(newState).to.eq("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
  });

  it("should not init tokenOwner when passed INIT_TOKEN_OWNER", () => {
    const initState = "0x627306090abaB3A6e1400e9345bC60c78a8BEf58";
    const action = actions.initTokenOwner("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
    const newState = tokenOwnerReducer(initState, action);

    expect(newState).to.eq(initState);
  });
});
