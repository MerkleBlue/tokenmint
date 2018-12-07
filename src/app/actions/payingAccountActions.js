import * as types from './actionTypes';

export function setPayingAccount(payingAccount) {
  return { type: types.SET_PAYING_ACCOUNT, payingAccount: payingAccount };
}
