import { expect } from 'chai';
import infoMessageReducer from './infoMessageReducer';
import * as actions from '../actions/infoMessageActions';

describe("infoMessageReducer test", () => {
  it("should set infoMessage when passed SET_INFO_MESSAGE", () => {
    const initState = "";
    const action = actions.setInfoMessage("Info message");
    const newState = infoMessageReducer(initState, action);

    expect(newState).to.equal("Info message");
  });
});
