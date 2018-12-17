import * as types from './actionTypes';

export function setTokenOwner(tokenOwner) {
  return { type: types.SET_TOKEN_OWNER, tokenOwner: tokenOwner };
}

export function initTokenOwner(tokenOwner) {
  return { type: types.INIT_TOKEN_OWNER, tokenOwner: tokenOwner };
}
