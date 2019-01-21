import * as types from './actionTypes';

export function setTokenReceipt(tokenReceipt) {
  return { type: types.SET_TOKEN_RECEIPT, tokenReceipt: tokenReceipt };
}

export function setCrowdsaleReceipt(crowdsaleReceipt) {
  return { type: types.SET_CROWDSALE_RECEIPT, crowdsaleReceipt: crowdsaleReceipt };
}
