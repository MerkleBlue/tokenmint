import { expect } from 'chai';
import isMobileDeviceReducer from './isMobileDeviceReducer';
import * as actions from '../actions/deviceActions';

describe("isMobileDeviceReducer test", () => {
  it("should set isMobileDevice when passed SET_IS_MOBILE_DEVICE", () => {
    const initState = false;
    const action = actions.setIsMobileDevice(true);
    const newState = isMobileDeviceReducer(initState, action);

    expect(newState).to.be.true;
  });
});
