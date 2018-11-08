import * as types from './actionTypes';

export function setIsMobileDevice(isMobileDevice) {
  return { type: types.SET_IS_MOBILE_DEVICE, isMobileDevice: isMobileDevice };
}
