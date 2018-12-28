import * as types from './actionTypes';

export function setIcoCap(icoCap) {
  return { type: types.SET_ICO_CAP, icoCap: icoCap };
}
