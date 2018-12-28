import * as types from './actionTypes';

export function setOpeningTime(icoOpeningTime) {
  return { type: types.SET_OPENING_TIME, icoOpeningTime: icoOpeningTime };
}

export function setClosingTime(icoClosingTime) {
  return { type: types.SET_CLOSING_TIME, icoClosingTime: icoClosingTime };
}
