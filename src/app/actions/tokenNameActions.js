import * as types from './actionTypes';

export function setTokenName(tokenName) {
  return { type: types.SET_TOKEN_NAME, tokenName: tokenName };
}
