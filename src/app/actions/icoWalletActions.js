import * as types from './actionTypes';

export function setIcoWallet(icoWallet) {
  return { type: types.SET_ICO_WALLET, icoWallet: icoWallet };
}
