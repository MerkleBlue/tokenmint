import * as types from './actionTypes';

export function setTokenOwner(tokenOwner) {
  return { type: types.SET_TOKEN_OWNER, tokenOwner: tokenOwner };
}
