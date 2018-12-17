import * as types from './actionTypes';
import { loadAccounts } from '../../api/mintApi';
import { initTokenOwner } from './tokenOwnerActions';
import { setPayingAccount } from './payingAccountActions';
import { checkFunds, setPayingAccountHasInsufficientFunds } from './payingAccountFundsActions';

export function loadAllAccounts() {
  return (dispatch) => {
    dispatch(setLoadingAccounts(true));
    return loadAccounts().then(accounts => {
      dispatch(setAccounts(accounts));
      dispatch(setLoadingAccounts(false));
      if (accounts.length === 1) {
        dispatch(initTokenOwner(accounts[0]));
        dispatch(setPayingAccount(accounts[0]));
        dispatch(checkFunds(accounts[0]));
      } else {
        dispatch(setPayingAccountHasInsufficientFunds(false));
      }
    }).catch(() => {
      dispatch(setAccounts([]));
      dispatch(setLoadingAccounts(false));
    });
  };
}

export function setAccounts(accounts) {
  return { type: types.SET_ACCOUNTS, accounts: accounts };
}

export function setLoadingAccounts(loadingAccounts) {
  return { type: types.SET_LOADING_ACCOUNTS, loadingAccounts: loadingAccounts };
}
