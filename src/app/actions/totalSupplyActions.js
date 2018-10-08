import * as types from './actionTypes';

export function setTotalSupply(totalSupply) {
  return { type: types.SET_TOTAL_SUPPLY, totalSupply: totalSupply };
}
