import * as types from './actionTypes';

export function setIcoRate(icoRate) {
  return { type: types.SET_ICO_RATE, icoRate: icoRate };
}
