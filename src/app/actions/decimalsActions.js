import * as types from './actionTypes';

export function setDecimals(decimals) {
  return { type: types.SET_DECIMALS, decimals: decimals };
}
