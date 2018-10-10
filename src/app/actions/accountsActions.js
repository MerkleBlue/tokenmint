import * as types from './actionTypes';

export function setAccounts(accounts) {
  return { type: types.SET_ACCOUNTS, accounts: accounts };
}
