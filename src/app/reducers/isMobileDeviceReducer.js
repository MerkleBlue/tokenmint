import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function isMobileDeviceReducer(state = initialState.isMobileDevice, action) {
  switch (action.type) {
    case types.SET_IS_MOBILE_DEVICE:
      return action.isMobileDevice;

    default:
      return state;
  }
}
