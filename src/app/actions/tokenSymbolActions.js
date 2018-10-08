import * as types from './actionTypes';

export function setTokenSymbol(tokenSymbol) {
  return { type: types.SET_TOKEN_SYMBOL, tokenSymbol: tokenSymbol };
}
