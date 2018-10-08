import * as types from './actionTypes';

export function setTokenType(tokenType) {
  return { type: types.SET_TOKEN_TYPE, tokenType: tokenType };
}
